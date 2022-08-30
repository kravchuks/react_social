import { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
    }, [props.status] );

    let activateEditMode = () => {
        setEditMode(true)
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value );
    }

    return (
        <div style={{display:'inline-block'}}>
            {!editMode && 
                <div>
                    <span onDoubleClick={activateEditMode}>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} value={status} onBlur={deactivateEditMode}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;