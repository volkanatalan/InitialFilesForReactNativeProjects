/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { string, func, object, number, array } from 'prop-types';


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
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textStyles: object,
    style: object,
    otherTextProps: object,
  }



  static defaultProps = {
    value: {},
    values: [],
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'grey',
    textStyles: {},
    style: {},
    otherTextInputAttributes: {},
  }



  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value && value.value ? 1 : 0);

    this.state = {
      modalVisible: false,
      modalBoxHeight: 0,
      isFieldActive: false,
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
    var { values } = this.props
    var items = []

    for (let i = 0; i < values.length; i++) {
      items.push(
        <TouchableOpacity
          style={[styles.item]}
          onPress={() => { this._onChangeValue(values[i]) }}
        >
          <Text style={[styles.itemText]}>{values[i].label}</Text>
        </TouchableOpacity>
      )
    }

    return items
  }



  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }



  _onChangeValue = (updatedValue) => {
    const { attrName, updateMasterState } = this.props;
    this.closeModal()
    this._handleFocus()
    updateMasterState(attrName, updatedValue);
  }



  closeModal() {
    this.setState({ modalVisible: false })
  }



  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize,
    } = this.props;

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 5],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    }
  }



  render() {

    var { modalVisible } = this.state

    return (
      <View style={[styles.container, this.props.style]}>

        <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }}>

          <Animated.Text style={[styles.titleStyles, this._returnAnimatedTitleStyles()]} >
            {this.props.title}
          </Animated.Text>

          <Text
            style={[styles.text, this.props.textStyles]}
            numberOfLines={1}
            {...this.props.otherTextProps}
          >
            {this.props.value.label}
          </Text>

        </TouchableOpacity>





        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => { this.setState({ modalVisible: false }) }}
        >
          <View
            style={[styles.modal]}
            onLayout={(e) => { this.onModalLayout(e) }} >

            <View style={[styles.scrollContainer, { height: this.state.modalBoxHeight }]}>
              <ScrollView style={[styles.scroll]}>
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
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 0.5,
    paddingHorizontal: 5,
  },

  text: {
    fontSize: 15,
    color: 'black',
    padding: 0,
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },

  titleStyles: {
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

  itemText: {
    fontSize: 16,
  },
})
