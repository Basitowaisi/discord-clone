import React, { useEffect, useState } from "react"
import "./Sidebar.css"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AddIcon from "@material-ui/icons/Add"
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt"
import CallIcon from "@material-ui/icons/Call"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import MicIcon from "@material-ui/icons/Mic"
import HeadSetIcon from "@material-ui/icons/Headset"
import SettingsIcon from "@material-ui/icons/Settings"
import SidebarChannel from "./SidebarChannel"
import { Avatar } from "@material-ui/core"
import { useSelector } from "react-redux"
import db, { auth } from "../firebase"
import { selectUser } from "../features/userSlice"

const Sidebar = () => {
  const [channels, setChannels] = useState([])
  const user = useSelector(selectUser)
  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    })
  }, [])
  const addChannel = () => {
    const channelName = prompt("Enter a channel name")
    if (channelName) {
      db.collection("channels").add({
        channelName,
      })
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Basit Owaisi</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={addChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>{user.uid.substring(0, 5)} </p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadSetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
