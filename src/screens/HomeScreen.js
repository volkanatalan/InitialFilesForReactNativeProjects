import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import Header from '../components/Header'

import colors from '../values/colors'
import globalStyles from '../values/globalStyles'


export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      
    }
  }


  componentDidMount() {
    
  }



  render(){

    var {

    } = this.state

    return(
      <View style={[styles.container]}>
        <SafeAreaView style={{ backgroundColor: colors.appColor }} />
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            leftButtonType="back"
            navigation={this.props.navigation}
            title={<Text style={[globalStyles.headerTextTitle]}>HomeScreen</Text>}
          />
          <ScrollView style={{ flex: 1 }}>
            <View>
              
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  
})
