import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import *as yup from 'yup'

const Dialogs = (props) => {

    let addMessageText = (text) => {
        props.addMessage(text);
    }

    let dialogsElements = props.dialogsData.map(el => (<DialogItem name={el.name} key={el.id} id={el.id} image={el.image} />))

    let messageElements = props.messageData.map(el => (<Message text={el.text} key={el.id} id={el.id} />))
    if (!props.isAuth) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <div className={s.warn}>(in process!)</div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messageElements}
                    <AddMessageForm addMessageText={addMessageText} />
                </div>
            </div>
        </div>
        
    )
}

const AddMessageForm = (props) => {

    const validationSchema = () => yup.object().shape({
        textarea: yup.string().typeError('should be a string')
            .max(20, 'max 20 characters').min(2, 'min 2 characters').required('required'),

    })
    return (
        <Formik
            initialValues={{textarea: ''}}
            validateOnBlur
            onSubmit={(values) => {
                if (values.textarea != '') {
                    props.addMessageText(values.textarea)
                }
            }}
            validationSchema={validationSchema}
        >
         {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                return <div>
                    <div>
                        <textarea type="text"
                            name={'textarea'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.textarea}
                            placeholder='Write your messaage'
                            className={errors.textarea ? s.errorArea : s.textarea}
                        />
                    </div>
                    {touched.textarea && errors.textarea && <p className={s.errorSpan}>{errors.textarea}</p>}
                    <button
                        disabled={!isValid && !dirty}
                        onClick={handleSubmit}
                        type="submit"
                        className={s.button}>Send
                    </button>
                </div>
            }}
        </Formik>)
}

export default Dialogs;