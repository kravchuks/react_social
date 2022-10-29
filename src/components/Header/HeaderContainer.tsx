import React from 'react';
import Header from './Header.tsx'
import { connect } from 'react-redux';
import {logout} from '../../redux/auth-reducer.ts'
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType
 
class HeaderContainer extends React.Component<PropsType>{

    render () {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout} />
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<React.Component<MapStatePropsType, MapDispatchPropsType, AppStateType>>(mapStateToProps, {logout})(HeaderContainer);