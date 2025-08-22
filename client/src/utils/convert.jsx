const getConvertedChatList = (chatList, paramId) => {
  return chatList.map((chat) => {
    const { id, title, updatedAt } = chat;
    return {
      conversationId: id,
      conversationName: title,
      timestamp: updatedAt,
      isSelected: id == paramId,
      lastMessage: "Last Message",
      avatar: undefined,
    };
  });
};

const getConvertedMessages = (messages, channelId) => {
  const messagesByChannelId = messages.map((item) => {
    const { id, userId, content, sentAt } = item;
    return {
      id: id,
      userId: userId,
      sentAt: sentAt,
      content: content,
    };
  });

  return { channelId, messagesByChannelId };
};

const getConvertedUsers = (users) => {
  const res = {};

  users.forEach((user) => {
    res[user.id] = { firstName: user.firstName, lastName: user.lastName };
  });

  return res;
};

export { getConvertedChatList, getConvertedMessages, getConvertedUsers };
