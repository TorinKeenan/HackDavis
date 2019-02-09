import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Button from 'react-bootstrap/Button';

class LinkDisplay extends Component {

  constructor(props){
    super(props);
    this.state={

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
    return (
      <React.Fragment>
        <Button className="wbutton">Easier</Button>
        <Button className="wbutton">This is perfect. Give me more of this.</Button>
        <Button className="wbutton">Harder</Button>

      </React.Fragment>
    );
  }
}

export default LinkDisplay;
