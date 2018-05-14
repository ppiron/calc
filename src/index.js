import React, { Component } from 'react';
import { render } from 'react-dom';
import Digit from './components/digit.jsx';
import calc from '../calc.js';

const digitMap = {
  'zero':   '0',
  'one':    '1',
  'two':    '2',
  'three':  '3',
  'four':   '4',
  'five':   '5',
  'six':    '6',
  'seven':  '7',
  'eight':  '8',
  'nine':   '9',
  'decimal':  '.',
  'add':    ' + ',
  'subtract': ' - ',
  'multiply': ' * ',
  'divide':   ' / ', 
}

const checkDoubleDot = str => {
  const l = str.length - 1;
  return str[l] === '.' && str[l - 1] === '.';
}

const checkDoubleZero = str => {
  return str[0] === '0' && str[1] === '0';
}

const checkDoubleOperator = str => {
  const st = str.split(' ').filter(itm => itm !== '').join('')
  const l1 = str.length - 1;
  const l = st.length - 1;
  const operators = ['+', '-', '*', '/'];
  if (operators.includes(st[l]) && operators.includes(st[l - 1])) {
    return str.slice(0, l1 - 5).concat(' ' + st[l] + ' ');
  }
  return false
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      initial: true,
      cont: false,
      text: '0.',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;
    let text;
    let cont;
    let initial;
    
    this.setState((state, props) => {
      if (state.initial) {
        text = props.digits[id];
        initial = false;
        cont = state.cont;
      } else {
        if (state.cont) {
          if (['+', '-', '*', '/'].includes((props.digits[id]).trim())) {
            text = state.text + props.digits[id];
            initial = state.initial;
            cont = false;
          } else {
            text = props.digits[id];
            initial = state.initial;
            cont = false;
          }
        } else {
          text = state.text + props.digits[id];
          initial = state.initial;
          cont = state.cont;
        }
      }

      if (checkDoubleDot(text) || checkDoubleZero(text)) {
        return (
          {
            initial: state.initial,
            text: state.text,
            cont: state.cont,
          }
        )  
      }
      
      if (checkDoubleOperator(text)) {
        console.log('giggi');
        return (
          {
            initial: state.initial,
            text: checkDoubleOperator(text),
            cont: state.cont,
          }
        )
      }

      return (
        {
          initial: initial,
          text: text,
          cont: cont,
        }
      )
    }) 
  }

  handleEqual(event) {
    console.log(this.state.text.split(' '));
    const result = calc(this.state.text.split(' '));
    this.setState((state, props) => {
      return (
        {
          cont: true,
          text: result,
        }
      )
    }) 
  }

  handleClear(event) {
    const {id} = event.target;
    this.setState((state, props) => {
      return (
        {
          text: '0.',
          initial: true,
          cont: false,
        }
      )
    }) 
  }

  render() {
    
    const digits = (Object.entries(this.props.digits)).map(([k,v]) => {
      return (
        <Digit key={k} id={k} click={this.handleClick}>{v}</Digit>
      )
    })
    
    return (
      <div>
        <p>
          Start editing to see some magic happen :)
        </p>
        <div id="calc">
          <div id='display' className='display'>{this.state.text}</div>
          {digits}
          <Digit id='equals' click={this.handleEqual}>=</Digit>
          <Digit id='clear' click={this.handleClear}>Clear</Digit>
        </div>
      </div>
    );
  }
}

render(<App digits={digitMap}/>, document.getElementById('root'));