import React from "react";

const Navigation = ({ items }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          style={{
            padding: "10px 20px",
            border: "1px solid silver",
            borderRadius: "5px",
            background: "linear-gradient(to bottom, silver, black)",
            color: "white",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "linear-gradient(to bottom, gold, black)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "linear-gradient(to bottom, silver, black)";
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
