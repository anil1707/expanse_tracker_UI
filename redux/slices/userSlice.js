import { createSlice } from "@reduxjs/toolkit";

const getContactSlice = createSlice({
  name: "contactDetail",
  initialState: [],
  reducers: {
    addContacts: (state, action) => {
      return [...state, action.payload]; // Mutates state directly, no need to return
    },
    getContact: (state) => {
      return state; // You can keep this as is if you want, but it's not necessary to return state explicitly.
    },
    clearContacts: (state) => {
      return []; // Mutates state directly, no need to return
    },
  },
});

// Access the actions and reducer properly
export const { addContacts, getContact, clearContacts } = getContactSlice.actions;
export default getContactSlice.reducer;
