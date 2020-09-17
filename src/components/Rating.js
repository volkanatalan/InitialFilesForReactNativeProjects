import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'

import PropTypes, { oneOfType, string, array, func, object, number, shape } from 'prop-types'

import vectorIcons from '../values/vectorIcons'
import colors from '../values/colors'



const starSize = 40


class Rating extends React.Component {

  static propTypes = {
    value: number.isRequired,
    onValueChange: func.isRequired,
    style: oneOfType([
      array,
      number,
      shape({}),
    ]),
  }



  static defaultProps = {
    value: 0,
    onValueChange: () => { },
  }



  constructor(props) {
    super(props)

    this.state = {

    }
  }


  componentDidMount() {

  }



  renderStars() {
    var { value, onValueChange } = this.props
    var stars = []

    for (let i = 1; i < 6; i++) {
      stars.push(
        <TouchableWithoutFeedback
          key={'star' + i}
          style={[styles.starButton]}
          onPress={() => { onValueChange(i) }}
        >
          {i <= value ?
            <Svg width={starSize} height={starSize} viewBox={vectorIcons.starSolid.viewBox} >
              <Path fill={colors.star} d={vectorIcons.starSolid.d} />
            </Svg>
            :
            <Svg width={starSize} height={starSize} viewBox={vectorIcons.starOutlined.viewBox} >
              <Path fill={colors.star} d={vectorIcons.starOutlined.d} />
            </Svg>
          }
        </TouchableWithoutFeedback>
      )
    }

    return stars
  }



  render() {

    var { value, style } = this.props

    return (
      <View style={[styles.container, style]}>
        {this.renderStars()}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: starSize * 5,
    height: starSize,
    alignSelf: 'center',
    marginBottom: 15,
  },

  starButton: {
    width: starSize,
    height: starSize,
  },
})



export default Rating
