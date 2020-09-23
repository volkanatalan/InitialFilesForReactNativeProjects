import React, { Component } from 'react'
import { View, Animated, StyleSheet, Text, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { oneOf, oneOfType, string, func, object, number, array, shape } from 'prop-types'
import Svg, { Path } from 'react-native-svg'
import vectorIcons from '../values/vectorIcons'
import colors from '../values/colors'


let modalHeight = 0
let maxModalBoxHeight = 0
let modalContentContainerHeight = 0
const modalPadding = 20

export default class FloatingTitleSelectBox extends Component {

  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: object.isRequired,
    values: array.isRequired,
    updateMasterState: func.isRequired,
    titleActiveSize: number,
    titleInActiveSize: number,
    titleActiveColor: string,
    titleActiveDarkColor: string,
    titleInactiveColor: string,
    titleInactiveDarkColor: string,
    theme: oneOf(['light', 'dark']),
    textStyle: oneOfType([
      shape({}),
      array,
      object,
    ]),
    style: oneOfType([
      shape({}),
      array,
      object,
    ]),
    otherTextProps: object,
  }



  static defaultProps = {
    value: {},
    values: [],
    titleActiveSize: 12,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleActiveDarkColor: 'darkgray',
    titleInactiveColor: 'grey',
    titleInactiveDarkColor: 'grey',
    textStyle: {},
    style: {},
    otherTextInputAttributes: {},
    theme: 'light',
  }



  constructor(props) {
    super(props)
    const { value } = this.props
    this.position = new Animated.Value(value && value.value ? 1 : 0)

    this.state = {
      modalVisible: false,
      modalBoxHeight: 0,
      isFieldActive: value && value.value,
    }
  }



  onModalLayout(e) {
    modalHeight = e.nativeEvent.layout.height
    maxModalBoxHeight = modalHeight - (2 * modalPadding)
    this.setModalBoxHeight()
  }



  onModalContentContainerLayout(e) {
    modalContentContainerHeight = e.nativeEvent.layout.height
    this.setModalBoxHeight()
  }



  setModalBoxHeight() {
    if (modalContentContainerHeight > 0 && maxModalBoxHeight > 0) {
      var modalBoxHeight = modalContentContainerHeight > maxModalBoxHeight ? maxModalBoxHeight : modalContentContainerHeight
      this.setState({ modalBoxHeight })
    }
  }



  renderItems() {
    var { values, theme } = this.props
    var items = []

    for (let i = 0; i < values.length; i++) {
      items.push(
        <TouchableOpacity
          key={'item' + i}
          style={[
            styles.item,
            i == values.length - 1 ? { borderBottomWidth: 0 } : null,
            theme == 'dark' ? styles.itemDark : null
          ]}
          onPress={() => { this._onChangeValue(values[i]) }}
        >
          <Text style={[styles.itemText, theme == 'dark' ? styles.itemTextDark : null]}>
            {values[i].label}
          </Text>
        </TouchableOpacity>
      )
    }

    return items
  }



  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true })
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start()
    }
  }



  _onChangeValue = (updatedValue) => {
    const { attrName, updateMasterState } = this.props
    this.closeModal()
    this._handleFocus()
    updateMasterState(attrName, updatedValue)
  }



  closeModal() {
    this.setState({ modalVisible: false })
  }



  _returnAnimatedTitleStyles = () => {
    const { theme, titleActiveDarkColor, titleInactiveDarkColor } = this.props
    const { isFieldActive } = this.state
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize,
    } = this.props

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 7],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive && theme == 'dark' ? titleActiveDarkColor : isFieldActive ? titleActiveColor : theme == 'dark' ? titleInactiveDarkColor : titleInactiveColor,
    }
  }



  render() {

    var { theme } = this.props
    var { modalVisible } = this.state

    return (
      <View style={[styles.container, theme == 'dark' ? styles.containerDark : null, this.props.style]}>

        <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }}>

          <Animated.Text style={[styles.title, this._returnAnimatedTitleStyles()]} >
            {this.props.title}
          </Animated.Text>

          <Svg style={[styles.chevron]} viewBox={vectorIcons.chevron.viewBox}>
            <Path d={vectorIcons.chevron.d} fill={'gray'} />
          </Svg>

          <Text
            style={[styles.text, theme == 'dark' ? styles.textDark : null, this.props.textStyle]}
            numberOfLines={1}
            {...this.props.otherTextProps}
          >
            {this.props.value.label}
          </Text>

        </TouchableOpacity>



        <Modal
          animationType="fade"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => { this.setState({ modalVisible: false }) }}
        >
          <View
            style={[styles.modal]}
            onLayout={(e) => { this.onModalLayout(e) }} >

            <View style={[styles.scrollContainer, { height: this.state.modalBoxHeight }]}>
              <ScrollView style={[styles.scroll, theme == 'dark' ? styles.scrollDark : null]}>
                <View
                  style={[styles.scrollInside]}
                  onLayout={(e) => { this.onModalContentContainerLayout(e) }}>
                  {this.renderItems()}
                </View>
              </ScrollView>
            </View>

          </View>
        </Modal>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 5,
  },

  containerDark: {
    borderColor: 'white',
  },

  text: {
    fontSize: 17,
    color: 'black',
    padding: 0,
    paddingTop: 21,
    paddingHorizontal: 5,
    marginEnd: 25,
  },

  textDark: {
    color: 'white',
  },

  title: {
    position: 'absolute',
    left: 5,
  },

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },

  scrollContainer: {
    marginHorizontal: modalPadding,
  },

  scroll: {
    backgroundColor: 'white',
    width: '100%',
    height: 10,
    borderRadius: 3,
  },

  scrollDark: {
    backgroundColor: colors.modalWindowDark,
  },

  scrollInside: {
    padding: 3,
  },

  item: {
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },

  itemDark: {
    borderBottomColor: 'gray',
  },

  itemText: {
    fontSize: 16,
  },

  itemTextDark: {
    color: 'lightgray',
  },

  chevron: {
    position: 'absolute',
    top: 17.5, right: 5,
    width: 15,
    height: 15,
    transform: [{ rotate: '-90deg' }]
  }
})
