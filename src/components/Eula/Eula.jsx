import { useEffect, useState } from "react";
import "./Eula.css";
import Markdown from "react-markdown";

function Eula() {
  const [eulaAccepted, setEulaAccepted] = useState(false);
  const [eulaMarkdown, setEulaMarkdown] = useState(null);

  function handleAccept() {
    setEulaAccepted(true);
    localStorage.setItem("eulaAccepted", true);
  }

  useEffect(() => {
    async function fetchEulaMarkdown() {
      try {
        const response = await fetch("/eula.md");

        if (!response.ok)
          throw new Error(`Failed to fetch eula markdown: ${response.status}`);

        const text = await response.text();
        console.log(text);

        setEulaMarkdown(text);
      } catch (error) {
        console.error("Error fetching eula markdown:", error);
      }
    }

    fetchEulaMarkdown();
  }, [setEulaMarkdown]);

  return (
    <div className="eula">
      <div className="eulaText">
        <Markdown>{eulaMarkdown}</Markdown>
      </div>
      <div className="eulaActions">
        <label className="eula-checkbox">
          <input
            type="checkbox"
            checked={eulaAccepted}
            onChange={(e) => setEulaAccepted(e.target.checked)}
          />
          I have read and agree to the End User License Agreement
        </label>
        <button
          className="eula-button"
          disabled={!eulaAccepted}
          onClick={handleAccept}
        >
          Accept and Continue
        </button>
      </div>
    </div>
  );
}

export default Eula;
