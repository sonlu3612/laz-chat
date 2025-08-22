import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {
  getConvertedChatList as getConvertedChannels,
  getConvertedMessages,
  getConvertedUsers,
} from "../../utils/convert";

export const fetchAllChannels = createAsyncThunk(
  "chat/fetchAllChannels",
  async (_, { rejectWithValue, getState }) => {
    try {
      const currentChannelId = getState().chat.currentChannelId;

      const { data } = await axios.get("/api/Channels/all");
      return getConvertedChannels(data, currentChannelId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const sendMessage = createAsyncThunk(
//   "chat/sendMessage",
//   async ({ channelId, message }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(
//         `/api/Channels/${channelId}/message/send`,
//         { userId, message }
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const fetchMessagesWithUsers = createAsyncThunk(
  "chat/fetchMessagesWithUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const currentChannelId = getState().chat.currentChannelId;
      const messages = getState().chat.messages;
      const users = getState().chat.users;

      if (messages[currentChannelId] != undefined) {
        return rejectWithValue("Already exist messages");
      }

      const { data: messagesData } = await axios.get(
        `/api/Message/${currentChannelId}/messages`
      );

      const convertedMessages = getConvertedMessages(
        messagesData,
        currentChannelId
      );
      const unExistedUserIds = [];

      convertedMessages.messagesByChannelId.forEach((msg) => {
        const user = users[msg.userId];

        if (user == undefined || user == null)
          unExistedUserIds.push(msg.userId);
      });

      const usersData = [];

      for (let i = 0; i < unExistedUserIds.length; i++) {
        const uId = unExistedUserIds[i];
        const { data: userData } = await axios.get(`api/user/${uId}`);
        usersData.push(userData);
      }

      const convertedUsers = getConvertedUsers(usersData);

      return {
        convertedMessages,
        convertedUsers,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  currentChannelId: "",

  // channels: {[{channelId, channelName, ...}]}
  channels: [],

  // messages: {channelId: [{messageId, userId, message, ...}]}
  messages: [],

  // users: [userId: [{userId, userName, ...}]]
  users: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;

      state.channels = state.channels.map((channel) => {
        const isCurrent = channel.conversationId == state.currentChannelId;

        return { ...channel, isSelected: isCurrent };
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
    });

    builder.addCase(fetchMessagesWithUsers.fulfilled, (state, action) => {
      const { convertedMessages, convertedUsers } = action.payload;
      const { channelId, messagesByChannelId } = convertedMessages;

      if (state.messages[channelId] != undefined) {
        state.messages[channelId].push(...messagesByChannelId);
      } else {
        state.messages[channelId] = messagesByChannelId;
      }

      state.users = convertedUsers;
    });
  },
});

export const { setCurrentChannelId } = chatSlice.actions;

export default chatSlice.reducer;
