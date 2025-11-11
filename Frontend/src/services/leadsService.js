import api from "./api";

class LeadsService {
  // Fetch all leads
  async getAllLeads() {
    try {
      const response = await api.get("/leads");
      return response.data.leads;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Fetch a single lead by ID
  async getLeadById(id) {
    try {
      const response = await api.get(`/leads/${id}`);
      return response.data.lead;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create a new lead
  async createLead(leadData) {
    try {
      const response = await api.post("/leads", leadData);
      return response.data.lead;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update a lead
  async updateLead(id, leadData) {
    try {
      const response = await api.patch(`/leads/${id}`, leadData);
      return response.data.lead;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete a lead
  async deleteLead(id) {
    try {
      const response = await api.delete(`/leads/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Fetch dashboard metrics
  async getDashboardMetrics() {
    try {
      const response = await api.get("/leads/dashboard/metrics");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data.error || "An error occurred";
      return new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      return new Error("Network error. Please check your connection.");
    } else {
      // Something else happened
      return new Error("An unexpected error occurred");
    }
  }
}

export default new LeadsService();
