import { useState } from "react";

const Chat = () =>{
    const [message, SetMessage] = useState("");
    const handleSend = (e) =>{
        e.preventDefault();
        SetMessage("");
    }
return(
    <div className="chat">
        <form action="post">
            <input type="text" name="message" id="message" className="message" value={message} onChange={(e)=>SetMessage(e.target.value)}/>
            <button type="submit" onClick={handleSend}>Send</button>
        </form>
    </div>

)
}

export default Chat;