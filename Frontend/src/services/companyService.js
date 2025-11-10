import api from "./api";

class CompanyService {
  // Create a new company
  async createCompany(companyData) {
    try {
      const response = await api.post("/companies", companyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get company by ID
  async getCompanyById(companyId) {
    try {
      const response = await api.get(`/companies/${companyId}`);
      return response.data.company;
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
      console.error("Network error details:", error.request);
      return new Error(
        "Network error. Please check your connection and ensure the backend server is running."
      );
    } else {
      // Something else happened
      console.error("Unexpected error:", error.message);
      return new Error("An unexpected error occurred");
    }
  }
}

export default new CompanyService();
