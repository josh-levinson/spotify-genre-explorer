import { useEffect, useState } from "react";
import "./Eula.css";
import Markdown from "react-markdown";

function Eula({ setEulaAccepted }) {
  const [eulaChecked, setEulaChecked] = useState(false);
  const [eulaMarkdown, setEulaMarkdown] = useState(null);

  function handleAccept() {
    localStorage.setItem("eula_accepted", true);
    setEulaAccepted(true);
  }

  useEffect(() => {
    async function fetchEulaMarkdown() {
      try {
        const response = await fetch("/eula.md");

        if (!response.ok)
          throw new Error(`Failed to fetch eula markdown: ${response.status}`);

        const text = await response.text();
        setEulaMarkdown(text);
      } catch (error) {
        console.error("Error fetching eula markdown:", error);
      }
    }

    fetchEulaMarkdown();
  }, [setEulaMarkdown]);

  return (
    <div className="eula">
      <div className="eula-content">
        <div className="eulaText">
          <Markdown>{eulaMarkdown}</Markdown>
        </div>
        <div className="eulaActions">
          <label className="eula-checkbox">
            <input
              type="checkbox"
              checked={eulaChecked}
              onChange={(e) => setEulaChecked(e.target.checked)}
            />
            I have read and agree to the End User License Agreement
          </label>
          <button
            className="eula-button"
            disabled={!eulaChecked}
            onClick={handleAccept}
          >
            Accept and Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Eula;
