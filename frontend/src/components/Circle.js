import '../App.scss';
import { Redirect, Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';


export default function Circle() {


  return (
    <>
      <Link to="/add">
        <div className="circle" >
        <AddIcon />
        </div>
      </Link>
    </>
  );
}

