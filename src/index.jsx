//---------------------------------------------// INDEX \\---------------------------------------------------------------------\\
import React from 'react';
import ReactDOM from 'react-dom';
import { LoginView } from './componants/login-view/login-view';
import MainView from './componants/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom'
// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Router>
        <div className='MuVies'>MuVies-App</div>
        <MainView />
      </Router>
    )
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0]

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container)