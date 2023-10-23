import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanitizeNames } from "./utils";
import bookImg from './assets/book_generated.png'

const BookDetails = ({selectedBook, selectBook}) => {
  const [book, setBook] = useState([]);
  const [authors, setAuthors] = useState([])
  const path = selectedBook.isbn || window.location.pathname.split('/book/')[1];
  
  useEffect(()=>{
    let altCoverUrl = bookImg;
    const url = new URL(`https://openlibrary.org/isbn/${path}.json`);
    fetch(url).then(res=>res.json()).then(res =>{
       altCoverUrl = book.covers && book.cover.length > 0 && `https://covers.openlibrary.org/b/id/${book.covers}-M.jpg`;
      getAuthorData(res.authors);
      setBook(res);
    });
  },[path])

  const getAuthorData = async (authors)=>{
    const names = authors.map(author =>{
      const url = new URL(`https://openlibrary.org${author.key}.json`);
      return fetch(url).then(res =>res.json()).then(res=> res.name);
    });
    Promise.all(names).then(res => setAuthors(sanitizeNames(res)));
  }
  const getDetails =()=>{

  }
  const searchInside =()=>{
    // const url = new URL('https://ia800204.us.archive.org/fulltext/inside.php')
    // url.search = new URLSearchParams({
    //   q:'text to find',
    //   item_id: res.ia[0],
    //   doc: ,
    //   path: 
    // })
  }
return(
  <div>
    <Link to="/">Back</Link>
      <article key={book}>
        <img
          alt={`${book.title} by ${book.name}`} 
          src={selectedBook.imgUrl || altCoverUrl} />
        <p>{selectedBook.title || book.title}</p>
        {authors.map(name => <p key={name}>{name}</p>)}
      </article>
  </div>
)
}
export default BookDetails;