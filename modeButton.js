import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 30,
    color: '#000',
  },
})

export class ModeButton extends React.Component {
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
