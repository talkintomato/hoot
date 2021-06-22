
import data from '../../data';
import NavBar from '../Navbar';
import ComposeCard from './ComposeCard';
import DraftCard from './DraftCard';



function Write() {
  return (
    <>
     <h1> Write </h1>
     <DraftCard data={data}> </DraftCard>
     <ComposeCard></ComposeCard> 
     </>
  );
}

export default Write;
