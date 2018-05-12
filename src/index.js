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

class App extends Component {
  constructor() {
    super();
    this.state = {
      initial: true,
      text: '0.',
      ans: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;
    //const symb = (this.props.digits[id]).trim()
    this.setState((state, props) => {
      return (
        {
          text: state.initial ? props.digits[id] : state.text + props.digits[id],
          initial: false,
        }
      )
    }) 
  }

  handleEqual(event) {
    const result = calc(this.state.text.split(' '));
    this.setState((state, props) => {
      return (
        {
          text: result,
          initial: true,
          ans: [result],
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