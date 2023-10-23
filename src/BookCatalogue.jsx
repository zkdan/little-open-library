import BookList from './BookList';
import BookSearch from './BookSearch';
import { useState } from 'react';

const BookCatalogue = () => {
  const [books, setBooks] = useState([]);
  const [authorsOnly, setAuthorsOnly] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);
  const [englishOnly, setEnglishOnly] = useState(false);
  const [showingBooks, setShowingBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const search = (index)=>{
    const url = new URL(`https://openlibrary.org/search.json`);
    url.search = new URLSearchParams({
      q:searchInput,
      page:index
    });
    fetch(url).then(res=>res.json()).then(res =>{
      setPageMax(Math.ceil(res.numFound / 100));
      const b =  res.docs.filter(book => book.author_key && book.cover_i && book.isbn && book.language )
      .map(book => {
            return {
              title:book.title,
              authorKey:book.author_key[0],
              // iaId: book.ia[0] || 'unde',
              cover:book.cover_i,
              name:book.author_name[0],
              isbn:book.isbn[0],
              imgUrl:`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`,
              languages:book.language
            }
          })
        .reduce((acc, curr) => {
          if(acc[curr.authorKey]){
            return acc
          } else {
            acc[curr.authorKey] = curr
          }
            return acc
        },{})
        setShowingBooks(Object.values(b));
    })
  }
  const handleSearchChange =(e)=>{
    setSearchInput(e.target.value)
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    search(page);
  }
  const toggleEnglishOnly =()=>{
    setEnglishOnly(!englishOnly);
  }
  const handleNext =() =>{
    const newPage = page +1;
    setPage(newPage);
    search(page);
  }
  const handlePrev =()=>{
    const newPage = page -1;

    setPage(newPage);
    search(page);
  }
  const toggleAuthors =()=>{
    setAuthorsOnly(!authorsOnly);
  }
return(
  <>
    <BookList />
    <BookSearch />
  </>
)
}
export default BookCatalogue;