
import data from '../../data';
import ComposeCard from './ComposeCard';
import DraftCard from './DraftCard';
import { useState } from 'react';



function Write() {
  const [state, setstate] = useState(true)

  return (
    <>
     <h1> Write </h1>
     { state ? 
     <DraftCard data={data}> </DraftCard> :
     <ComposeCard></ComposeCard> 
}
<button onClick={() => setstate(!state)}></button>
     </>
  );
}

export default Write;
