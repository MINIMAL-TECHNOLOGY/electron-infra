import { createSlice } from '@reduxjs/toolkit';
import { setState } from './service';

const initialState = {
  credentials: [
    {
      username: '',
      password: '',
      certificate: '',
      rememberMe: false,
      authenticated: false,
      response: null,
    },
  ],
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      setState(state, action);
    },
    removeCredential: (state, action) => {
      state.credentials.splice(action.payload.index, 1);
    },
  },
});

export const { setAuthState, removeCredential } = slice.actions;

export default slice.reducer;
