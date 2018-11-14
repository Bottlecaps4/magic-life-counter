import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSyncAlt,
  faMinus, 
  faPlus ,
  faDice ,
  faUsers, 
  faHeart } from '@fortawesome/free-solid-svg-icons';

import './App.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: 2,
      playerOneLife: 20,
      playerTwoLife: 20,
      playerThreeLife: 20,
      playerFourLife: 20,
      menuVisible: true
    };

    this.incrementLife = this.incrementLife.bind(this);
    this.decrementLife = this.decrementLife.bind(this);
    this.resetAllLife = this.resetAllLife.bind(this);
    this.changePlayerCount = this.changePlayerCount.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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
      playerTwoLife: 20,
      playerThreeLife: 20,
      playerFourLife: 20,
    });
  }

  changePlayerCount(i){
    this.setState({
      playerCount: i
    })
  }

  toggleMenu(){
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  }

  render() {
    const playerCount = this.state.playerCount;
    let players;
    if (playerCount === 2){
      players = 
      <div className="boardInner">
        <div className="onePlayerTop">
          <Counter
            initialLife={this.state.playerOneLife}
            onPlusClick={() => this.incrementLife("playerOneLife")}
            onMinusClick={() => this.decrementLife("playerOneLife")}
          />
        </div>
        <div className="onePlayerBottom">
          <Counter
            initialLife={this.state.playerTwoLife}
            onPlusClick={() => this.incrementLife("playerTwoLife")}
            onMinusClick={() => this.decrementLife("playerTwoLife")}
          />
        </div>
        
        <button onClick={() => this.changePlayerCount(3)}>Change to 3</button>
      </div>
      
    } else if (playerCount === 3 ){
      players = 
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
        <Counter
          initialLife={this.state.playerThreeLife}
          onPlusClick={() => this.incrementLife("playerThreeLife")}
          onMinusClick={() => this.decrementLife("playerThreeLife")}
        />
        <button onClick={() => this.changePlayerCount(2)}>Change to 2</button>
      </div>
    }
 
    return (
      <div className="gameBoard">
        {players}
        {/* <span className="mainMenu" onClick={this.resetAllLife}>{element}</span> */}

        <MenuOverlay 
          onMenuClick={() => this.toggleMenu()}
          checkState={this.state.menuVisible}
        />
        
        
        
          <MenuItems 
            menuIsOpen={this.state.menuVisible}
          />
        
        
      </div>
    );
  }
}
class Counter extends React.Component { 
  
  render() {
    const minus = <FontAwesomeIcon icon={faMinus} />
    const plus = <FontAwesomeIcon icon={faPlus} />
    return (
      
      <div className="container">
        <div className="addLife">
          <button className="button" onClick={this.props.onPlusClick}>{plus}</button>
        </div>
        <div className="lifeCounter">
          <h1>{this.props.initialLife}</h1>
        </div>
          
        <div className="addLife">
          <div className="button button-minus" onClick={this.props.onMinusClick}>{minus}</div>
        </div>
      </div>
    )
  }
} 

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  }
}

class MenuOverlay extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  render() {
    const element =  <img src={ require ('./images/logo.png') } className="menu-logo" /> 

    return (
      <div onClick={this.props.onMenuClick} className={this.props.checkState ? "MenuOverlay":"MenuOverlay active"}>
        <span >{element}</span>
      </div>
    )
  }
}

class MenuItems extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      links: [{
        text: 'Dice',
        icon: <FontAwesomeIcon icon={faDice} />
      },{
        text: 'Players',
        icon: <FontAwesomeIcon icon={faUsers} />
      },{
        text: 'Reload',
        icon: <FontAwesomeIcon icon={faSyncAlt} />
      },{
        text: 'Life',
        icon: <FontAwesomeIcon icon={faHeart} />
      }]
    }
  }

  render() {
    let links = this.state.links.map((link, i) => <li> {link.icon}</li>  )

    return (
      
      <div className={this.props.menuIsOpen ? "menu":"menu active"}> 
        <ul>
          { links }
        </ul>
      </div>
    )
  }
}

export default Board;
