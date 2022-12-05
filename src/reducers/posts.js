import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, FETCH_POSTS_BY_CREATOR, START_LOADING, END_LOADING, COMMENT, FETCH_CREATOR, FETCH_FAV_POSTS } from '../constants/actionTypes'

const initialState = {
  isLoading: true,
  posts: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if(post._id === action.payload._id) {
            return action.payload;
          }

          return post;
        })
      }
    case FETCH_CREATOR:
      return { ...state, creator: action.payload }
    case FETCH_POSTS_BY_CREATOR:
      return { ...state, posts: action.payload }
    case FETCH_FAV_POSTS:
      return { ...state, posts: action.payload }
    default:
      return state;
  }
}