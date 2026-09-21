// Simple frontend-only authentication using localStorage.
// NOTE: This is for learning/demo purposes only - it is NOT secure.

// Demo login credentials
export const DEMO_USER = {
  name: 'Admin User',
  email: 'admin@school.com',
  password: 'admin123',
};

export const isLoggedIn = () => localStorage.getItem('isLoggedIn') === 'true';

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    return null;
  }
};

// Returns true when the credentials match the demo user.
export const login = (email, password) => {
  if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ name: DEMO_USER.name, email: DEMO_USER.email }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
};
