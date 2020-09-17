import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import colors from '../values/colors';


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
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  
});



export default LoginScreen;
