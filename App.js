import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Constants } from 'expo'

import { cdf, ppf } from './gaussian.js'
import { factorial, permutation, combination } from './factorial.js'
import { squareroot } from './squareroot.js'

import { OutputBox } from './outputBox.js'
import { BinaryOperation } from './binaryOperation.js'
import { UnaryOperation } from './unaryOperation.js'
import { NumberButton } from './numberButton.js'
import { ModeButton } from './modeButton.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    paddingTop: Constants.statusBarHeight,
    marginBottom: 30,
  },
  buttonRow: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButtonRow: {
    marginBottom: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      outputValue: 0,
      userIsInTheMiddleOfTyping: false,
      firstValueOnHold: 0,
      binaryOperationOnHold: '',
      userIsInTheMiddleOfBinaryOperation: false,
      currentCalculatorMode: "Basic",
    }
  }

  // main function to change the output value
  // if user is already typing, the numbers are appended to the current value
  // otherwise, the number replaces the '0' and user continues typing
  changeValue = (label) => {
    if (this.state.userIsInTheMiddleOfTyping) {
      if (this.state.outputValue.toString().indexOf('.') > -1 && label == ".") {
        this.setState(prevState => ({
          outputValue: prevState.outputValue
        }))
      } else {
        this.setState(prevState => ({
          outputValue: prevState.outputValue + label
        }))
      }
    } else {
      this.setState({
        outputValue: label,
        userIsInTheMiddleOfTyping: true,
      })
    }
  }

  // function for mathematical constants e.g. PI, e, etc
  // sets output value as the value of the desired constant
  mathematicalConstant = (label) => {
    switch (label) {
      case "π":
        this.setState({
          outputValue: Math.PI,
        })
        break
      case "e":
        this.setState({
          outputValue: Math.E,
        })
    }
  }

  // brain for doing unary operation
  // takes the current output value, passes it to the desired function
  performUnaryOperation = (label) => {
    switch (label) {
      case "sin":
        this.setState(prevState => ({
          outputValue: Math.sin(prevState.outputValue)
        }))
        break
      case "cos":
        this.setState(prevState => ({
          outputValue: Math.cos(prevState.outputValue)
        }))
        break
      case "tan":
        this.setState(prevState => ({
          outputValue: Math.tan(prevState.outputValue)
        }))
        break
      case "asin":
        this.setState(prevState => ({
          outputValue: Math.asin(prevState.outputValue)
        }))
        break
      case "acos":
        this.setState(prevState => ({
          outputValue: Math.acos(prevState.outputValue)
        }))
        break
      case "atan":
        this.setState(prevState => ({
          outputValue: Math.atan(prevState.outputValue)
        }))
        break
      case "√":
        this.setState(prevState => ({
          outputValue: squareroot(prevState.outputValue)
        }))
        break
      case "±":
        this.setState(prevState => ({
          outputValue: -prevState.outputValue
        }))
        break
      case "x!":
        if (this.state.outputValue == ".") {
          this.setState({
            outputValue: "Syntax ERROR"
          })
        } else {
          this.setState(prevState => ({
            outputValue: factorial(parseFloat(prevState.outputValue))
          }))
        }
        break
      case "z":
        this.setState(prevState => ({
          outputValue: ppf(prevState.outputValue).toFixed(3)
        }))
        break
      case "φ(z)":
        this.setState(prevState => ({
          outputValue: cdf(prevState.outputValue).toFixed(3)
        }))
        break
      case "AC":
        this.setState({
          outputValue: 0,
          userIsInTheMiddleOfTyping: false,
          firstValueOnHold: 0,
          binaryOperationOnHold: '',
          userIsInTheMiddleOfBinaryOperation: false,
        })
        break
    }
  }

  // puts the calculator on a pending binary operation
  // when the operation is pressed, e.g. +, -, etc,
  // puts the current value as the on-hold value
  // puts the operation as the on-hold operation
  // then readies the calculator for the second number input

  // if calculator already in pending operation,
  // immediately performs the operation,
  // then also readies calculator for another operation
  pendingBinaryOperation = (label) => {
    if (this.state.userIsInTheMiddleOfBinaryOperation) {
      this.performBinaryOperation()
      this.setState(prevState => ({
        binaryOperationOnHold: label,
        firstValueOnHold: prevState.outputValue,
        userIsInTheMiddleOfBinaryOperation: true,
      }))
    } else {
      this.setState({
        firstValueOnHold: this.state.outputValue,
        binaryOperationOnHold: label,
        userIsInTheMiddleOfBinaryOperation: true,
        userIsInTheMiddleOfTyping: false,
        outputValue: '0',
      })
    }
  }

  // when the user has input the second value, and the operation is already pending,
  // takes the two inputs, and the shows the output

  // if done via the '=' button, clear all the on-hold values, and resets the operations
  // else if done via another operation, e.g. +, -, readies the calculator for another operation
  performBinaryOperation = () => {
    if (this.state.userIsInTheMiddleOfBinaryOperation) {
      switch (this.state.binaryOperationOnHold) {
        case "+":
          this.setState(prevState => ({
            outputValue: (parseFloat(this.state.firstValueOnHold) + parseFloat(prevState.outputValue))
          }))
          break
        case "-":
          this.setState(prevState =>  ({
            outputValue: (parseFloat(this.state.firstValueOnHold) - parseFloat(prevState.outputValue))
          }))
          break
        case "x":
          this.setState(prevState =>  ({
            outputValue: (parseFloat(this.state.firstValueOnHold) * parseFloat(prevState.outputValue))
          }))
          break
        case "÷":
          this.setState(prevState =>  ({
            outputValue: (parseFloat(this.state.firstValueOnHold) / parseFloat(prevState.outputValue))
          }))
          break
        case "nPr":
          if (this.state.firstValueOnHold == "." || this.state.outputValue == ".") {
            this.setState({
              outputValue: "Syntax ERROR"
            })
          } else {
            this.setState(prevState =>  ({
              outputValue: permutation(parseFloat(this.state.firstValueOnHold), parseFloat(prevState.outputValue))
            }))
          }
          break
        case "nCr":
          if (this.state.firstValueOnHold == "." || this.state.outputValue == ".") {
            this.setState({
              outputValue: "Syntax ERROR"
            })
          } else {
            this.setState(prevState =>  ({
              outputValue: combination(parseFloat(this.state.firstValueOnHold), parseFloat(prevState.outputValue))
            }))
          }
          break
      }
      this.setState({
        userIsInTheMiddleOfBinaryOperation: false,
        userIsInTheMiddleOfTyping: false,
        binaryOperationOnHold: '',
      })
    }
  }

  // changes the mode of the calculator
  changeCalculatorMode = (label) => {
    switch (label) {
      case "Basic":
        this.setState({
          currentCalculatorMode: "Basic",
        })
      break
      case "Trigo":
        this.setState({
          currentCalculatorMode: "Trigonometry",
        })
      break
      case "Stats":
        this.setState({
          currentCalculatorMode: "Statistics",
        })
      break
    }
  }

  render() {
    switch (this.state.currentCalculatorMode) {
      case "Basic":
        var specialButtonOne = <NumberButton onPress={this.mathematicalConstant} label="π"/>
        var specialButtonTwo = <UnaryOperation onPress={this.performUnaryOperation} label="sin"/>
        var specialButtonThree = <UnaryOperation onPress={this.performUnaryOperation} label="cos"/>
        var specialButtonFour = <UnaryOperation onPress={this.performUnaryOperation} label="tan"/>
        break
      case "Trigonometry":
        var specialButtonOne = <NumberButton onPress={this.mathematicalConstant} label="e"/>
        var specialButtonTwo = <UnaryOperation onPress={this.performUnaryOperation} label="asin"/>
        var specialButtonThree = <UnaryOperation onPress={this.performUnaryOperation} label="acos"/>
        var specialButtonFour = <UnaryOperation onPress={this.performUnaryOperation} label="atan"/>
        break
      case "Statistics":
        var specialButtonOne = <UnaryOperation onPress={this.performUnaryOperation} label="z"/>
        var specialButtonTwo = <UnaryOperation onPress={this.performUnaryOperation} label="φ(z)"/>
        var specialButtonThree = <BinaryOperation onPress={this.pendingBinaryOperation} label="nPr"/>
        var specialButtonFour = <BinaryOperation onPress={this.pendingBinaryOperation} label="nCr"/>
        break
    }
    return (
      <View style={styles.container}>
        <OutputBox output={this.state.outputValue}/>
        <View style={styles.modeButtonRow}>
          <ModeButton onPress={this.changeCalculatorMode} label="Basic"/>
          <ModeButton onPress={this.changeCalculatorMode} label="Trigo"/>
          <ModeButton onPress={this.changeCalculatorMode} label="Stats"/>
        </View>
        <View style={styles.buttonRow}>
          {specialButtonOne}
          {specialButtonTwo}
          {specialButtonThree}
          {specialButtonFour}
        </View>
        <View style={styles.buttonRow}>
          <BinaryOperation onPress={this.pendingBinaryOperation} label="+"/>
          <BinaryOperation onPress={this.pendingBinaryOperation} label="-"/>
          <BinaryOperation onPress={this.pendingBinaryOperation} label="x"/>
          <BinaryOperation onPress={this.pendingBinaryOperation} label="÷"/>
        </View>
        <View style={styles.buttonRow}>
          <UnaryOperation onPress={this.performUnaryOperation} label="√"/>
          <NumberButton onPress={this.changeValue} label="7"/>
          <NumberButton onPress={this.changeValue} label="8"/>
          <NumberButton onPress={this.changeValue} label="9"/>
        </View>
        <View style={styles.buttonRow}>
          <UnaryOperation onPress={this.performUnaryOperation} label="x!"/>
          <NumberButton onPress={this.changeValue} label="4"/>
          <NumberButton onPress={this.changeValue} label="5"/>
          <NumberButton onPress={this.changeValue} label="6"/>
        </View>
        <View style={styles.buttonRow}>
          <UnaryOperation onPress={this.performUnaryOperation} label="±"/>
          <NumberButton onPress={this.changeValue} label="1"/>
          <NumberButton onPress={this.changeValue} label="2"/>
          <NumberButton onPress={this.changeValue} label="3"/>
        </View>
        <View style={styles.buttonRow}>
          <UnaryOperation onPress={this.performUnaryOperation} label="AC"/>
          <NumberButton onPress={this.changeValue} label="."/>
          <NumberButton onPress={this.changeValue} label="0"/>
          <BinaryOperation onPress={this.performBinaryOperation} label="="/>
        </View>
      </View>
    )
  }
}
