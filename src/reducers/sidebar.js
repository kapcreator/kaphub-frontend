import { SHOW_SIDEBAR, HIDE_SIDEBAR, TOGGLE_SIDEBAR, SET_SIDEBAR } from "../constants/actionTypes"

export default (state = { isShow: false, useSidebar: false }, action) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return { ...state, isShow: true }
    case HIDE_SIDEBAR:
      return { ...state, isShow: false }
    case TOGGLE_SIDEBAR:
      return { ...state, isShow: !state.isShow }
    case SET_SIDEBAR:
      return { ...state, useSidebar: action.payload }
    default:
      return state
  }
}