import { SHOW_SIDEBAR, HIDE_SIDEBAR, TOGGLE_SIDEBAR, SET_SIDEBAR } from "../constants/actionTypes";

export const showSidebar = () => (dispatch) => {
  dispatch({ type: SHOW_SIDEBAR })
}

export const hideSidebar = () => (dispatch) => {
  dispatch({ type: HIDE_SIDEBAR })
}

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR })
}

export const setSidebar = (value) => (dispatch) => {
  dispatch({ type: SET_SIDEBAR, payload: value })
}