import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const likesCountSlice = createSlice({
  name: 'likesCount',
  initialState,
  reducers: {
    setLikes: (state, action) => {
      const {postId, likes} = action.payload;
      state[postId] = likes;
    },
  },
});

export const selectLikesByPostId = (state, postId) =>
  state.likesCount[postId] || 0;

export const {setLikes} = likesCountSlice.actions;
export default likesCountSlice.reducer;
