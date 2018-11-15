import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSyncAlt,
  faUndo,
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
      startLife: 20,
      playerOneLife: 20,
      playerTwoLife: 20,
      playerThreeLife: 20,
      playerFourLife: 20,
      menuVisible: false,
      lifeMenuVisible: false,
    };

    this.incrementLife = this.incrementLife.bind(this);
    this.decrementLife = this.decrementLife.bind(this);
    this.resetAllLife = this.resetAllLife.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeStartLife = this.changeStartLife.bind(this);
    this.toggleLifeMenu = this.toggleLifeMenu.bind(this);
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
      playerOneLife: this.state.startLife,
      playerTwoLife: this.state.startLife,
      playerThreeLife: this.state.startLife,
      playerFourLife: this.state.startLife,
    });
  }

  changeStartLife(i){
    this.setState({
      playerOneLife: i,
      playerTwoLife: i,
      playerThreeLife: i,
      playerFourLife: i,
      startLife: i
    })
  }

  toggleMenu(){
    this.setState({
      menuVisible: !this.state.menuVisible,
      lifeMenuVisible: false
    })
  }

  toggleLifeMenu(){
    this.setState({
      lifeMenuVisible: !this.state.lifeMenuVisible
    })
  }

  render() {
    const playerCount = this.state.playerCount;
    let players;
    if (playerCount === 2){
      players = 
      <div className="boardInner">
        <div className="onePlayerTop">
          <Counter className="playerOne"
            initialLife={this.state.playerOneLife}
            onPlusClick={() => this.incrementLife("playerOneLife")}
            onMinusClick={() => this.decrementLife("playerOneLife")}
          />
        </div>
        <div className="onePlayerBottom">
          <Counter className="playerTwo"
            initialLife={this.state.playerTwoLife}
            onPlusClick={() => this.incrementLife("playerTwoLife")}
            onMinusClick={() => this.decrementLife("playerTwoLife")}
          />
        </div>
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
      </div>
    }
 
    return (
      <div className="gameBoard">
        {players}

        <MenuOverlay 
          onMenuClick={() => this.toggleMenu()}
          checkState={this.state.menuVisible}
        />

        <MainMenu 
          menuIsOpen={this.state.menuVisible}
          lifeMenuIsOpen={this.state.lifeMenuVisible}
          onResetLifeClick={() => this.resetAllLife() }
          onLifeMenuClick={ () => this.toggleLifeMenu() }
        />

        <LifeMenu 
          lifeMenuIsOpen={this.state.lifeMenuVisible}
          onChangeStartLifeToTwenty={() => this.changeStartLife(20)} 
          onChangeStartLifeToThirty={() => this.changeStartLife(30)} 
          onChangeStartLifeToFourty={() => this.changeStartLife(40)} 
          returnToMainMenu={()=> this.toggleLifeMenu()}
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
      <div onClick={this.props.onMenuClick} className={this.props.checkState ? "MenuOverlay active":"MenuOverlay"}>
        <span >{element}</span>
      </div>
    )
  }
}

class MainMenu extends React.Component {
  
  render() {
    return (
      <div className={(this.props.menuIsOpen) && (!this.props.lifeMenuIsOpen) ? "menu active":"menu"}> 
        <ul>
          <li><FontAwesomeIcon icon={faDice} /></li>
          <li><FontAwesomeIcon icon={faUsers} /></li>
          <li onClick={this.props.onResetLifeClick}><FontAwesomeIcon icon={faSyncAlt} /></li>
          <li onClick={this.props.onLifeMenuClick}><FontAwesomeIcon icon={faHeart} /></li>
        </ul>
      </div>
    )
  }
}

class LifeMenu extends React.Component {
 
  render() {
    return (
      <div className={this.props.lifeMenuIsOpen ? "lifeMenu active": "lifeMenu"}>
        <ul>
          <li onClick={this.props.returnToMainMenu}><FontAwesomeIcon icon={faUndo} /></li>
          <li onClick={this.props.onChangeStartLifeToTwenty}>20</li>
          <li onClick={this.props.onChangeStartLifeToThirty}>30</li>
          <li onClick={this.props.onChangeStartLifeToFourty}>40</li>
        </ul>
      </div>
    )
  }
}

export default Board;
