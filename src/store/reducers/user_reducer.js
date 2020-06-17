import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
    user_text: "",
}


const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_TYPES.ADD_PROFILE:
            return {
                ...state,
                user_text: action.payload,
            }
            default:
                return state
    }
}