import { useState } from 'react';
import userLogo from '../../../assets/images/userLogo.png';
import Preloader from '../../common/preloader/Preloader';
import { ProfileDataForm } from './ProfileDataForm';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);
    
    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    
    const ProfileData = (props) => {
        return <div>
            {props.isOwner && props.isAuth && <div><button className={s.submit} onClick={props.goToEditMode}>Edit</button></div>}
        <div>
            <h3>{props.profile.fullName}</h3>
        </div>
        
            <b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
        
        {props.profile.lookingForAJob &&
            <div>
                <b>My professionals skills</b>: {props.profile.lookingForAJobDescription}
            </div>}
        
            <div><b>About me</b>: {props.profile.aboutMe}</div>
        
    </div>
    }

    const onSubmit= async (formData)=>{
        await props.saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.img__wrapper}>
                    <div>{props.isOwner && 
                                            <div className={s.fileload}>
                                                <div className={s.file_load_block}>
                                                    <input type="file" value="" id="file" onChange={onMainPhotoSelected} />
                                                    <div className={s.fileLoad}>
                                                        <input type="text" defaultValue="Select file"/>
                                                        <button>Select file</button>
                                                    </div>
                                                </div>
                                            </div>}
                    </div>
                    <img className={s.ava} src={props.profile.photos.small || userLogo} />
                    <div className={s.status}>Status : <ProfileStatus status={props.status}
                        updateStatus={props.updateStatus} />
                    </div>
                </div>
                
                <div className={s.info__wrapper}>
                    {editMode ? <ProfileDataForm profile={props.profile}  onSubmit={onSubmit}/> 
                              : <ProfileData profile={props.profile} isOwner={props.isOwner} isAuth={props.isAuth} goToEditMode={()=>(setEditMode(true))}/>}
                </div>
                
            </div>
        </div>
    )
}

export default ProfileInfo;