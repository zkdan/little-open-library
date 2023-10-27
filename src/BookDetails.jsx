import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanitizeNames, findProp } from "./utils";
import bookImg from './assets/book_generated.png'
import Image from "./Image";
import './BookDetails.css';

const BookDetails = ({selectedBook, selectBook}) => {
  
  const [book, setBook] = useState([]);
  const [authors, setAuthors] = useState([])
  const [bookData, setBookData] = useState({});
  const [loading, setLoading]=useState(false);
  const [coverUrl, setCoverUrl] = useState(selectedBook.imgUrl)

  const path = selectedBook.workKey || window.location.pathname;
  useEffect(()=>{
    setLoading(true);
    const url = new URL(`https://openlibrary.org/${path}.json`);
    fetch(url).then(res=>res.json()).then(res =>{
      getAuthorData(res.authors);
      setBook(res);      
      setLoading(false);
    })
    
    
  },[path])

  const getAuthorData = async (authors)=>{
   
    const names = authors.map(author =>{
      const url = new URL(`https://openlibrary.org${author.author.key}.json`);
      return fetch(url).then(res =>res.json()).then(res=> res.name);
    });
    Promise.all(names).then(res => setAuthors(sanitizeNames(res)));
  }


return(
  <div>
    <Link to="/">Back</Link>
      <article key={book}>
        <Image
          alt={`${book.title} by ${book.name}`} 
          src={coverUrl} 
          url={''}
          />
        <h2>{selectedBook.title || book.title}</h2>
        <div className="line-height-container">{authors.map(name => <p key={name}>{name}</p>)}
        </div>
      </article>
      <section>
        <p>{findProp(book, 'description')}</p>
          <ul className="subjects-list">{findProp(book, 'subjects').map((subject,i) => <li key={i}>{subject}</li>)}
          </ul>
      </section>
     
  </div>
)
}
export default BookDetails;