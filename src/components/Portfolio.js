import React from "react";
import EnhancedTable from "./EnhancedTable";
import sampleData from "../assets/sampleData";

const Portfolio = () => {
  return (
    <div>
      <h2 style={{ color: "gold" }}>Your Portfolio</h2>
      <EnhancedTable data={sampleData} />
    </div>
  );
};

export default Portfolio;
