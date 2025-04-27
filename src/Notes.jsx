import React, { createRef, useEffect, useRef, useState } from 'react'

export default function Notes({note, setNote}) {
    // const [s,setS]=useState(0);

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
                // setS(s+1);
                // console.log(s);
                return{...not,position};//assign the position to the not(note) and sore inside the array
            }

        });

        setNote(updatedNotes);

        localStorage.setItem("notes",JSON.stringify(updatedNotes));//stringify = turn array/object → string
    },[note.length]);//when new node is add then it is call because it can effect the length

    const noteRefs=useRef([]);

    const determineNewPosition=()=>{
        const maxX= window.innerWidth-250;//width of window
        const maxY=window.innerHeight-250;//height of window

        return{
            x:Math.floor(Math.random()* maxX),
            y:Math.floor(Math.random()* maxY)
        }
    }

    const handleDragId=(note,e)=>{
        const {id} = note;
        const noteRef = noteRefs.current[id].current;
        const rect = noteRef.getBoundingClientRect();// this method is used to get 
        // information about the position of the element on the screen
        const offSetX=e.clientX-rect.left;
        const offSetY=e.clientY-rect.top;
        //offSetX, offSetY value set only one time when we click

        const startPos=note.position;
        const handleMouseMove=(e)=>{
            const newX =e.clientX-offSetX;
            const newY =e.clientY-offSetY;
            noteRef.style.left=`${newX}px`;//tracing live movement
            noteRef.style.top=`${newY}px`;//tracing live movement
        }

        const handleMouseUp=()=>{
            document.removeEventListener('mousemove',handleMouseMove);
            document.removeEventListener('mouseup',handleMouseUp);
            const finalRect =noteRef.getBoundingClientRect();
            const newPosition = {x: finalRect.left, y: finalRect.top};// at the last 
            // we will save the position

            if(checkForOverlap(id)){
                noteRef.style.left=`${startPos.x}px`;
                noteRef.style.top=`${startPos.y}px`;
            }
            else{
                updatedNotePosition(id,newPosition)
            }

        }
        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);
    }

    const updatedNotePosition=(id,newPosition)=>{
        const updateNotes = note.map((not)=>{
            return not.id === id?{...not,position:newPosition}:not
        });

        setNote(updateNotes);
        localStorage.setItem("notes",JSON.stringify(updateNotes));
    }

    const checkForOverlap=(id)=>{
        const currentNoteRef = noteRefs.current[id].current;
        const rect = currentNoteRef.getBoundingClientRect();

        return note.some((not)=>{
            if(not.id===id)
                return false;
            const other = noteRefs.current[not.id].current;
            const otherRect = other.getBoundingClientRect();

            const overlap=!(
                rect.right < otherRect.left ||
                rect.left > otherRect.right ||
                rect.bottom < otherRect.top ||
                rect.top > otherRect.bottom
              );
        
              return overlap;
        })

    }
  return (
    <div style={{height:"600px", width:"80%", backgroundColor:"pink", marginTop:"15px"}}>
        {
            note.map((ele)=>{
                return(
                <div key={ele.id} 

                style={{width:"200px",
                    left:`${(ele.position)?.x}px`,
                    top:`${(ele.position)?.y}px`,
                    position:"absolute",
                    border:"3px solid black", 
                    padding:"10px",
                    cursor:"move",
                    backgroundColor:"yellow"
                }}

                ref={ noteRefs.current[ele.id]
                    ? noteRefs.current[ele.id]
                    : (noteRefs.current[ele.id] = createRef())
                }
                
                onMouseDown={(e)=>{handleDragId(ele, e)}}>
                    📌{ele.text}</div>)
            })
        }
    </div>
  )
}