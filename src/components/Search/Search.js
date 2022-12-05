import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import searchImg from '../../images/search.png'
import "./Search.css"

const Search = ({onSubmit}) => {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const searchPost = () => {
    if(search.trim()) {
      history.push(`/posts/search?searchQuery=${search || 'none'}`);
    } else {
      history.push('/');
    }

    setSearch('')
    if(onSubmit) onSubmit()
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      searchPost();
    }
  }

  return (
    <div className='search'>
      <input type="text" name="search" variant="outlined" placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
      <button onClick={searchPost} className="btn-transparent"><img src={searchImg} height="25" /></button>
    </div>
  )
}

export default Search