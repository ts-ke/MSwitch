import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Animated,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 50,
		backgroundColor: 'lightgrey',
		flexDirection: 'row',
	},
	moveable: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: 'grey',
		width: 150,
		height: 50,
		color: 'transparent',
		position: 'absolute',
	},
	text: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export default class MSwitch extends Component {
	constructor(props) {
		super(props);
		this.leftDistance = props.width / 2 || 150;
		this.state = {
			translateX: new Animated.Value(
				this.props.isActive ? 0 : this.leftDistance
			),
		};
		this.getUserStyles = this.getUserStyles.bind(this);
		const { userContainer, userText, userMoveable } = this.getUserStyles(
			props
		);
		this.userContainer = userContainer;
		this.userText = userText;
		this.userMoveable = userMoveable;
	}

	componentDidUpdate(oldProps) {
		const { isActive } = this.props;
		const { translateX } = this.state;

		if (oldProps.isActive === isActive) {
			return;
		}

		Animated.timing(this.state.translateX, {
			toValue: isActive ? 0 : this.leftDistance,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}

	getUserStyles() {
		const { width, height, radius } = this.props;
		const half = {};
		const full = {};
		if (width) {
			half.width = width / 2;
			full.width = width;
		}

		if (height) {
			half.height = height;
			full.height = height;
		}

		if (radius) {
			half.borderRadius = radius;
			full.borderRadius = radius;
		}

		return { userText: half, userContainer: full, userMoveable: half };
	}

	render() {
		const { container, text, moveable } = styles;
		const {
			leftText,
			rightText,
			containerStyle,
			onPress,
			onPressProps,
			textStyles,
			moveableStyle,
			isActive,
			width,
			height,
			radius,
		} = this.props;
		const { translateX } = this.state;
		return (
			<TouchableWithoutFeedback onPress={onPress} {...onPressProps}>
				<View style={[container, this.userContainer, containerStyle]}>
					<Text style={[text, this.userText, textStyles]}>
						{leftText}
					</Text>
					<Text style={[text, this.userText, textStyles]}>
						{rightText}
					</Text>
					<Animated.View
						style={{
							...moveable,
							...this.userMoveable,
							translateX,
						}}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
