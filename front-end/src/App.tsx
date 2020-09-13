import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderContainer from './components/containers/HeaderContainer';
import AboutPage from './pages/AboutPage';
import FindPWPage from './pages/auth/FindPWPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <HeaderContainer />
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/about" component={AboutPage}/>
        {/* Auth */}
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
        <Route exact path="/auth/findpw" component={FindPWPage} />
      </Switch>
    </>
);}

export default App;
