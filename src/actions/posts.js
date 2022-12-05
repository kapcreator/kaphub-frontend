import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, FETCH_POSTS_BY_CREATOR, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, COMMENT, UPDATE_USER, FETCH_CREATOR, FETCH_FAV_POSTS } from '../constants/actionTypes'
import * as api from '../api'
import axios from 'axios';

const logError = (error) => {
  if (axios.isCancel(error)) {
    console.log("Request was canceled");
  } else {
    console.log(error);
  }
}

//Action Creators
export const getPost = (id) => async (dispatch) => {

  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data})

    dispatch({ type: END_LOADING });
  } catch (error) {
    logError(error)
  }
}

export const getPosts = (page) => async (dispatch) => {
  api.cancel()
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data})

    dispatch({ type: END_LOADING });
  } catch (error) {
    logError(error)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  api.cancel()
  try {
    dispatch({ type: START_LOADING });

    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data })

    dispatch({ type: END_LOADING });
  } catch (error) {
    logError(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post)
    
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    logError(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    logError(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    logError(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    logError(error)
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    logError(error)
  }
}

export const favPost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await api.favPost({ postId, userId });

    dispatch({ type: UPDATE_USER, data });
  } catch (error) {
    logError(error)
  }
}

export const getCreator = (id) => async (dispatch) => {

  try {
    const { data } = await api.fetchCreator(id);

    dispatch({ type: FETCH_CREATOR, payload: data})
  } catch (error) {
    logError(error)
  }
}

export const getPostsByCreator = (id) => async (dispatch) => {
  api.cancel()
  try {
    dispatch({ type: START_LOADING });
    
    const { data: { data } } = await api.fetchPostsByCreator(id);

    dispatch({ type: FETCH_POSTS_BY_CREATOR, payload: data })

    dispatch({ type: END_LOADING });
  } catch (error) {
    logError(error)
  }
}

export const getFavPosts = (creatorId) => async (dispatch) => {
  api.cancel()
  try {
    dispatch({ type: START_LOADING });
    
    const { data: { data } } = await api.fetchFavPosts(creatorId);

    dispatch({ type: FETCH_FAV_POSTS, payload: data })

    dispatch({ type: END_LOADING });
  } catch (error) {
    logError(error)
  }
}