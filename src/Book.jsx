import { sanitizeNames } from './utils';
import { Link } from 'react-router-dom';
import './Book.css'
const Book = ({data:book, selectBook}) => {
  const names = sanitizeNames(book.authorNames);

return(
  <li>
     <Link to={`${book.workKey}`}>
      <div className="image-container">
       <img
         id={book.isbn}
         onClick={()=>selectBook(book.isbn)}
         alt={`${book.title} by ${book.name}`} 
         src={book.imgUrl} 
         />
      </div>
     </Link>
    <div className="book-info">
      <h3>{book.title}</h3>
      {names.map((el,i) => <p key={`${el}${i}`}>{el}</p>)}
      <h4>{book.pubYear}</h4>
       {book.hasFullText && <p><span className="icon">🔎 </span>Full text available</p>} 
      <ul>
      </ul>
    </div>
  </li>
)
}
export default Book;