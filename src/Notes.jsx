import React, { useEffect } from 'react'

export default function Notes({note, setNote}) {

    useEffect(()=>{

        const savedNotes=JSON.parse(localStorage.getItem("notes"))||[];//parse = turn string → array/object
        //here all the nodes that are present are saved here

        const updatedNotes=note.map((not)=>{
            const savedNote = savedNotes.find((n)=>{return n.id===not.id}); //when new node is added we will compare here
            if(savedNote){
                return {...not, position:savedNote.position};
            }
            else{//if note is not present inside the "notes" i.e in localStorage"
                const position = determineNewPosition();//create random position
                console.log(not,"  ", position);
                return{...not,position};//assign the position to the not(note) and sore inside the array
            }
        });

        setNote(updatedNotes);

        localStorage.setItem("notes",JSON.stringify(updatedNotes));//stringify = turn array/object → string
    },[note.length]);//when new node is add then it is call because it can effect the length

    const determineNewPosition=()=>{
        const maxX= window.innerWidth*0.60;//width of window
        const maxY=window.innerHeight-250;//height of window

        return{
            x:Math.floor(Math.random()* maxX),
            y:Math.floor(Math.random()* maxY)
        }
    }

  return (
    <div style={{height:"600px", width:"80%", backgroundColor:"pink", marginTop:"15px"}}>
        {
            note.map((ele)=>{
                return(
                <div key={ele.id} style={{width:"200px",
                left:`${(ele.position)?.x}px`,
                top:`${(ele.position)?.y}px`,
                position:"absolute",
                border:"3px solid black", 
                padding:"10px",
                cursor:"move",
                backgroundColor:"yellow"}}>
                    📌{ele.text}</div>)
            })
        }
      
    </div>
  )
}