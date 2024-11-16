import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Callback() {
    const location = useLocation(); // Get the current location (URL)
    const [code, setCode] = useState(null); // State to store the response

    useEffect(() => {
    // Get the query string from the URL
    const queryParams = new URLSearchParams(location.search);

    // Parse the query parameters, for example:
    // Assuming the URL is something like:
    // http://localhost:3000/callback?code=abcdef12345&state=xyz
    const codeParam = queryParams.get('code');  // Get 'code' from the query string

    // Assign the 'code' to your variable (or perform any other logic)
    setCode(codeParam);
  }, [location.search]); // Re-run the effect if the query string changes

  return (
    <div>
      <h1>Callback Page</h1>
      <p>Code: {code}</p>
    </div>
  );
};
export default Callback;
