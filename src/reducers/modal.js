import { SHOW_MODAL, HIDE_MODAL } from "../constants/actionTypes"

export default (state = { isShow: false, textContent: "", onConfirm: ()=>{} }, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { isShow: true, textContent: action.payload.textContent, onConfirm: action.payload.onConfirm }
    case HIDE_MODAL:
      return { ...state, isShow: false }
    default:
      return state
  }
}