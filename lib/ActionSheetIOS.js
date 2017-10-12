import React from 'react'
import PropTypes from 'prop-types'
import {ActionSheetIOS} from 'react-native'

const optionNames = [
  'title',
  'message',
  'options',
  'tintColor',
  'cancelButtonIndex',
  'destructiveButtonIndex',
  'anchor'
]

function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

class ActionSheet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      metadata: null
    }
  }

  componentDidMount () {
    let options = this.props.options
    if (!isArray(options) || options.length === 0) {
      throw Error('Prop `options` must be an array and it must not be empty.')
    }
  }

  _onPress(buttonIndex) {
    this.props.onPress(buttonIndex, this.state.metadata)
    this.setState({metadata: null})
  }

  show (metadata = null) {
    this.setState({metadata: metadata})
    let props = this.props
    let options = optionNames.reduce((obj, name, index) => {
      if (typeof props[name] !== 'undefined' && props[name] !== null) obj[name] = props[name]
      return obj
    }, {})
    ActionSheetIOS.showActionSheetWithOptions(options, this._onPress.bind(this))
  }

  render () {
    return null
  }
}

ActionSheet.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  options: PropTypes.array.isRequired,
  tintColor: PropTypes.string,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  onPress: PropTypes.func,
  anchor: PropTypes.object
}

ActionSheet.defaultProps = {
  onPress: () => {}
}

export default ActionSheet
