import userLogo from './../assets/images/userLogo.png'

const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    
    dialogsData: [
        { id: 1, name: "John", image: userLogo},
        { id: 2, name: "Mia", image: userLogo},
        { id: 3, name: "Fred", image: userLogo},
        { id: 4, name: "Jennifer", image: userLogo},
        { id: 5, name: "Loy", image: userLogo},
    ],
    messageData: [
        { id: 1, text: 'Hi!' },
        { id: 2, text: "Hi, how are you?" },
    ],

}

const dialogsReducer =(state = initialState, action)=>{
    switch(action.type){
        case ADD_MESSAGE: {
            return {
                ...state,
                messageData: [...state.messageData, {id: 3, text: action.newText}]
            };
        }
        default:
            return state
    }
}

export const addMessage = (newText) => ({type: ADD_MESSAGE, newText});

export default dialogsReducer;