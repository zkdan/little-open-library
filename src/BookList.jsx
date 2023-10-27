import './BookList.css'
import Book from './Book'
const BookList = ({books, selectBook}) => {

return(
  <>
    <ul>
    {books.map(book => {
      let archiveId = null;
      if(book.archiveId.length){
        archiveId = book.archiveId[0]
      }
        return (
          <Book 
            archiveId={archiveId}
            key={book.workKey} 
            data={book} 
            selectBook={selectBook}/>
      )
    })}
    </ul>
  </>
)
}
export default BookList;