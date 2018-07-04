import React from 'react'
import { Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    fontSize: SCREEN_WIDTH*0.1,
    color: '#000',
  },
})

export class UnaryOperation extends React.Component {
  static propTypes = {
    label: PropTypes.string,
  }

  _onPress = () => {
    this.props.onPress(this.props.label)
  }

  render() {
    return (
      <TouchableOpacity style={styles.buttonBox} onPress={this._onPress}>
        <Text style={styles.buttonText}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
}
