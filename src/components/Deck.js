import React from 'react'
import { StyleSheet, Text, View, PanResponder, Animated } from 'react-native'

const Deck = ({ data, renderCard }) => {

    //default position is NOT passed in in this case
    const position = new Animated.ValueXY()
    
	const panResponder = PanResponder.create({
		//returning true below means any time user drags card around, this pan responder is whats handling the movement
		//the reason it's a fn is because we can run code to decide whether or not this should be used
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (event, gesture) => {
			console.log(JSON.parse(JSON.stringify(gesture)))
		},
		onPanResponderRelease: () => {
			console.log('release')
		}
	})

	const renderCards = () => {
		return data.map(item => {
			return renderCard(item)
		})
	}

	return <View {...panResponder.panHandlers}>{renderCards()}</View>
}

export default Deck

const styles = StyleSheet.create({})
