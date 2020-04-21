import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import ItemAnalysis from './Components/ItemAnalysis';

var autoBind = require('auto-bind')
var session = new Date()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      empno: null
    }
    autoBind(this)
  }


  componentDidMount(){
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact={true} path="/" component={ItemAnalysis}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
