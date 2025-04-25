import { useState } from "react"
import Notes from "./Notes";

function App() {
  const[note,setNote]=useState("");
  const [input, setInput] = useState(["kikik","hgduhcg dfjhuihf jdidhfie ojefoe ojfoen","hufgeruf hfhuierb ehfieb iueyf"]);

  const handleClick=(e)=>{
    if (!note.trim()) return;
    e.preventDefault();
    setInput([...input, note]);
    setNote("");
    console.log(input);
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
