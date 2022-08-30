import Dialogs from './Dialogs';
import { addMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state)=>{
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messageData: state.dialogsPage.messageData,
    }
}

export default compose(connect(mapStateToProps,{addMessage}),withAuthRedirect)(Dialogs);