import React from 'react'
import {
  StyleSheet,
  Animated,
  PanResponder,
  Easing,
} from 'react-native'

import PropTypes, { oneOfType, string, array, func, object, number, shape } from 'prop-types'

import globalStyles from '../values/globalStyles'


class ExpandingScrollView extends React.Component {

  static propTypes = {
    minTop: number.isRequired,
    maxTop: number.isRequired,
    style: oneOfType([
      array,
      number,
      shape({}),
    ]),
  }



  static defaultProps = {
    minTop: 0,
    maxTop: 0,
    onPress: () => { },
  }



  constructor(props) {
    super(props)

    var { maxTop, minTop } = props


    var containerTopAnimVal = new Animated.Value(maxTop)
    var contentTopAnimVal = new Animated.Value(0)

    let totalScrollY = maxTop
    this.minScrollY = minTop


    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (e, gestureState) => {
        const { dx, dy } = gestureState
        return (Math.abs(dx) > 5) || (Math.abs(dy) > 5)
      },

      onPanResponderMove: (event, gesture) => {
        var { dy } = gesture

        this.state.contentTop.stopAnimation()
        this.state.contentTop.removeAllListeners()

        let scroll = totalScrollY + dy
        scroll = scroll > maxTop ? maxTop : scroll < this.minScrollY ? this.minScrollY : scroll
        // console.log('this.minScrollY: ' + this.minScrollY)

        containerTopAnimVal.setValue(scroll < minTop ? minTop : scroll > maxTop ? maxTop : scroll)
        this.state.contentTop.setValue(scroll < minTop ? scroll - minTop : 0)
        // console.log('move content top: ' + this.state.contentTop.__getValue())
        // console.log('totalScrollY: ' + totalScrollY)
        // console.log('scroll: ' + scroll)
      },

      onPanResponderRelease: (event, gesture) => {
        var { dy, vy } = gesture
        // console.log(gesture)
        // console.log('vy: ' + vy)

        totalScrollY += dy
        totalScrollY = totalScrollY > maxTop ? maxTop : totalScrollY < this.minScrollY ? this.minScrollY : totalScrollY


        if (totalScrollY < maxTop && totalScrollY > minTop) {
          var isDistanceEnough = dy < -20 || dy > 20

          let toValue = 0
          if (isDistanceEnough) {
            if (dy > 0) {
              toValue = maxTop
            }
            else {
              toValue = minTop
            }

          } else {
            if (dy < 0) {
              toValue = maxTop
            }
            else {
              toValue = minTop
            }
          }

          if (dy !== 0) {

            this.state.containerTop.addListener(({ value }) => totalScrollY = value)

            Animated.timing(this.state.containerTop, {
              toValue,
              duration: 300,
              useNativeDriver: false,
            }).start(() => {
              // totalScrollY = this.state.containerTop.__getValue()
              this.state.containerTop.removeAllListeners()
            })
          }

          // console.log(toValue)
        }

        else if (totalScrollY < minTop && Math.abs(vy) > .1) {

          this.state.contentTop.setValue(totalScrollY - minTop)
          console.log('vy: ' + vy)
          console.log('release content top: ' + this.state.contentTop.__getValue())


          this.state.contentTop.addListener(({ value }) => {
            // console.log('value: ' + value)
            totalScrollY = value + minTop
          })

          let toValue = totalScrollY - minTop + (vy * 300)
          toValue = toValue > 0 ? 0 : toValue < this.minScrollY - minTop ? this.minScrollY - minTop : toValue

          Animated.timing(this.state.contentTop, {
            toValue,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {
            this.state.contentTop.removeAllListeners()
          })
        }


      },
    })



    this.state = {
      panResponder,
      containerTop: containerTopAnimVal,
      contentTop: contentTopAnimVal,
    }

  }



  componentDidMount() {

  }



  onContainerLayout = (e) => {
    this.containerHeight = e.nativeEvent.layout.height
    this.onContainerOrContentLayout()
  }



  onContentLayout = (e) => {
    this.contentHeight = e.nativeEvent.layout.height
    this.onContainerOrContentLayout()
  }



  onContainerOrContentLayout() {
    var { minTop } = this.props

    if (this.containerHeight !== undefined && this.contentHeight !== undefined) {
      this.minScrollY = minTop - this.contentHeight + this.containerHeight
      this.minScrollY = this.minScrollY > minTop ? minTop : this.minScrollY
    }
  }



  render() {

    var { style, children } = this.props
    var { panResponder, containerTop, contentTop } = this.state

    return (
      <Animated.View
        onLayout={this.onContainerLayout}
        style={[styles.container, globalStyles.elevate2, style, { top: containerTop }]}
        {...panResponder.panHandlers}
      >
        <Animated.View
          onLayout={this.onContentLayout}
          style={[styles.content, { top: contentTop }]}>
          {children}
        </Animated.View>
      </Animated.View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    zIndex: 1000,
  },

  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
})



export default ExpandingScrollView
