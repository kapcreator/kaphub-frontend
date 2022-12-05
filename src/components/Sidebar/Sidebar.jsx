import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideSidebar } from '../../actions/sidebar'
import { Link, useLocation } from 'react-router-dom'
import * as api from '../../api'
import Search from '../Search/Search'
import useWindowDimensions from '../../hooks/useWindowDimensions'

import './Sidebar.css'

const Sidebar = () => {
  const { isShow } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch()
  const location = useLocation()
  const [scores, setScores] = useState([])
  const windowDimensions = useWindowDimensions();
  const [hideAllowed, setHideAllowed] = useState(true)
  
  useEffect(() => {
    api.getScoreByTag().then((result) => setScores(result.data.data))
  }, [])

  useEffect(() => {
    if (windowDimensions.width > 992) {
      setHideAllowed(false)
    } else {
      setHideAllowed(true)
    }
  }, [windowDimensions])

  useEffect(() => {
    dispatch(hideSidebar())
  }, [location])
  
  return (
    <div className='sidebar' style={{visibility: (isShow || !hideAllowed) ? 'visible' : 'hidden'}}>
      <Search />
      <div className='sidebar-group'>
        <h3>POPULAR TAGS</h3>
        <div className='sidebar-group__filter'>
          {scores.length < 1 ? <p>Loading...</p> : scores.map((score, i) => <Link to={`/posts/search?searchQuery=${score.name}`} key={i}>{score.name}</Link>)}
        </div>
      </div>

      <div className='sidebar-group'>
        <h3>BROWSE</h3>
        <div className='sidebar-group__filter'>
          <Link to={"/posts/search?searchQuery=game"}>Game</Link>
          <Link to={"/posts/search?searchQuery=book"}>Book</Link>
          <Link to={"/posts/search?searchQuery=gameasset"}>Game asset</Link>
          <Link to={"/posts/search?searchQuery=manga"}>Manga</Link>
        </div>
      </div>

      <p className='sidebar__copy'>&copy; {new Date().getFullYear()} kapcreator17</p>
    </div>
  )
}

export default Sidebar