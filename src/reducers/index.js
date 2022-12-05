import { combineReducers } from "redux";

import posts from './posts'
import auth from './auth'
import modal from './modal'
import sidebar from "./sidebar";

export default combineReducers({ posts, auth, modal, sidebar })