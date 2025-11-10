import api from "./api";

class AuthService {
  // Register a new user
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Get current user's company ID
  getCurrentUserCompanyId() {
    const user = this.getCurrentUser();
    return user ? user.companyId : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
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

export default new AuthService();
