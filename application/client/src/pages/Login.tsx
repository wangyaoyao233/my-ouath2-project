

export const Login = () => {
  const login = () => {
    fetch("http://localhost:3001/login", {
      method: "GET",
    }).then((res) => {
      console.log(res);
      window.location.href = res.url;
    }).catch((err) => {
      console.error(err);
    });    

  };
  
  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>login</button>
    </div>
  );
};
