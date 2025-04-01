import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlices';
import feedSlice from './slices/feedSlices';
import sounSlices from './slices/soundSlices';
import likesCountSlices from './slices/likesCountSlices';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    feed: feedSlice,
    sound: sounSlices,
    likesCount: likesCountSlices,
  },
});
