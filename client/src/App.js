import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

import LinkDisplay from './LinkDisplay';




const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      subject:"",
      difficulty:EASY,
      submitted:false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    //axios.get
    this.setState({
      submitted:true,
    });
  }

  render() {
    var linkDisplay = null;
    if(this.state.submitted)
    {
      linkDisplay = (
        <React.Fragment>
          <LinkDisplay/>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className = "masterContainer">
          <div className = "container">
            <div>(StudentSearch)</div>
            <br></br>
            <h3 className = "preface">I want to learn...</h3>
            <input className = "searchBox"></input>
            <ButtonGroup className="mr-2" aria-label="First group">
              <DropdownButton className="super-colors" id="dropdown-basic-button" title={"Difficulty: "+this.state.difficulty}>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:EASY})}}>{EASY}</Dropdown.Item>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:MEDIUM})}}>{MEDIUM}</Dropdown.Item>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:HARD})}}>{HARD}</Dropdown.Item>
              </DropdownButton>
              <Button className="wbutton" onClick = {this.handleSubmit}>Search</Button>
            </ButtonGroup>

            {linkDisplay}
          </div>
         </div>

      </React.Fragment>
    );
  }
}

export default App;
