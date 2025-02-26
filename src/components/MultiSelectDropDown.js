import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const MultiSelectDropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCheckboxChange = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="multi-select-dropdown" ref={dropdownRef} style={{ position: "relative" }}>
      <button
        className="dropdown-toggle"
        onClick={toggleDropdown}
        style={{
          padding: "10px 20px",
          border: "1px solid silver",
          borderRadius: "5px",
          background: "linear-gradient(to bottom, silver, black)",
          color: "white",
          cursor: "pointer",
        }}
      >
        {label} {selected.length > 0 ? `(${selected.length})` : ""}
        <span className="icon">▼</span>
      </button>
      {isOpen && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "300px",
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid silver",
            backgroundColor: "white",
            zIndex: 1000,
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {options.map((option, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    checked={selected.includes(option.name)}
                    onChange={() => handleCheckboxChange(option.name)}
                    id={`${label}-${index}`}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`${label}-${index}`}
                    style={{ marginLeft: "5px", color: "black" }}
                  >
                    {option.flag ? `${option.flag} ` : ""}
                    {option.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

MultiSelectDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, flag: PropTypes.string })),
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

export default MultiSelectDropdown;
