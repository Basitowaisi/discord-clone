import React from "react"
import { useDispatch } from "react-redux"
import { setChannelInfo } from "../features/appSlice"
import "./SidebarChannel.css"

const SidebarChannel = (props) => {
  const { id, channelName } = props
  const dispatch = useDispatch()

  const setChannelId = (id) =>
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    )
  return (
    <div className="sidebarChannel" onClick={() => setChannelId(id)}>
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channelName}
      </h4>
    </div>
  )
}

export default SidebarChannel
