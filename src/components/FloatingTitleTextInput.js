import React, { Component } from 'react'
import { View, Animated, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { string, func, object, number, bool } from 'prop-types'
import vectorIcons from '../values/vectorIcons'
import colors from '../values/colors'



export default class FloatingTitleTextInput extends Component {


  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    style: object,
    otherTextInputProps: object,
    disableShowPasswordButton: bool,
  }



  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'grey',
    textInputStyles: {},
    style: {},
    otherTextInputAttributes: {},
    disableShowPasswordButton: false,
  }



  constructor(props) {
    super(props)
    const { value } = this.props
    this.position = new Animated.Value(value ? 1 : 0)
    this.state = {
      isFieldActive: false,
      showPassword: false,
    }
  }



  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true })
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start()
    }
  }



  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false })
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start()
    }
  }



  _onChangeText = (updatedValue) => {
    const { attrName, updateMasterState } = this.props
    updateMasterState(attrName, updatedValue)
  }



  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize,
    } = this.props

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 5],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    }
  }



  onPressTogglePassword = () => {

    var { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }



  render() {

    var {
      disableShowPasswordButton,
      style,
      textInputStyles,
      title,
      value,
      keyboardType,
      otherTextInputProps,
    } = this.props

    var { showPassword } = this.state

    return (
      <View style={[styles.container, style]} >
        <View style={[styles.flex1]}>
          <Animated.Text
            style={[styles.titleStyles, this._returnAnimatedTitleStyles()]}
          >
            {title}
          </Animated.Text>
          <TextInput
            value={value}
            style={[styles.textInput, textInputStyles]}
            underlineColorAndroid="transparent"
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChangeText={this._onChangeText}
            keyboardType={keyboardType}
            {...otherTextInputProps}
            secureTextEntry={otherTextInputProps.secureTextEntry && !showPassword}
          />
        </View>

        {otherTextInputProps.secureTextEntry && !disableShowPasswordButton ?
          <TouchableOpacity
            style={[styles.showPasswordButton]}
            onPress={this.onPressTogglePassword}
            activeOpacity={0.9}
          >
            {showPassword ?
            <Svg width={25} height={25} viewBox={vectorIcons.invisible.viewBox}>
              <Path fill={colors.appColor} d={vectorIcons.invisible.d1} />
              <Path fill={colors.appColor} d={vectorIcons.invisible.d2} />
              <Path fill={colors.appColor} d={vectorIcons.invisible.d3} />
            </Svg>
              :
              <Svg width={25} height={25} viewBox={vectorIcons.visible.viewBox}>
                <Path fill={colors.appColor} d={vectorIcons.visible.d1} />
                <Path fill={colors.appColor} d={vectorIcons.visible.d2} />
              </Svg>
            }
          </TouchableOpacity>
          : null}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 0.5,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },

  textInput: {
    fontSize: 15,
    color: 'black',
    padding: 0,
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },

  titleStyles: {
    position: 'absolute',
    left: 7,
  },

  flex1: {
    flex: 1,
  },

  showPasswordButton: {
    alignSelf: 'center',
    padding: 5,
  },
})
