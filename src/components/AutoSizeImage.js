import React from 'react'
import {
  StyleSheet,
  Image,
} from 'react-native'
import PropTypes, { oneOfType, string, array, number, shape, any } from 'prop-types'


export default class AutoSizeImage extends React.Component {

  static propTypes = {
    uri: string,
    asset: any,
    width: number,
    height: number,
    style: oneOfType([
      array,
      number,
      shape({}),
    ]),
  }



  static defaultProps = {
    style: {},
  }



  constructor(props) {
    super(props)

    // console.log('props.style: ' + JSON.stringify(props.style))

    if (props.style.length == undefined) {
      this.stylePropWidth = props.style.width
      this.stylePropHeight = props.style.height
    }

    else if (props.style.length > 0) {
      for (let i = 0; i < props.style.length; i++) {
        if (props.style[i].width) {
          this.stylePropWidth = props.style[i].width
        }

        if (props.style[i].height) {
          this.stylePropHeight = props.style[i].height
        }
      }
    }

    this.state = {
      width: props.width ? props.width : this.stylePropWidth ? this.stylePropWidth : 0,
      height: props.height ? props.height : this.stylePropHeight ? this.stylePropHeight : 0,
    }
  }


  componentDidMount() {
    if (!(this.props.width && this.props.height) && !(this.stylePropWidth && this.stylePropHeight)) {
      if (this.props.uri) {
        // console.log('this.props.uri')
        Image.getSize(this.props.uri, (w, h) => {
          this._onGetImageSize(w, h)
        })
      }

      else if (this.props.asset) {
        // console.log('this.props.asset')
        const { width, height } = Image.resolveAssetSource(this.props.asset)
        // console.log('w:' + width + ' h: ' + height)
        this._onGetImageSize(width, height)
      }
    }
  }



  _onGetImageSize(w, h) {
    let width, height
    var ratio = w / h

    if (this.props.width) {
      width = this.props.width
      height = width / ratio
    }

    else if (this.props.height) {
      height = this.props.height
      width = height * ratio
    }

    else if (this.stylePropWidth && typeof this.stylePropWidth == 'number') {
      width = this.stylePropWidth
      height = width / ratio
    }

    else if (this.stylePropHeight && typeof this.stylePropHeight == 'number') {
      height = this.stylePropHeight
      width = height * ratio
    }

    else {
      height = h
      width = w
    }

    // console.log('width: ' + width + ' height: ' + height)

    this.setState({
      width,
      height
    })
  }



  render() {

    var {
      uri,
      asset,
      style,
    } = this.props

    var {
      width,
      height,
    } = this.state

    // console.log('uri: ' + uri)
    // console.log('width: ' + width)
    // console.log('height: ' + height)

    return (uri || asset ?
      <Image
        source={uri ? { uri } : asset}
        style={[style, { width, height }]}
      />
      : null)
  }
}


const styles = StyleSheet.create({

})
