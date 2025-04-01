import {createSlice} from '@reduxjs/toolkit';

const soundSlice = createSlice({
  name: 'sound',
  initialState: {
    isPlaying: false,
  },
  reducers: {
    play: (state, action) => {
      console.log('play');

      state.isPlaying = true;
    },
    paused: (state, action) => {
      console.log('paused');

      state.isPlaying = false;
    },
  },
});

export const {setPlaying} = soundSlice.actions;
export default soundSlice.reducer;
