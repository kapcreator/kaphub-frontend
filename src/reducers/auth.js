import { AUTH, LOGOUT, UPDATE_USER } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };   
    case UPDATE_USER:
      const user = JSON.parse(localStorage.getItem('profile'))
      localStorage.setItem('profile', JSON.stringify({ ...user, result: action?.data }));
      
      return { ...state, authData: { ...user, result: action?.data } };
    default:
      return state;
  }
}

export default authReducer