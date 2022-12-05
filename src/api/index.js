import axios from 'axios'
require('dotenv').config()

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })
//const API = axios.create({ baseURL: 'https://mernmemoriespixgc2.herokuapp.com/' })

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req;
});

const CancelToken = axios.CancelToken
export let cancel = () => {}

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`, { cancelToken: new CancelToken((c) => { cancel = c }) });
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&&tags=${searchQuery.tags}`, { cancelToken: new CancelToken((c) => { cancel = c }) });
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const favPost = (data) => API.post(`/posts/${data.postId}/favPost`, { data });

export const fetchCreator = (id) => API.get(`/creator/${id}`);
export const fetchPostsByCreator = (id) => API.get(`/creator/${id}/posts`, { cancelToken: new CancelToken((c) => { cancel = c }) });
export const fetchFavPosts = (id) => API.get(`/creator/${id}/favorites`, { cancelToken: new CancelToken((c) => { cancel = c }) })

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const increaseScore = (name, type) => API.patch(`/score`, { name, type });
export const getScoreByTag = () => API.get(`/score/tag`);