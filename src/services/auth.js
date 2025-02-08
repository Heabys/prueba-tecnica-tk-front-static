export const authService = {
  // eslint-disable-next-line no-unused-vars
  async login(credentials) {
    // const data = await fetchAPI("/api/login", {
    //   method: "POST",
    //   body: JSON.stringify(credentials),
    // });

    const data = {
      user: {
        id: 1,
        name: "John Doe",
        email: "admin@example.com",
      },
      token: "fake-token",
    };
    localStorage.setItem("authToken", data.token);
    return data.user;
  },

  logout() {
    localStorage.removeItem("authToken");
  },
};
