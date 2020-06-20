import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

const Ball = () => {

    const position = new Animated.ValueXY(0, 0)
    
	useEffect(() => {
		setTimeout(() => Animated.spring(position, {
			toValue: { x: 200, y: 500 }
		}).start(), 3000)
    }, [])
    
	return (
		<Animated.View style={position.getLayout()}>
			<View style={styles.ballStyle} />
		</Animated.View>
	)
}

export default Ball

const styles = StyleSheet.create({
	ballStyle: {
		borderRadius: 100,
		height: 100,
		width: 100,
		backgroundColor: 'darkcyan'
	}
})
