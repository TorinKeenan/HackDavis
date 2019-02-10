import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

import LinkDisplay from './LinkDisplay';

const axios = require('axios');


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
      loading:false,
      response:"",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(){
    this.setState({
      submitted:false,
      loading:true,
    });
    console.log('http://localhost:5000/getlink?keyword='+this.state.subject+'&difficulty'+this.state.difficulty);
    axios.get('http://localhost:5000/getlink?keyword='+this.state.subject+'&difficulty'+this.state.difficulty)
    .then(
      res =>{
        console.log("RES",res.data);
        this.setState({
          submitted:true,
          loading:false,
          response:res.data
        })
      }
    )
    this.setState({
      submitted:true,
    });
  }
  handleChange(event){
   this.setState({subject: event.target.value});
   }

  render() {
    var linkDisplay = null;
    var loading = null;
    if(this.state.submitted)
    {
      linkDisplay = (
        <React.Fragment>
          <LinkDisplay link = {this.state.response}/>
        </React.Fragment>
      );
    }
    if(this.state.loading)
    {
      loading = (
        <div className = "loadingDiv">
        </div>
      )
    }



    return (
      <React.Fragment>
        <div className = "masterContainer">
          <div className = "container">
            <div>(StudentSearch)</div>
            <br></br>
            <h3 className = "preface">I want to learn...</h3>
            <input className = "searchBox" content = {this.state.subject} onChange={this.handleChange}></input>
            <ButtonGroup className="mr-2" aria-label="First group">
              <DropdownButton className="super-colors" id="dropdown-basic-button" title={"Difficulty: "+this.state.difficulty}>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:EASY})}}>{EASY}</Dropdown.Item>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:MEDIUM})}}>{MEDIUM}</Dropdown.Item>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:HARD})}}>{HARD}</Dropdown.Item>
              </DropdownButton>
              <Button className="wbutton" onClick = {this.handleSubmit}>Search</Button>
            </ButtonGroup>

            {linkDisplay}
            {loading}
          </div>
         </div>

      </React.Fragment>
    );
  }
}

export default App;
