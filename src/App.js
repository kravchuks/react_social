import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginForm from './components/Login/Login';
import Navbar from './components/NavBar/NavBar';
import { withRouter } from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { withSuspense } from './HOC/withSuspense';
import { initialiezeApp } from './redux/app-reducer';
import store from './redux/redux-store';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initialiezeApp();
    window.onunhandledrejection = (err) => {
      alert("something gone wrong")
    }
  }

  render() {
    if (!this.props.initialized) {
      return <div className='center'><Preloader /></div>
    }
    return (
      <div className='app-wrapper' id='wrapper'>
        <HeaderContainer />
        <div className='container'>
          <Navbar />
          <div className='app-wrapper-content'>
            <Routes>
              <Route path="" element={<Navigate to={"/profile"} />} />
              <Route path="/messages/*" element={withSuspense(DialogsContainer, {})} />
              <Route path="/profile" element={<ProfileContainer/>} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContiner = compose(connect(mapStateToProps, { initialiezeApp }),withRouter)(App);

const SamuraiJSApp = (props) => {
  return <React.StrictMode>
          <BrowserRouter>
            <Provider store={store}>
              <AppContiner />
            </Provider>
          </BrowserRouter>
        </React.StrictMode>
}

export default SamuraiJSApp;