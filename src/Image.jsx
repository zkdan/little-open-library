import './Image.css'
const Image = ({src, alt}) => {
return(
  <div className="img-container">
    <img 
      src={src} 
      alt={alt}/>
  </div>
  )
}
export default Image;