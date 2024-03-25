import { useEffect, useState } from "react";
import Chats from "../Chats.jsx/Chats";
import io from 'socket.io-client';

const Chat = () =>{
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = io("http://localhost:8080");
    const handleSend = (e) =>{
        e.preventDefault();
        socket.emit('message',message);
        setMessage("");
    }
    useEffect(()=>{
        socket.on("message",(message)=>{
            setMessages((prev)=>[...prev, message]);
        })
        return ()=>{
            socket.disconnect();
        }
    },[])
return(
    <div className="chat">
        <form>
            <input type="text" name="message" id="message" className="message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
            <button onClick={handleSend}>Send</button>
        </form>
        {messages.map((message,index)=><Chats key={index} message={message}/>)}
    </div>
    
)
}

export default Chat;