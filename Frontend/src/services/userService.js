import api from "./api";

class UserService {
  // Get users by company ID
  async getUsersByCompany(companyId) {
    try {
      const response = await api.get(`/users/company/${companyId}`);
      return response.data.users;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create a new user
  async createUser(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update an existing user
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data.user;
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

export default new UserService();
