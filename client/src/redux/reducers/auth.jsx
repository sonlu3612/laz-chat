import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { getConvertedMyUser } from "../../utils/convert";

/**
 * Verify token and return the current user when successful.
 * @returns {Promise<MyUser>} when fulfilled
 */

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      // const { data } = await axios.get("/api/users/profile"); //Test
      // const { data } = await axios.get(`api/user/${1}`); // Test
      // return getConvertedMyUser(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/** @type {{ user: MyUser | null, loading: boolean, error: any }} */
const initialState = {
  /**
   * @typedef {Object} MyUser
   * @property {number|string} id - Unique identifier for the user
   * @property {string} firstName
   * @property {string} lastName
   */

  /** @type {MyUser | null} */
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMyUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMyUser } = authSlice.actions;

export default authSlice.reducer;
