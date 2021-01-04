import '../App.scss';
import { Redirect, Link } from 'react-router-dom'

export default function Circle() {


  return (
    <>
      <Link to="/add">
        <div className="circle" >
          <div className="plusVerticle"></div>
          <div className="plusHorizontal"></div>
        </div>
      </Link>
    </>
  );
}

