import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postGoogle } from "../redux/actions/users.js";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  if (currentURL.length) {
    const url = new URL(currentURL);
    const params = new URLSearchParams(url.search);
    const code = params.get("code");

    dispatch(postGoogle(code));
  }

  return (
    <div>
      <p>Current URL</p>
    </div>
  );
};

export default GoogleCallback;
