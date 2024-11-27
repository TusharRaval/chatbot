import React, { useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [config, setConfig] = useState({
    configName: "config-1",
    botName: "Chatbot",
    fontFamily: "Space Grotesk, sans-serif",
    headerColor: "#E63A1E",
    headerFontColor: "#FFFFFF",
    backgroundColor: "#E8E1DB",
    chatFontColor: "#323130",
    avatarImage: "",
    launcherImage: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setConfig((prev) => ({ ...prev, [field]: fileURL }));
    }
  };

  // Function to download the config as a JSON file
  const downloadConfig = () => {
    const configJson = JSON.stringify(config, null, 2); // Convert config to JSON format
    const blob = new Blob([configJson], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "config.json";
    link.click();
  };

  // Load configuration from JSON
  const handleLoadConfig = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setConfig(JSON.parse(reader.result));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Configuration Form */}
        <div className="col-md-6">
          <button
            className="btn btn-dark mb-3"
            onClick={() => document.getElementById("loadConfig").click()}
          >
            Load Config
          </button>
          <input
            type="file"
            id="loadConfig"
            className="d-none"
            accept=".json"
            onChange={handleLoadConfig}
          />
          <div className="form-group">
            <label>Config Name</label>
            <input
              type="text"
              className="form-control"
              name="configName"
              value={config.configName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bot Name</label>
            <input
              type="text"
              className="form-control"
              name="botName"
              value={config.botName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Font Family</label>
            <select
              className="form-control"
              name="fontFamily"
              value={config.fontFamily}
              onChange={handleChange}
            >
              <option value="Space Grotesk, sans-serif">Space Grotesk</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Roboto, sans-serif">Roboto</option>
            </select>
          </div>
          {[
            "headerColor",
            "headerFontColor",
            "backgroundColor",
            "chatFontColor",
          ].map((colorField, idx) => (
            <div className="form-group" key={idx}>
              <label>{colorField.replace(/([A-Z])/g, " $1")}</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control pr-5" // Add padding to the right to make space for the color picker
                  value={config[colorField]}
                  readOnly
                />
                <input
                  type="color"
                  name={colorField}
                  className="position-absolute top-50 translate-middle-y"
                  style={{
                    right: "10px", // Position it at the far right of the container
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  value={config[colorField]}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}

          <div className="form-group">
            <label>Avatar Image</label>
            <div
              className="custom-file-input-wrapper"
              style={{ position: "relative" }}
            >
              {/* Display image if selected */}
              {config.avatarImage && (
                <img
                  src={config.avatarImage}
                  alt="Avatar"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}

              {/* File input with padding to accommodate image */}
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleFileUpload(e, "avatarImage")}
                style={{
                  paddingLeft: config.avatarImage ? "60px" : "10px", // Adjust padding if image is shown
                  paddingRight: "40px", // Add space for the upload icon
                }}
              />

              {/* Upload Icon */}
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <i className="fa fa-upload" aria-hidden="true"></i>{" "}
                {/* FontAwesome upload icon */}
              </span>
            </div>
          </div>

          {/* Launcher Image */}
          <div className="form-group">
            <label>Launcher Image</label>
            <div
              className="custom-file-input-wrapper"
              style={{ position: "relative" }}
            >
              {config.launcherImage && (
                <img
                  src={config.launcherImage}
                  alt="Launcher"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <input
                id="file-upload-input-launcher"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleFileUpload(e, "launcherImage")}
                style={{
                  paddingLeft: config.launcherImage ? "60px" : "10px",
                  paddingRight: "40px",
                }}
              />
              <span
                onClick={() => handleFileUpload("launcher")}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <i className="fa fa-upload" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div
          className="col-md-6"
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h5 className="text-center mb-3">Live Preview</h5>
          <div
            className="chat-widget"
            style={{ fontFamily: config.fontFamily }}
          >
            <div
              className="chat-header"
              style={{
                backgroundColor: config.headerColor,
                color: config.headerFontColor,
              }}
            >
              <span>{config.botName}</span>
            </div>
            <div
              className="chat-body"
              style={{
                backgroundColor: config.backgroundColor,
                color: config.chatFontColor,
                display: "flex",
                // Aligns the image and text vertically in the center
                padding: "15px",
              }}
            >
              {config.avatarImage && (
                <img
                  src={config.avatarImage}
                  alt="Avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%", // Makes the image round
                    objectFit: "cover", // Ensures the image fits inside the circle
                    marginRight: "10px", // Adds space between the image and the text
                  }}
                />
              )}
              <p>Hi! I'm {config.botName}. How can I assist you today?</p>
            </div>

            <input
              type="text"
              className="form-control"
              placeholder="Need help? Type here..."
              style={{
                width: "100%",
                paddingRight: "40px", // Space for the icon
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "270px",
                bottom: "210px",

                cursor: "pointer",
              }}
            >
              <i class="fa-solid fa-microphone" aria-hidden="true"></i>
            </span>

            {config.launcherImage && (
              <img
                src={config.launcherImage}
                alt="Launcher"
                className="launcher-icon"
              />
            )}
          </div>

          {/* Download Config Button */}
          <div className="text-center mt-5">
            <button className="btn btn-dark" onClick={downloadConfig}>
              Download Config
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
