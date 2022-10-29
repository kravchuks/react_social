import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer.tsx';
import LoginForm from './components/Login/Login';
import Navbar from './components/NavBar/NavBar';
import { withRouter } from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer.tsx';
import ProfileContainer from './components/Profile/ProfileContainer';
import { withSuspense } from './HOC/withSuspense';
import { initialiezeApp } from './redux/app-reducer.ts';
import store from './redux/redux-store.ts';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
import AppStateType from './redux/redux-store.ts'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initialiezeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContiner = compose<React.ComponentType>(connect(mapStateToProps, { initialiezeApp }),withRouter)(App);

const SamuraiJSApp: React.FC = () => {
  return <React.StrictMode>
          <BrowserRouter>
            <Provider store={store}>
              <AppContiner />
            </Provider>
          </BrowserRouter>
        </React.StrictMode>
}

export default SamuraiJSApp;