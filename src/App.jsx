import { useState } from "react"
import Notes from "./Notes";

function App() {
  const[note,setNote]=useState("");
  const [input, setInput] = useState([]);

    const handleClick=(e)=>{
      if (note.trim()){
      e.preventDefault();

      const lastId = input.length > 0 ? input[input.length - 1].id : 0;

      setInput([...input, { id: lastId+1, text: note }]);
      setNote("");
    }
  }

  return (
    <>
    <form>
      <input id="inp" placeholder="Enter your text" onChange={(e)=>{setNote(e.target.value)}}/>
      <button id="but" onClick={handleClick}>Send</button>
    </form>
      <Notes note={input} setNote={setInput}/>
    </>
  )
}

export default App