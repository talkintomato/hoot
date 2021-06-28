
import ComposeCard from './ComposeCard';
import DraftCard from './DraftCard';
import { useState } from 'react';



function Write() {
  const [state, setstate] = useState(true)
  const [draftId, setdraftId] = useState(null)

  return (
    <>
     <h1> Write </h1>
     { state ? 
     <DraftCard onClick={value => {setdraftId(value); setstate(false);}}> </DraftCard> :
     <ComposeCard trueState={() => setstate(true)} draft_Id={draftId}> </ComposeCard> 
}
<button onClick={() => setstate(!state)}></button>
     </>
  );
}

export default Write;
