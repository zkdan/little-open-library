import './BookList.css'
import Book from './Book'
const BookList = ({books, selectBook}) => {

return(
  <>
    <ul>
    {books.map(book => {
        return (
          <Book 
            key={book.isbn} 
            data={book} 
            selectBook={selectBook}/>
      )
    })}
    </ul>
  </>
)
}
export default BookList;