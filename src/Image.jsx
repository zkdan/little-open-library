import bookImg from './assets/book_generated.png'
import { useRef } from 'react'
const Image = ({src, alt, url}) => {
  const imgRef = useRef(null)
  // if(imgRef){
  //   console.log(imgRef.current)
  // } 
return(
  <>
    <img 
      ref={imgRef}
      src={src || url || bookImg} 
      alt={alt}/>
    </>
  )
}
export default Image;