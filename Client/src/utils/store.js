import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice';
import otherUserReducer from './otherUser';

const appstore = configureStore({
    reducer:{
        user: userReducer,
        otherUser : otherUserReducer,
    }
});

export default appstore;