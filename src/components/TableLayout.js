/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import PropTypes, { oneOfType, string, array, func, object, number, shape } from 'prop-types';


class TableLayout extends React.Component {

  static propTypes = {
    values: array.isRequired,
    colCount: number.isRequired,
    renderCellItem: func.isRequired,
    style: oneOfType([
      array,
      number,
      shape({}),
    ]),
  }



  static defaultProps = {
    values: [],
  }



  constructor(props) {
    super(props)

    this.state = {

    }
  }


  componentDidMount() {

  }



  renderRows(colCount, items) {

    var itemCount = items.length;
    var rowCount = Math.ceil(itemCount / colCount);
    var rows = [];

    for (let i = 0; i < rowCount; i++) {
      var rowItems = []

      for (let j = i * colCount; j < i * colCount + colCount; j++) {
        if (items.length > j) {
          var item = items[j]
          rowItems.push(item)
        }
      }

      var row = (
        <View key={'row' + i} style={{ flexDirection: 'row', margin: 5, marginBottom: 20 }}>
          {this.renderCols(colCount, i, rowItems)}
        </View>
      )

      rows.push(row)
    }

    return rows

  }



  renderCols(colCount, rowNo, items) {
    var {renderCellItem} = this.props;

    var cols = []

    for (let i = 0; i < colCount; i++) {
      var index = rowNo * colCount + i;
      var item = items[i]
      var col = (
        <View key={'col' + index} style={{ flex: 1, margin: 1 }}>
          {item != null ? renderCellItem(item, index) : null}
        </View>
      )

      cols.push(col)
    }

    return cols
  }



  render() {

    var { colCount, values, style } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderRows(colCount, values)}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    
  },

});



export default TableLayout;
