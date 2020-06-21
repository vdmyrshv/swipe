import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Card } from 'react-native-elements'

import { SafeAreaView } from 'react-navigation'

import Deck from './src/components/Deck'

const DATA = [
	{
		id: 1,
		text: 'Card #1',
		uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
	},
	{
		id: 2,
		text: 'Card #2',
		uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
	},
	{
		id: 3,
		text: 'Card #3',
		uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'
	},
	{
		id: 4,
		text: 'Card #4',
		uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'
	},
	{
		id: 5,
		text: 'Card #5',
		uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
	},
	{
		id: 6,
		text: 'Card #6',
		uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
	},
	{
		id: 7,
		text: 'Card #7',
		uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'
	},
	{
		id: 8,
		text: 'Card #8',
		uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'
	}
]

export default function App() {
	const renderCard = item => {
		return (
			<Card
				image={{ uri: item.uri }}
				title={item.text}
				containerStyle={{
					backgroundColor: 'azure'
				}}
				imageStyle={{
					marginHorizontal: 10
				}}
			>
				<Text style={styles.text}>I can customize this further</Text>
				<Button
					icon={{ name: 'code', color: 'white' }}
					buttonStyle={{ backgroundColor: 'darkcyan' }}
					title='View now!'
				/>
			</Card>
		)
	}

	const renderNoMoreCards = () => (
		<Card
			title='No more cards!'
			containerStyle={{
				backgroundColor: 'azure'
			}}
		>
			<Text>That was fun and stuff</Text>
			<Button title='Get More' />
		</Card>
	)

	const onSwipeRight = () => {}

	const onSwipeLeft = () => {}

	return (
		<SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
			<Deck
				data={DATA}
				renderCard={renderCard}
				renderNoMoreCards={renderNoMoreCards}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: { },
	card: { backgroundColor: 'darkcyan', top: 0 },
	text: {
		marginBottom: 20
	}
})
