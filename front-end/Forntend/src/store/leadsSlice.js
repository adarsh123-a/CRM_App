import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock data for leads
const mockLeads = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "New",
    created: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Contacted",
    created: "2023-05-14",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Qualified",
    created: "2023-05-12",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "New",
    created: "2023-05-10",
  },
];

// Async thunk for fetching leads
export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockLeads;
});

// Async thunk for deleting a lead
export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // In a real app, you would make an API call here
      console.log("Deleting lead with ID:", leadId);
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
