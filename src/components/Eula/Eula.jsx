import { useState } from "react";
import "./Eula.css";
import { eulaText } from "./eula.md";

function Eula() {
  const [eulaAccepted, setEulaAccepted] = useState(false);

  function handleAccept() {
    setEulaAccepted(true);
    localStorage.setItem("eulaAccepted", true);
  }

  return (
    <div className="eula">
      <div className="eulaText">{eulaText}</div>
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
