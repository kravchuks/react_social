import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup'

const MyPosts = (props) => {
    let postsElements = props.posts.map(el => (<Post key={el.message} message={el.message} like_count={el.like_count} image={el.image} />))

    let onAddPost = (text) => {
        props.addPost(text);
    }

    return <div className={s.potsBlock}>
        <h4>My posts</h4>
        <div key='key'>
            <MyPostForm onAddPost={onAddPost} />
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div >

}

const MyPostForm = (props) => {
    const validationSchema = () => yup.object().shape({
        textarea: yup.string().typeError('should be a string')
            .max(20, 'max 20 characters').min(2, 'min 2 characters').required('required'),
        
    })
    return (
    <Formik
        initialValues={{textarea: ''}}
        validateOnBlur
        onSubmit={(values) =>{if (values.textarea != '') {props.onAddPost(values.textarea)}}} 
        validationSchema={validationSchema}
        >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
            return <div>
                        <div>
                            <textarea 
                                type="text"
                                name={'textarea'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.textarea}
                                placeholder='Write something'
                                className={errors.textarea? s.errorArea: s.textarea}/>
                        </div>
                        {touched.textarea && errors.textarea && <p className={s.errorSpan}>{errors.textarea}</p>}
                        <button
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type="submit"
                                className={s.submit}>Send
                        </button>
                    </div>
        }}
    </Formik>)
}

export default MyPosts;