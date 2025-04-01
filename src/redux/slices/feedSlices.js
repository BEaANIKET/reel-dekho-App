import {createSlice} from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.posts = action.payload;
    },
    addLoadMorePost: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    setLikes: (state, action) => {
      const {postId, likes} = action.payload;
      state.posts = state.posts.map(post =>
        post._id === postId ? {...post, likes} : post,
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {addPost, setLoading, setError} = feedSlice.actions;
export default feedSlice.reducer;
