import React from 'react';
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import About from './components/about';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/footer';
import Contribute from './components/contribute';
import UserProfile from './components/userProfile';
import DefaultError from './components/defaultERROR';
import Explore from './components/explore';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contribute' component={Contribute} />
        <Route path='/profile' component={UserProfile} />
        <Route path='/explore' component={Explore} />
        <Route component={DefaultError} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
