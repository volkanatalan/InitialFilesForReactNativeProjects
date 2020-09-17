import React from 'react'
import {
  StyleSheet,
  View,
  Text,
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
        
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },

})



export default SplashScreen
