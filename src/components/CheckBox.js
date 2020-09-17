import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import LottieView from 'lottie-react-native'

import PropTypes, { oneOfType, string, array, func, object, number, shape, bool } from 'prop-types'


class CheckBox extends React.Component {

  value = false

  static propTypes = {
    value: bool,
    disabled: bool,
    onValueChange: func,
    style: oneOfType([
      shape({}),
      array
    ]),
    activeStyle: shape({}),
    passiveStyle: shape({}),
    type: number
  }



  static defaultProps = {
    value: false,
    disabled: false,
    onValueChange: () => { },
    type: 1,
  }



  constructor(props) {
    super(props)

    this.value = props.value

  }



  componentDidMount() {

    var { style, type } = this.props

    if (this.animation) {

      if (type == 2) {
        if (this.value) {
          this.animation.play(60, 60)
        } else {
          this.animation.play(0, 0)
        }
      }

      else {
        if (this.value) {
          this.animation.play(75, 75)
        } else {
          this.animation.play(150, 150)
        }
      }

    }
  }



  toggle(){
    this.onPress()
  }



  onPress() {
    var { disabled, onValueChange, type } = this.props
    this.value = !this.value

    if (this.animation && !disabled) {

      if (type == 2) {
        if (this.value) {
          this.animation.play(10, 60)
        } else {
          this.animation.play(0, 10)
        }
      }

      else {
        if (this.value) {
          this.animation.play(0, 75)
        } else {
          this.animation.play(75, 150)
        }
      }
    }

    onValueChange(this.value)
  }



  render() {

    var { disabled, style, type } = this.props

    return (
      <TouchableOpacity
        onPress={() => { this.onPress() }}
        disabled={disabled}
      >
        <View style={[styles.container, style]}>
          <LottieView
            ref={animation => {
              this.animation = animation
            }}
            speed={type == 2 ? 1 : 6}
            loop={false}
            source={type == 2 ? require('../assets/anims/checkbox_green_2') : require('../assets/anims/checkbox_green')}
          />
        </View>
      </TouchableOpacity >
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: 47,
    height: 47,
  },
})



export default CheckBox
