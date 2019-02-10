import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
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
        <div className = "container">
          <h1>StudentSearch</h1>
          <div className = "preface">I want to learn...</div>
          <input className = "searchBox"></input>
          <DropdownButton className="super-colors" id="dropdown-basic-button" title={"Difficulty: "+this.state.difficulty}>
            <Dropdown.Item onClick = {()=>{this.setState({difficulty:EASY})}}>{EASY}</Dropdown.Item>
            <Dropdown.Item onClick = {()=>{this.setState({difficulty:MEDIUM})}}>{MEDIUM}</Dropdown.Item>
            <Dropdown.Item onClick = {()=>{this.setState({difficulty:HARD})}}>{HARD}</Dropdown.Item>
          </DropdownButton>
          <Button className="wbutton" onClick = {this.handleSubmit}>Search</Button>
          {linkDisplay}
        </div>

      </React.Fragment>
    );
  }
}

export default App;