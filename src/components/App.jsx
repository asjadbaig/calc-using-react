import React, { Component } from 'react';
import './App.css';
import CalculatorKey from "./CalculatorKey.jsx";
import CalculatorDisplay from "./CalculatorDisplay.jsx";
import { Container, Row, Col } from 'reactstrap';
const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

class App extends Component {
  state = {
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false
  };
  
  clearAll() {
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    })
  }

  clearDisplay() {
    this.setState({
      displayValue: '0'
    })
  }
  
  clearLastChar() {
    const { displayValue } = this.state
    
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }
  
  toggleSign() {
    const { displayValue } = this.state
    const newValue = parseFloat(displayValue) * -1
    
    this.setState({
      displayValue: String(newValue)
    })
  }
  
  inputPercent() {
    const { displayValue } = this.state
    const currentValue = parseFloat(displayValue)
    
    if (currentValue === 0)
      return
    
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100
    
    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    })
  }
  
  inputDot() {
    const { displayValue } = this.state
    
    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }
  
  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state
    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }
  
  performOperation(nextOperator) {    
    const { value, displayValue, operator } = this.state
    const inputValue = parseFloat(displayValue)
    
    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      
      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }
    
    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }
  
  handleKeyDown = (event) => {
    let { key } = event
    console.log(key);
    if (key === 'Enter')
      key = '='
    
    if ((/\d/).test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()
      
      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  };
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }
  
render() {
    const { displayValue } = this.state
    
    const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'
    
return (
 <Container>
        <Row>
          <Col className='calculator-wrap'>
              <div className='calculator'>
                
                  <CalculatorDisplay value={displayValue}/>
                 
                  <div className="calculator-keypad">
                    <div className="input-keys">
                      <div className="function-keys">
                        <CalculatorKey className="calculator-key key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
                        <CalculatorKey className="calculator-key key-sign" onPress={() => this.toggleSign()}>±</CalculatorKey>
                        <CalculatorKey className="calculator-key key-percent" onPress={() => this.inputPercent()}>%</CalculatorKey>
                      </div>
                      <div className="digit-keys">
                        <CalculatorKey className="calculator-key key-0" onPress={() => this.inputDigit(0)}>0</CalculatorKey>
                        <CalculatorKey className="calculator-key key-dot">●</CalculatorKey>
                        <CalculatorKey className="calculator-key key-1" onPress={() => this.inputDigit(1)}>1</CalculatorKey>
                        <CalculatorKey className="calculator-key key-2" onPress={() => this.inputDigit(2)}>2</CalculatorKey>
                        <CalculatorKey className="calculator-key key-3" onPress={() => this.inputDigit(3)}>3</CalculatorKey>
                        <CalculatorKey className="calculator-key key-4" onPress={() => this.inputDigit(4)}>4</CalculatorKey>
                        <CalculatorKey className="calculator-key key-5" onPress={() => this.inputDigit(5)}>5</CalculatorKey>
                        <CalculatorKey className="calculator-key key-6" onPress={() => this.inputDigit(6)}>6</CalculatorKey>
                        <CalculatorKey className="calculator-key key-7" onPress={() => this.inputDigit(7)}>7</CalculatorKey>
                        <CalculatorKey className="calculator-key key-8" onPress={() => this.inputDigit(8)}>8</CalculatorKey>
                        <CalculatorKey className="calculator-key key-9" onPress={() => this.inputDigit(9)}>9</CalculatorKey>
                      </div>
                    </div>
                    <div className="operator-keys">
                    <CalculatorKey className="calculator-key key-divide" onPress={() => this.performOperation('/')}>÷</CalculatorKey>
                    <CalculatorKey className="calculator-key key-multiply" onPress={() => this.performOperation('*')}>×</CalculatorKey>
                    <CalculatorKey className="calculator-key key-subtract" onPress={() => this.performOperation('-')}>−</CalculatorKey>
                    <CalculatorKey className="calculator-key key-add"  onPress={() => this.performOperation('+')}>+</CalculatorKey>
                    <CalculatorKey className="calculator-key key-equals" onPress={() => this.performOperation('=')}>=</CalculatorKey>
                  </div>
    </div>
  </div>
   
   </Col>
   </Row>
   </Container>
);
}
}
export default App;