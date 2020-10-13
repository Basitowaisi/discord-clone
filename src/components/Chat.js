import React, { useEffect, useState } from "react"
import "./Chat.css"
import ChatHeader from "./ChatHeader"
import Message from "./Message"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { CardGiftcard, EmojiEmotions, Gif } from "@material-ui/icons"
import { useSelector } from "react-redux"
import { selectChannelId, selectChannelName } from "../features/appSlice"
import { selectUser } from "../features/userSlice"
import db from "../firebase"
import firebase from "firebase"
const Chat = (props) => {
  const channelName = useSelector(selectChannelName)
  const channelId = useSelector(selectChannelId)
  const user = useSelector(selectUser)

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        )
    }
  }, [channelId])

  const handleSubmit = (e) => {
    e.preventDefault()
    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    })
    setInput("")
  }

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Message"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="chat__inputButton" type="submit">
            Send Message
          </button>
        </form>
        <div className="chat__infoIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  )
}

export default Chat
