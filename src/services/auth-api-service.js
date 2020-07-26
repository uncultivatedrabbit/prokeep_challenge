const AuthApiService = {
  postLogin(email, password) {
    const url = "https://reqres.in/api/login";
    return fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
};

export default AuthApiService;
