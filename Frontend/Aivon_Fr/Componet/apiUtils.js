import Api from './Api';

/**
 * User Authentication and Management API calls
 */

// Sign up a new user
export const signupUser = async (name, email, password) => {
  try {
    const response = await Api.post("/api/v1/user/signup", {
      name,
      email,
      password
    });
    return { success: true, data: response.data, token: response.data.token };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.msg || "Sign up failed"
    };
  }
};

// Sign in a user
export const signinUser = async (email, password) => {
  try {
    const response = await Api.post("/api/v1/user/signin", {
      email,
      password
    });
    return { success: true, data: response.data, token: response.data.token };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.msg || "Sign in failed"
    };
  }
};

// Get all users (protected route)
export const getAllUsers = async () => {
  try {
    const response = await Api.get("/api/v1/user/getalluser");
    return { success: true, data: response.data.users };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.msg || "Failed to fetch users"
    };
  }
};

// Store token in localStorage
export const storeToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token from localStorage (logout)
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Log out user
export const logoutUser = () => {
  removeToken();
  window.location.href = '/login';
};
