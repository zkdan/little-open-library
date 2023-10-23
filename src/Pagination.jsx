const Pagination = ({page, pageMax, handlePrev, handleNext}) => {
return(
  <>
    <div className="input-unit">
      <input 
        type="button" 
        value="Previous page" 
        disabled={(page === 1 && pageMax >= 0) ? true : false } 
        onClick={handlePrev}/>
      <input 
        type="button" 
        value="Next page" 
        disabled={page === pageMax || pageMax === null ? true : false } 
        onClick={handleNext}/>
    </div>
    <p>{pageMax > 0 && `Page ${page} of ${pageMax}`}</p>
    </>
)
}
export default Pagination;