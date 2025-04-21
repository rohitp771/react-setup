import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './redux/slices/sectionSlice';

export default configureStore({
  reducer: { 
    section: sectionReducer,
   },
});
