import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const BookImage = ({url, isbn}) => {
  const [size, setSize]  = useState({height:0,width:0})
  useEffect(()=>{
    async function fetchImage(url) {
        const img = new Image();
        return new Promise((res, rej) => {
            img.onload = () => res(img);
            img.onerror = e => rej(e);
            img.src = url;
        });
    }
    fetchImage(url).then(res=> {
      setSize({height: res.height, width: res.width})
    });
  },[url])

return(
  <Link to={`/book/${isbn}`}>
    <div className="container" 
      style={{height:size.height, width:size.width}}>
      <img src={url}/>
    </div>
  </Link>
)
}
export default BookImage;