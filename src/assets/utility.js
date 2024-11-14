const isLoggedIn = () => {
    return !!localStorage.getItem("token"); // Returns true if token is present
  };
  