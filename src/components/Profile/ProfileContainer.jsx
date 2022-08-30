import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import Profile from './Profile';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        const history = useNavigate()
        return <Children {...props} match={match} history={history} />
    }
}

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (userId == null) {
              return this.props.history('/login')
            }
         }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return <Profile {...this.props}
            isOwner={!this.props.match.params.userId}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto = {this.props.savePhoto} 
            saveProfile={this.props.saveProfile}
            isAuth={this.props.isAuth}/>
    }
}

let mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer)
