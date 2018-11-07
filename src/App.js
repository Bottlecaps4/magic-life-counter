import React from 'react';
import './App.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneLife: 20,
      playerTwoLife: 20
    };

    this.incrementLife = this.incrementLife.bind(this);
    this.decrementLife = this.decrementLife.bind(this);
    this.resetAllLife = this.resetAllLife.bind(this);
  }

  incrementLife(life) {
    this.setState({
      [life]: this.state[life] + 1
    });
  }

  decrementLife(life) {
    this.setState({
      [life]: this.state[life] - 1
    });
  }

  resetAllLife() {
    this.setState({
      playerOneLife: 20,
      playerTwoLife: 20
    });
  }

  render() {
    return (
      <div>
        <Counter
          initialLife={this.state.playerOneLife}
          onPlusClick={() => this.incrementLife("playerOneLife")}
          onMinusClick={() => this.decrementLife("playerOneLife")}
        />
        <Counter
          initialLife={this.state.playerTwoLife}
          onPlusClick={() => this.incrementLife("playerTwoLife")}
          onMinusClick={() => this.decrementLife("playerTwoLife")}
        />
        <button onClick={this.resetAllLife}>Reset both Counters</button>
      </div>
    );
  }
}
class Counter extends React.Component { 
  
  render() {
    return (
      <div>
        <div className="LifeTotal">
          <button className="AddLife" onClick={this.props.onPlusClick}>+</button>
            {this.props.initialLife}
          <button onClick={this.props.onMinusClick}>-</button>
        </div>
        
      </div>
    )
  }
} 

export default Board;
