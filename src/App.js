import React, { Component } from 'react';
import config from './config'
import './App.css';

class App extends Component{
  state = {
    hello: 'test',
  }

  componentDidMount(){
    // this.asyncFetch()
  }

  asyncFetch = async () => {
   await fetch(config.API_ENDPOINT, {
    method: 'GET',
    headers: {'content-type': 'application/json'}
    })
    .then(res => {
    if(!res.ok){
      return res.json().then(error => Promise.reject(error))
    }
    return res.json()
    })
    .then(res => this.setState({hello: res}))
    }


  render(){
  return (
    <div>
    {this.state.hello ? <div className="App">{this.state.hello}</div> : null}
    </div>
  );
}
}

export default App;
