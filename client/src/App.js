import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import ItemAnalysis from './Components/ItemAnalysis';
import LoginPage from './Components/LoginPage';
import CombineItemAnalysis from './Components/CombineItemAnalysis';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
  }

  render() {
    return (
        <Router>
          <div>
          <Route exact={true} path="/" component={LoginPage}/>
          <Route exact={true} path="/ItemAnalysis" component={ItemAnalysis}/>
          <Route exact={true} path="/CombineItemAnalysis" component={CombineItemAnalysis}/>
          </div>
        </Router>
    );
  }
}

export default App;
