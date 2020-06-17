import Reducer from './reducer'
import AuthReducer from './auth_reducer'
import UserReducer from './user_reducer'
import PostsReducer from './post_reducers'
import { combineReducers } from 'redux'

 export const rootReducer = combineReducers({
    reducer: Reducer,
    auth_reducer: AuthReducer,
    user_reducer: UserReducer,
    post_reducer: PostsReducer,
})