import { createSelector } from "@reduxjs/toolkit";

const selectMessages = (state) => state.chat.messages;
const selectUsers = (state) => state.chat.users;
const selectCurrentChannelId = (state) => state.chat.currentChannelId;

export const selectMessagesWithUsers = createSelector(
  [selectMessages, selectUsers, selectCurrentChannelId],
  (messages, users, currentChannelId) => {
    if (
      messages == undefined ||
      users == undefined ||
      currentChannelId == undefined
    )
      return [];
    if (messages.length == 0 || users.length == 0) return [];

    const currentMessagesById = messages[currentChannelId];

    if (currentMessagesById == undefined) return [];

    return currentMessagesById.map((msg) => {
      const user = users[msg.id];

      const res = {
        id: msg.id,
        text: msg.content,
        isMe: false,
        nickname: user.firstName + " " + user.lastName,
      };

      return res;
    });
  }
);
