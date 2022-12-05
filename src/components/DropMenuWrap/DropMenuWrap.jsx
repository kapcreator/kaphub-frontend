import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import arrowDown from '../../images/arrowDown.png'

import './DropMenuWrap.css'

const DropMenuWrap = ({actions}) => {
  const location = useLocation()
  const [active, setActive] = useState(false)

  const openDropMenu = () => {
    setActive(!active)
  }

  useEffect(() => {
    setActive(false)
  }, [location])

  return (
    <>
      <button className='btn-transparent' onClick={openDropMenu}><img src={arrowDown} height="20" /></button>
    
      <div className='drop-menu' style={{visibility: active ? "visible" : "hidden"}}>
        <Link to="/posts/upload">Upload</Link>
        <Link to="/posts/favorites">Favorites</Link>
        <Link to={`/posts/dashboard`}>Dashboard</Link>
        {/* <Link to="/">Settings</Link> */}
        {/* <Link to="/">View profile</Link> */}
        {actions.logout && <button onClick={actions.logout} className="btn-link">Log out</button>}
      </div>
    </>
  )
}

export default DropMenuWrap