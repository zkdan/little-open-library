import { useEffect, useState } from "react";
import { sanitizeNames, findProp } from "./utils";
import { useRouteLoaderData } from "react-router-dom";
import Image from "./Image";
import './BookDetails.css';
import Loader from "./Loader";
import bookImg from './assets/book_generated.png'

const BookDetails = () => {
  const data = useRouteLoaderData('details');
  const imgUrl = data ? data.imgUrl : bookImg;

  const [authors, setAuthors] = useState([])
  const [loading, setLoading]=useState(false);
  
  // if it's a URL reload, fetch the necesary data
  const path = window.location.pathname;
  useEffect(()=>{
    setLoading(true);
    const url = new URL(`https://openlibrary.org/${path}.json`);
    fetch(url).then(res=>res.json()).then(res =>{
      getAuthorData(res.authors);
      // setBook(res); 
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
  <div className="details-view">
      {loading ? <Loader /> : <article key={path}>
        <Image
          alt={`${data.title} by ${authors.map(name=> name)}`} 
          src={imgUrl} 
          />
        <h2>{data.title}</h2>
        <div className="line-height-container">{authors.map(name => <p key={name}>{name}</p>)}
        </div>
      </article> }
      <section>
          <p>{findProp(data, 'description')}</p>
          <ul className="subjects-list">{findProp(data, 'subjects').map((subject,i) => <li key={i}>{subject}</li>)}
          </ul>
      </section>
     
  </div>
)
}
export default BookDetails;