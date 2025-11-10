import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leadsService from "../services/leadsService";

// ... existing code ...

// Async thunk for fetching leads
export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  const leads = await leadsService.getAllLeads();
  return leads;
});

// Async thunk for creating a lead
export const createLead = createAsyncThunk(
  "leads/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const newLead = await leadsService.createLead(leadData);
      return newLead;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a lead
export const updateLeadAsync = createAsyncThunk(
  "leads/updateLead",
  async ({ id, leadData }, { rejectWithValue }) => {
    try {
      const updatedLead = await leadsService.updateLead(id, leadData);
      return updatedLead;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a lead
export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId, { rejectWithValue }) => {
    try {
      await leadsService.deleteLead(leadId);
      return leadId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addLead: (state, action) => {
      state.items.push(action.payload);
    },
    updateLead: (state, action) => {
      const index = state.items.findIndex(
        (lead) => lead.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch leads
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update lead
      .addCase(updateLeadAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (lead) => lead.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Create lead
      .addCase(createLead.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Delete lead
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.items = state.items.filter((lead) => lead.id !== action.payload);
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addLead, updateLead } = leadsSlice.actions;
export default leadsSlice.reducer;
