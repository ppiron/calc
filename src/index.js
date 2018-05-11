import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: this.defaultText
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    }) 
  }

  render() {
    return (
      <div>
        <p>
          Start editing to see some magic happen :)
        </p>
        <div id="calc">
          <div id='display' className='display'>0.</div>
          <div id='zero' className='digit'>0</div>
          <div id='one' className='digit'>1</div>
          <div id='two' className='digit'>2</div>
          <div id='three' className='digit'>3</div>
          <div id='four' className='digit'>4</div>
          <div id='five' className='digit'>5</div>
          <div id='six' className='digit'>6</div>
          <div id='seven' className='digit'>7</div>
          <div id='eight' className='digit'>8</div>
          <div id='nine' className='digit'>9</div>
          <div id='decimal' className='decimal'>.</div>
          <div id='equals' className='equals'>=</div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));