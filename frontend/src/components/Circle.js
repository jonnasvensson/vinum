import '../App.scss';
import { Redirect, Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';


export default function Circle({activateModalAdd}) {

  return (
    <>
      <div className="circle" onClick={activateModalAdd} >
        <AddIcon />
      </div>
    </>
  );
}

