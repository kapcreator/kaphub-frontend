import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'
import logo from "../../images/logo.png"
import menu from '../../images/menu.png'
import Search from "../Search/Search"
import DropMenuWrap from '../DropMenuWrap/DropMenuWrap'
import { toggleSidebar, setSidebar } from '../../actions/sidebar'
import "./Navbar.css"

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { useSidebar } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));

    if(location.pathname === '/' || location.pathname === '/posts' || location.pathname === '/posts/search') {
      dispatch(setSidebar(true))
    } else {
      dispatch(setSidebar(false))
    }
  }, [location])

  return (
    <nav className='nav'>
      {useSidebar && <button onClick={()=>dispatch(toggleSidebar())} className='btn-transparent nav__sidebar-toggle'><img src={menu} height='30' /></button>}
      <Link to="/" className="brand-container">
        <img src={logo} height="40" />
        <h2 className='brand-container__title'>Kap Hub</h2>
      </Link>
      <div className='nav-action'>
        <Search />

        {user ? (
          <div className="profile">
            <div className='avatar'>
              {user.result.image ? <img alt={user.result.name} src={user.result.image} /> : <h1>{user.result.name.charAt(0)}</h1>}
            </div>
            <h3 className='profile__name'>{user.result.name}</h3>
            {/* <button onClick={logout}>Logout</button> */}
            <DropMenuWrap actions={{ logout }} />
          </div>
        ) : (
          <a href='/auth' className='btn'>Sign In</a>
        )}
      </div>
    </nav>
  )
}

export default Navbar