import React from "react";

const Snipper = () => {
  return (
    <>
      <div
        className="spinner-border text-primary mt-5 spinner"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

export default Snipper;
