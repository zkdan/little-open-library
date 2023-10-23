import './App.css'
import BookSearch from './BookSearch';
import BookDetails from './BookDetails';
import BookList from './BookList';
import Loader from './Loader'
import Pagination from './Pagination';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import bookImg from './assets/book_generated.png'
function App() {
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(null);
  const [englishOnly, setEnglishOnly] = useState(false);
  const [showingBooks, setShowingBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState([]);
  const [lastSearch, setLastSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const search = useCallback((index, query)=>{
      setLoading(true);
      setSearchTerm(query);
      const url = new URL(`https://openlibrary.org/search.json`);
  
      const params = {
        q:query,
        page:index
      }
      if(englishOnly){
        params.language = 'eng'
      }
     
      url.search = new URLSearchParams(params);
      fetch(url).then(res=>res.json()).then(res =>{
        const totalPages = Math.ceil(res.numFound / 100);
        setPageMax(totalPages);
        
        const b =  res.docs.filter(book => book.author_key && book.isbn && book.cover_i )
        .map(book => {
          const imgUrl = book.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg` : bookImg ;
          console.log(book.title, book.cover_edition_key, book.cover_i)
              return {
                title:book.title,
                authorKey:book.author_key,
                workKey:book.key,
                authorNames:book.author_name,
                isbn:book.isbn[0],
                // imgUrl:`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`
                imgUrl: imgUrl
                
              }
            })
          .reduce((acc, curr) => {
            if(acc[curr.authorKey[0]]){
              return acc
            } else {
              acc[curr.authorKey[0]] = curr
            }
              return acc
          },{})
          console.log(b)
          setShowingBooks(Object.values(b));
          setLastSearch(query);
          setLoading(false);
       
      })
  },[englishOnly]);

  useEffect(()=>{
    search(page, searchTerm);
  },[page, searchTerm, englishOnly, search]);


  const handleSubmit =(e, query)=>{
    e.preventDefault();
    search(page, query);
  }

  const toggleEnglishOnly =()=>{
    setEnglishOnly(!englishOnly);
    setPage(1)
  }

  const handleNext =() =>{
    const newPage = page + 1;
    setPage(newPage);
  }

  const handlePrev =()=>{
    const newPage = page - 1;
    setPage(newPage);
  }

  const selectBook=(isbn)=>{
    const selectedBook = showingBooks.filter(book => book.isbn === isbn);
    setSelectedBook(selectedBook[0]);
  }

  const reset = () =>{
    setPage(1);
    setShowingBooks([]);
    setEnglishOnly(false);
    setPageMax(null);
    setSearchTerm('');
  }

  return (
    <>
      <Routes>
        <Route path="/book/:isbn" element={<BookDetails 
        selectBook={selectBook}
        selectedBook={selectedBook}/>}/>
        <Route path="/" element={
          <>
            <BookSearch
              loading={loading}
              handleSubmit={handleSubmit} 
              search={search} 
              reset={reset}
              lastSearch={lastSearch}
              toggleEnglishOnly={toggleEnglishOnly}
            />
            <main>
              <h2>{searchTerm && `Search term: ${searchTerm}`}</h2>
              {searchTerm && <Pagination 
                page={page} 
                pageMax={pageMax}
                handleNext={handleNext} 
                handlePrev={handlePrev} 
               />
              }
              {loading ? <Loader /> : 
              <>
              <BookList books={showingBooks} 
                        selectBook={selectBook} 
                        />
              </>
              }
            </main>
          </>}/>
          <Route path="*" element={<h2>404, baby</h2>}/>
      </Routes>
    </>
  )
}

export default App
