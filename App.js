import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import Switch from './src/Switch.js';

const styles = StyleSheet.create({
	containerStyle: {
		marginBottom: 20,
	},
});

export default class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { isActive: true };
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		this.setState((oldState) => ({ isActive: !oldState.isActive }));
	}

	render() {
		const { isActive } = this.state;
		const { containerStyle } = styles;
		return (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
				}}
			>
				<Switch
					leftText="On"
					rightText="Off"
					isActive={isActive}
					onPress={this.onPress}
					containerStyle={containerStyle}
				/>

				<Switch
					leftText="On"
					rightText="Off"
					isActive={!isActive}
					onPress={this.onPress}
					containerStyle={containerStyle}
				/>

				<Switch
					leftText="On"
					rightText="Off"
					width={100}
					height={100}
					isActive={!isActive}
					onPress={this.onPress}
					containerStyle={containerStyle}
				/>

				<Switch
					leftText="On"
					rightText="Off"
					radius={20}
					isActive={!isActive}
					onPress={this.onPress}
					containerStyle={containerStyle}
				/>
			</View>
		);
	}
}
