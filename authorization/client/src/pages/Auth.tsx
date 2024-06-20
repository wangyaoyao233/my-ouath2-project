export const Auth = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const responseType = urlParams.get("response_type");
  const redirectUri = decodeURIComponent(urlParams.get("redirect_uri") ?? "");
  const clientId = urlParams.get("client_id");
  const scope = decodeURIComponent(urlParams.get("scope") ?? "");
  const state = decodeURIComponent(urlParams.get("state") ?? "");

  console.log("Response Type:", responseType);
  console.log("Redirect URI:", redirectUri);
  console.log("Client ID:", clientId);
  console.log("Scope:", scope);
  console.log("State:", state);

  const auth = async () => {
    const response = await fetch("http://localhost:4001/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scope,
        state: state,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = data.redirectUrl;
    }
  };

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={auth}>confirm auth</button>
    </div>
  );
};
