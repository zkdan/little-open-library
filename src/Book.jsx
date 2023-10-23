import { sanitizeNames } from './utils';
import { Link } from 'react-router-dom';
import './Book.css'
const Book = ({data:book, selectBook}) => {
  const names = sanitizeNames(book.authorNames);
return(
  <li>
     <Link to={`/book/${book.isbn}`}>
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
    </div>
  </li>
)
}
export default Book;