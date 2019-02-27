const ChatAPI = {
  friendList: {},
  subscribeToFriendStatus(friendId, changeStatusHandler) {
    if (!this.friendList[friendId]) {
      console.log("Timer started for ", friendId);
      let status = false;
      const timer = setInterval(
        () => ((status = !status), changeStatusHandler(status)),
        friendId.substring(1) % 2 === 0 ? 3000 : 5000
      );
      this.friendList[friendId] = { status: false, timer: timer };
    }
  },
  unsubscribeFromFriendStatus(friendId, changeStatusHandler) {
    if (this.friendList[friendId].timer) {
      console.log("Timer stopped for ", friendId);
      clearInterval(this.friendList[friendId].timer);
      delete this.friendList[friendId];
    }
  }
};

export { ChatAPI };
