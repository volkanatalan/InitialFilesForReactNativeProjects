import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native'

import colors from '../values/colors'
import globalStyles from '../values/globalStyles'


class SplashScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }



  componentDidMount() {
    // setTimeout(() => {
    //   this.props.navigation.dispatch(StackActions.replace('LoginScreen'))
    // }, 2000)
  }



  render() {

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <ActivityIndicator size="large" color={colors.appColor} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

})



export default SplashScreen
