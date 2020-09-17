/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import vectorIcons from '../values/vectorIcons';
import colors from '../values/colors'
import commonStyles from '../values/commonStyles'


class Header extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    title: PropTypes.element,
    button: PropTypes.element,
    isBackButtonEnabled: PropTypes.bool,
    backButtonIcon: PropTypes.element,
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
    isBackButtonEnabled: false,
    isTitleOnCenter: false,
    backButtonIcon: (
      <Svg height="20" width="20" viewBox={vectorIcons.chevron.viewBox}>
        <Path fill="white" d={vectorIcons.chevron.d} />
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

    var { navigation, style, title, button, isBackButtonEnabled, isTitleOnCenter, backButtonIcon } = this.props

    return (
      <View style={[styles.header, style]}>
        <View style={[commonStyles.flex1, commonStyles.alignStart]}>
          {
            isBackButtonEnabled ?
              <TouchableOpacity
                style={{ padding: 15, }}
                onPress={() => navigation.goBack()}>
                {backButtonIcon}
              </TouchableOpacity>
              : null
          }

          {!isTitleOnCenter ? title : null}
        </View>


        <View style={[commonStyles.flex3, commonStyles.alignCenter]}>
          {isTitleOnCenter ? title : null}
        </View>

        <View style={[commonStyles.flex1, commonStyles.alignEnd]}>
          {button}
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.headerColor,
  }
})

export default Header;