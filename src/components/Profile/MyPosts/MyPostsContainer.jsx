import React from 'react';
import { actions } from '../../../redux/profile-reducer.ts';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

const mapStateToProps =(state)=>{
    return{
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

const MyPostsContainer= connect(mapStateToProps,{actions})(MyPosts);

export default MyPostsContainer;