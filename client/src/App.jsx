import React, { useEffect,useMemo,useState } from "react";
import { io } from "socket.io-client";
import {Container} from "@mui/material"

const App = () => {
  // const socket = io("http://localhost:3000");
  const socket=useMemo(()=>io("http://localhost:3000"),[]);
  const [message,setMessage]=useState("");
  const [room,setRoom]=useState("");
  const [ownnumber,setownnumber]=useState("");
  const [mesarr,setMessarr]=useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected ", " it is from client ",socket.id);
      setownnumber(socket.id); 
    });

    socket.on("welcome",(s)=>{console.log(s)})
    socket.on("newmessage",(data)=>{console.log(data)
    setMessarr((messages)=>[...messages, data]);
    })
    return ()=>{socket.disconnect()}
  }, []);

    const handler=(e)=>{
      e.preventDefault();
      console.log(message)
      socket.emit("message",{message,room});
      setMessage("")
      
    };
    function update(e){
      setMessage(e.target.value);
    }
    function updateroom(e){
      setRoom(e.target.value);
    }
  return <div> <Container> 
      <h3>Welcome to front end -client</h3>
      <h4>{ownnumber}</h4>
      <form onSubmit={handler}>
        <label>Enter Roon Id.</label>
        <br></br>
        <input value={room}  onChange={updateroom}></input>
        <br></br>
        <label>Enter message...</label>
        <br></br>
        <input value={message} onChange={update}></input>
        <button type="submit">SEND</button>
      </form>
      {mesarr.map((data,key)=>( <h6 key={key}>{data}</h6>))}

  </Container> </div>;
};

export default App;
