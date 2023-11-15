import {useState} from 'react';
// eslint-disable-next-line react/prop-types
const BookSearch = ({handleSubmit,search,reset, loading, page, englishOnly, toggleEnglishOnly,}) => {
  
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange =(e)=>{
    setSearchInput(e.target.value)
  }

  const clearAndReset =()=>{
    setSearchInput('');
    reset();
  }
  return (
    <aside>
      <div className="search-container">
        <span>little open</span>
        <h1>Library</h1>
        <form onSubmit={(e) => handleSubmit(e, searchInput)}>
            <input type="text" id="search" value={searchInput} onChange={handleSearchChange}/>
            <div className="input-unit">
              <input type="button" 
                    value="Search" 
                    onClick={()=> search(page, searchInput)}
                    disabled={loading || !searchInput}
                    />
            </div>
            <div className="input-unit">
                <label htmlFor="english" className={loading || !searchInput ? 'disabled':''}>Show English results only</label>
                <input type="checkbox" 
                id="english" 
                checked={englishOnly}
                value={englishOnly}
                disabled={loading || !searchInput}
                onChange={toggleEnglishOnly}
                />
              </div>
            <div className="input-unit">
              <label htmlFor="reset"></label>
              <input type="button" 
              value="Reset" 
              onClick={clearAndReset}
              disabled ={!searchInput}
              />
            </div>
        </form> 
      </div>
    </aside>
  )
}
export default BookSearch;
