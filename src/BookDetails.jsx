import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanitizeNames } from "./utils";
import bookImg from './assets/book_generated.png'
import Image from "./Image";
const BookDetails = ({selectedBook, selectBook}) => {
  const [book, setBook] = useState([]);
  const [authors, setAuthors] = useState([])
  const [query, setQuery] = useState('');
  const [bookData, setBookData] = useState({});
  const [insideData, setInsideData]  =useState({});
  const [loading, setLoading]=useState(false);
  const [coverUrl, setCoverUrl] = useState(selectedBook.imgUrl)
  const [message, setMessage ] = useState('');
  const path = selectedBook.workKey || window.location.pathname;
  useEffect(()=>{
    setLoading(true);
    const url = new URL(`https://openlibrary.org/${path}.json`);
    fetch(url).then(res=>res.json()).then(res =>{
      getAuthorData(res.authors);
      setBook(res);
      setCoverUrl(`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`)
      
      setLoading(false)
      // console.log(`https://archive.org/metadata/${}`)
      fetch(`https:/archive.org/metadata/${selectedBook.archiveId && selectedBook.archiveId[0]}`).then(res=>res.json()).then(res => {
        // if(res.)
        setBookData(res)
      })
    })
    
  },[path])

  const getAuthorData = async (authors)=>{
   
    const names = authors.map(author =>{
      const url = new URL(`https://openlibrary.org${author.author.key}.json`);
      return fetch(url).then(res =>res.json()).then(res=> res.name);
    });
    Promise.all(names).then(res => setAuthors(sanitizeNames(res)));
  }
  const searchInside = async ()=>{
    setLoading(true);
    const url = new URL(`https://${bookData.d1}/fulltext/inside.php?item_id=${selectedBook.archiveId[0]}&doc=${selectedBook.archiveId[0]}&path=${bookData.dir}&q=${query}`)
    fetch(url)
    .then(res=> {
      const getText = async ()=>{
        return await res.text()
      }
      if(res.ok){
        // console.log(getText())
        setInsideData(getText())
        // return res
      } if(res.status === 403){
        setMessage(`Open Library is restricting access to this resource.`)
      } else {
        console.log(res)
        throw new Error(res.message)
      }
    })
    .then(res=>{
      setInsideData(res)
      setLoading(false);
    })
    .catch(err =>{
      console.log(err)
    })
  }
  const handleInputChange = (e)=>{
    setQuery(e.target.value);
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    searchInside();
  }
return(
  <div>
    <Link to="/">Back</Link>
    <form onSubmit={handleSubmit}>
      <input type="text" 
        value={query}
        onChange={handleInputChange}/>
      <button onClick={searchInside}>hit it</button>
    </form>
      <article key={book}>
        <Image
          alt={`${book.title} by ${book.name}`} 
          src={coverUrl} 
          url={`https://covers.openlibrary.org/b/id/${book.covers}-L.jpg`}
          />
        <h2>{selectedBook.title || book.title}</h2>
        {authors.map(name => <p key={name}>{name}</p>)}
      </article>
      <section>
        <h3>{message}</h3>
      </section>
  </div>
)
}
export default BookDetails;