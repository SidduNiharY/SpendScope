export const endpoints = {
  auth: {
    me: "/api/v1/auth/me",
    login: "/api/v1/auth/login",
    signup: "/api/v1/auth/signup",
    logout: "/api/v1/auth/logout",
  },
  transactions: {
    list: "/api/v1/txns",
  },
  upload: {
    file: "/api/v1/upload",
  },
  rules: {
    list: "/api/v1/rules",
    create: "/api/v1/rules",
  },
};