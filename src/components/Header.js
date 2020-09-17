import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

import vectorIcons from '../values/vectorIcons'
import colors from '../values/colors'
import globalStyles from '../values/globalStyles'


class Header extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    title: PropTypes.element,
    button: PropTypes.element,
    leftButtonType: PropTypes.oneOf(['none', 'back', 'navigationDrawer']),
    backButtonIcon: PropTypes.element,
    navigationDrawerButtonIcon: PropTypes.element,
    isTitleOnCenter: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.shape({}),
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.shape({}),
    ]),
  }


  static defaultProps = {
    leftButtonType: 'none',
    isTitleOnCenter: true,
    backButtonIcon: (
      <Svg height="20" width="20" viewBox={vectorIcons.chevron.viewBox}>
        <Path fill="white" d={vectorIcons.chevron.d} />
      </Svg>
    ),
    navigationDrawerButtonIcon: (
      <Svg height="20" width="20" viewBox={vectorIcons.menu.viewBox}>
        <Path fill="white" d={vectorIcons.menu.d1} />
        <Path fill="white" d={vectorIcons.menu.d2} />
        <Path fill="white" d={vectorIcons.menu.d3} />
      </Svg>
    ),
  }



  constructor(props) {
    super(props)

    this.state = {
      imagePath: '',
    }
  }



  componentDidMount() {

  }



  componentWillUnmount() {

  }




  render = () => {

    var {
      navigation,
      style,
      title,
      button,
      leftButtonType,
      isTitleOnCenter,
      backButtonIcon,
      navigationDrawerButtonIcon,
    } = this.props

    return (
      <View style={[styles.header, style]}>
        <View style={[globalStyles.flex1, globalStyles.alignStart]}>
          {
            leftButtonType == 'back' || leftButtonType == 'navigationDrawer' ?
              <TouchableOpacity
                style={{ padding: 15, }}
                onPress={() => {
                  leftButtonType == 'back' ?
                    navigation.goBack()
                    :
                    navigation.toggleDrawer()
                }}>
                {
                  leftButtonType == 'back' ?
                    backButtonIcon
                    :
                    navigationDrawerButtonIcon
                }
              </TouchableOpacity>
              : null
          }

          {!isTitleOnCenter ? title : null}
        </View>


        <View style={[globalStyles.flex3, globalStyles.alignCenter]}>
          {isTitleOnCenter ? title : null}
        </View>

        <View style={[globalStyles.flex1, globalStyles.alignEnd]}>
          {button}
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.appColor,
  }
})

export default Header