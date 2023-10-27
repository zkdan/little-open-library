import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanitizeNames, findProp } from "./utils";
import bookImg from './assets/book_generated.png'
import Image from "./Image";

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
    console.log(url)
    fetch(url).then(res=>res.json()).then(res =>{
      getAuthorData(res.authors);
      console.log(findProp(res, 'description'));
      console.log(findProp(res, 'subjects'))
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
        {authors.map(name => <p key={name}>{name}</p>)}
      </article>
      <section>
        {/* <p>{book.description.value && book.description.value}</p> */}
      </section>
     
  </div>
)
}
export default BookDetails;