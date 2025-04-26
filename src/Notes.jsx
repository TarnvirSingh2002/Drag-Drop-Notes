import React, { useEffect } from 'react'

export default function Notes({note, setNote}) {
    // console.log("my notes",note);

    // note.map((ele)=>{
    //     console.log(ele);
    // });

    useEffect(()=>{

        const savedNotes=JSON.parse(localStorage.getItem("notes"))||[]; //here all the nodes that are present are saved here

        const updatedNotes=note.map((not)=>{
            const savedNote = null; //when new node is added we will compare here
            if(savedNote){
                return {}
            }
            else{
                const position =determineNewPosition();
                return{...not,position};
            }
        });

        setNote(updatedNotes);

        localStorage.setItem("notes",JSON.stringify(updatedNotes));
    },[note.length]);//when new node is add then it is call because it can effect the length

    const determineNewPosition=()=>{
        const maxX= window.innerWidth-250;
        const maxY=window.innerHeight-250;

        return{
            x:Math.floor(Math.random()* maxX),
            y:Math.floor(Math.random()* maxY)
        }
    }

  return (
    <div style={{height:"600px", width:"80%", backgroundColor:"pink", marginTop:"15px"}}>
        {
            note.map((ele,index)=>{
                return(
                <div key={index} style={{width:"200px",
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