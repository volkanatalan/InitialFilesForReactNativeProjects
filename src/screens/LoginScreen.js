import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import Language, { isRtl, hiddenArabicCharacter } from '../scripts/Language'

import colors from '../values/colors'
import globalStyles from '../values/globalStyles'


class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      
    }
  }


  componentDidMount() {
    
  }



  render(){

    return(
      <View style={styles.container}>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  
})



export default LoginScreen
