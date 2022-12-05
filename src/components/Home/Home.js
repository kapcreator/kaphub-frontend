import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Posts from '../Posts/Posts'
import Sidebar from '../Sidebar/Sidebar'
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts'

import './Home.css'

require('dotenv').config()

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const location = useLocation()
  const dispatch = useDispatch();
  const adminId = process.env.REACT_APP_ADMIN_ID
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [title, setTitle] = useState("New From Kap") 

  useEffect(() => {
    // if(page) dispatch(getPosts(page));
    if(page && !searchQuery) {
      dispatch(getPostsByCreator(adminId));
    }
  }, [page])

  useEffect(() => {
    if(searchQuery) {
      setTitle(`Search result for "${searchQuery}"`)
      dispatch(getPostsBySearch({ search: searchQuery, tags: searchQuery }))
    } else if(page > 1) {
      setTitle(`Page ${page}`)
    }
  }, [location])

  return (
    <div className='home'>
      <Sidebar />
      <Posts title={title} />
    </div>
  )
}

export default Home