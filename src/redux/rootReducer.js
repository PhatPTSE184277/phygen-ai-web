import { combineReducers} from '@reduxjs/toolkit'
import userReducer from "../../src/redux/features/userSlice"
export const rootReducer = combineReducers({
    user: userReducer,
});