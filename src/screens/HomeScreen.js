import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native'

import Header from '../components/Header'

import Language, { isRtl, hiddenArabicCharacter } from '../scripts/Language'

import colors from '../values/colors'
import globalStyles from '../values/globalStyles'


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }


  componentDidMount() {

  }



  render() {

    var {

    } = this.state

    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor={colors.appColor} />
        <SafeAreaView style={{ backgroundColor: colors.appColor }} />
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            leftButtonType="none"
            navigation={this.props.navigation}
            title={<Text style={[globalStyles.headerTextTitle]}>{Language.t("HomePage")}</Text>}
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
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
})
