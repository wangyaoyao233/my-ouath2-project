import { useEffect } from "react";

export const Callback = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const state = new URLSearchParams(window.location.search).get("state");

    const fetchToken = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          state: state
        }),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    };
    fetchToken();
  }, []);

  return <></>;
};
