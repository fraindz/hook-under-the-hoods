import React, { useState, useEffect } from "react";
import { ChatAPI } from "../api";

function useFriendStatus(friendId) {
  const [dummy1, _] = useState({ o: "dummy2" });
  const [isOnline, setIsOnline] = useState(null);
  const [renderCount, setRenderCount] = useState(0);

  function handleStatusChange(status) {
    setIsOnline(status);
    setRenderCount(state => state + 1);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);
    };
  }, friendId);

  return isOnline;
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }
  return `${props.friend.name} is ${isOnline ? "Online" : "Offline"}`;
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  );
}

export default { FriendStatus, FriendListItem };
