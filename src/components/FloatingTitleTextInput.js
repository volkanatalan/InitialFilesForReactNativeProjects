import React, { Component } from 'react'
import { View, Animated, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { oneOfType, oneOf, string, func, object, number, bool, shape, array } from 'prop-types'
import vectorIcons from '../values/vectorIcons'
import colors from '../values/colors'



export default class FloatingTitleTextInput extends Component {


  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number,
    titleInActiveSize: number,
    titleActiveColor: string,
    titleActiveDarkColor: string,
    titleInactiveColor: string,
    titleInactiveDarkColor: string,
    textInputStyle: oneOfType([
      shape({}),
      array,
      object,
    ]),
    labelStyle: oneOfType([
      shape({}),
      array,
      object,
    ]),
    style: oneOfType([
      shape({}),
      array,
      object,
    ]),
    otherTextInputProps: object,
    disableShowPasswordButton: bool,
    theme: oneOf(['light', 'dark']),
  }



  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleActiveDarkColor: 'darkgray',
    titleInactiveColor: 'grey',
    titleInactiveDarkColor: 'grey',
    textInputStyle: {},
    labelStyle: {},
    style: {},
    otherTextInputAttributes: {},
    otherTextInputProps: {},
    disableShowPasswordButton: false,
    theme: 'light'
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
      titleActiveColor, titleInactiveColor, titleActiveDarkColor, titleInactiveDarkColor, titleActiveSize, titleInActiveSize, theme
    } = this.props

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 7],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive && theme == 'dark' ? titleActiveDarkColor : isFieldActive ? titleActiveColor : theme == 'dark' ? titleInactiveDarkColor : titleInactiveColor,
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
      textInputStyle,
      title,
      value,
      keyboardType,
      otherTextInputProps,
      labelStyle,
      theme
    } = this.props

    var { showPassword } = this.state

    return (
      <View style={[styles.container, theme == 'dark' ? styles.containerDark : null, style]} >
        <View style={[styles.flex1]}>
          <Animated.Text
            style={[styles.title, labelStyle, this._returnAnimatedTitleStyles()]}
          >
            {title}
          </Animated.Text>
          <TextInput
            value={value}
            style={[styles.textInput, theme == 'dark' ? styles.textInputDark : null, textInputStyle]}
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
                <Path fill={colors.appSecondColor} d={vectorIcons.invisible.d1} />
                <Path fill={colors.appSecondColor} d={vectorIcons.invisible.d2} />
                <Path fill={colors.appSecondColor} d={vectorIcons.invisible.d3} />
              </Svg>
              :
              <Svg width={25} height={25} viewBox={vectorIcons.visible.viewBox}>
                <Path fill={colors.appSecondColor} d={vectorIcons.visible.d1} />
                <Path fill={colors.appSecondColor} d={vectorIcons.visible.d2} />
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
    height: 50,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 0.5,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },

  containerDark: {
    borderColor: 'white',
  },

  textInput: {
    fontSize: 17,
    color: 'black',
    padding: 0,
    paddingTop: 21,
    paddingHorizontal: 5,
  },

  textInputDark: {
    color: 'white',
  },

  title: {
    position: 'absolute',
    left: 5,
  },

  flex1: {
    flex: 1,
  },

  showPasswordButton: {
    alignSelf: 'center',
    padding: 5,
  },
})
