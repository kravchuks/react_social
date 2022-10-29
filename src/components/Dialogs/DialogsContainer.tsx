import Dialogs from './Dialogs.tsx';
import { addMessage } from '../../redux/dialogs-reducer.ts';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { DialogType, MessageType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    dialogsData: Array<DialogType>,
    messageData: Array<MessageType>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messageData: state.dialogsPage.messageData,
    }
}

export default compose<React.Component<MapStatePropsType, AppStateType>>(connect(mapStateToProps,{addMessage}),withAuthRedirect)(Dialogs);