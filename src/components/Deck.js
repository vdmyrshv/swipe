import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import {
	StyleSheet,
	View,
	PanResponder,
	Animated,
	Dimensions,
	LayoutAnimation,
	UIManager,
	Platform
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const SCREEN_SCALING = 1.5
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25
const SWIPE_OUT_DURATION = 250

const Deck = ({
	data,
	renderCard,
	onSwipeLeft,
	onSwipeRight,
	renderNoMoreCards
}) => {
	const [index, setIndex] = useState(0)
	//default position is NOT passed in in this case

	useEffect(() => {
			setIndex(0) //set index back to "0"
			console.log("new data")
	}, [data])

	//custom hook to NOT fire useEffect after component has just mounted, only during subsequent mounts
	const useLayoutEffectAfterRender = (callback, dependencies) => {
		const componentJustMouted = useRef(true)
		useLayoutEffect(()=> {
			if (!componentJustMouted.current) {
				return callback()
			}
			componentJustMouted.current = false
		}, [dependencies])
	}
	
	//remember useLayoutEffect fires synchronously after all DOM changes are rendered
	useLayoutEffectAfterRender(() => {
		//this next line is for Android
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental &&
				UIManager.setLayoutAnimationEnabledExperimental(true)
		}
		LayoutAnimation.spring()
	}, [index])

	const position = new Animated.ValueXY()

	const panResponder = PanResponder.create({
		//returning true below means any time user drags card around, this pan responder is whats handling the movement
		//the reason it's a fn is because we can run code to decide whether or not this should be used
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (event, gesture) => {
			//console.log(JSON.parse(JSON.stringify(gesture)))
			position.setValue({ x: gesture.dx, y: gesture.dy })
		},
		onPanResponderRelease: (event, gesture) => {
			if (gesture.dx >= SWIPE_THRESHOLD) {
				console.log('swipe right!')
				forceSwipe('right')
			} else if (gesture.dx <= -SWIPE_THRESHOLD) {
				console.log('swipe left!')
				forceSwipe('left')
			} else {
				resetPosition()
			}
		}
	})

	// const moveItemToBack = () => {
	// 	const firstItem = data.unshift()
	// 	data.shift(firstItem)
	// }

	const onSwipeComplete = dir => {
		const currentItem = data[index]

		dir === 'right'
			? onSwipeRight(currentItem)
			: dir === 'left'
			? onSwipeLeft(currentItem)
			: null

		position.setValue({ x: 0, y: 0 })
		setIndex(prevIndex => prevIndex + 1)
	}

	const forceSwipe = dir => {
		const x =
			dir === 'right' ? SCREEN_WIDTH : dir === 'left' ? -SCREEN_WIDTH : 0

		const duration =
			dir === 'right' || dir === 'left' ? SWIPE_OUT_DURATION : 1000

		Animated.timing(position, {
			toValue: { x, y: 0 },
			duration
		}).start(() => onSwipeComplete(dir))
	}

	const resetPosition = () => {
		Animated.spring(position, { toValue: { x: 0, y: 0 } }).start()
	}

	const getCardStyle = () => {
		//the .interpolate method ties (in this case) the x direction to the rotation
		const rotate = position.x.interpolate({
			inputRange: [
				-SCREEN_WIDTH * SCREEN_SCALING,
				0,
				SCREEN_WIDTH * SCREEN_SCALING
			],
			outputRange: ['-120deg', '0deg', '120deg']
		})

		return {
			...position.getLayout(),
			transform: [{ rotate }]
		}
	}

	const renderCards = () => {
		if (index >= data.length) return renderNoMoreCards()

		return data
			.map((item, idx) => {
				if (idx < index) {
					return null
				} else if (idx === index) {
					return (
						<Animated.View
							//put getCardStyle at the end to retain dragging abilities
							style={
								(styles.card, styles.topCard, getCardStyle())
							}
							{...panResponder.panHandlers}
							key={item.id}
						>
							{renderCard(item)}
						</Animated.View>
					)
				} else {
					return (
						<Animated.View
							key={item.id}
							style={[styles.card, { top: 10 * (idx - index) }]}
						>
							{renderCard(item)}
						</Animated.View>
					)
				}
			})
			.reverse() //it's THIS simple to make a stack of elements stack correctly, just reverse the array
	}

	return <View style={styles.container}>{renderCards()}</View>
}

export default Deck

Deck.defaultProps = {
	onSwipeRight: () => {},
	onSwipeLeft: () => {}
}

const styles = StyleSheet.create({
	card: {
		position: 'absolute',
		width: SCREEN_WIDTH,
		zIndex: -1
	},
	container: {
		position: 'relative'
	},
	topCard: {
		zIndex: 1
	}
})
