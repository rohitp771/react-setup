import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveUser } from '../../api/userService';

export const saveUserData = createAsyncThunk('user/saveUserData', async (userData) => {
  const response = await saveUser(userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: {}, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUserData.pending, (state) => { state.status = 'loading'; })
      .addCase(saveUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(saveUserData.rejected, (state) => { state.status = 'failed'; });
  },
});

export default userSlice.reducer;
