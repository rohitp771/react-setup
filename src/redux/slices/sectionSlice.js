import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dummySaveSectionData, fetchSectionData, saveSectionData } from "../../api/api";

// No parameter needed here
export const getSectionData = createAsyncThunk(
  "section/getSectionData",
  async () => {
    const data = await fetchSectionData();
    return data;
  }
);

export const submitSectionData = createAsyncThunk(
  "section/submitSectionData",
  async ({ currentStep, data }) => {
    const nextStep = await dummySaveSectionData(currentStep, { data });
    return nextStep;
  }
);

const sectionSlice = createSlice({
  name: "section",
  initialState: {
    sectionConfig: {},
    sectionData: {},
    currentCardIndex: 0,
    loading: false,
    error: null,
  },
  reducers: {
    saveCardData: (state, action) => {
      const { cardData } = action.payload;
      state.sectionData = {...state.sectionData,...cardData};
    },
    nextCard: (state) => {
      state.currentCardIndex += 1;
    },
    previousCard: (state) => {
      state.currentCardIndex -= 1;
    },
    resetSection: (state) => {
      state.sectionConfig = {};
      state.sectionData = {};
      state.currentCardIndex = 0;
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSectionData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSectionData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStep = action.payload.currentStep;
        state.sectionConfig = action.payload.sectionConfig;
      })
      .addCase(getSectionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitSectionData.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitSectionData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitSectionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { saveCardData, nextCard,previousCard, resetSection } = sectionSlice.actions;
export default sectionSlice.reducer;
