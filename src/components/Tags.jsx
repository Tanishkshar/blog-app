import React from "react";

const Tags = ({ tags }) => {
  return (
    <>
      <hr />
      <div>
        <div
          style={{
            fontWeight: "bold",
            marginTop: "7px",
            fontSize: "20px",
            marginLeft: "25px",
          }}
          className="blog-heading text-start py-2 mb-4"
        >
          Tags
        </div>
      </div>
      <hr />
      <div className="tags">
        {tags?.map((tag, index) => {
          return (
            <p
              style={{
                background: "#f1f1f1",
                textDecoration: "none",
                padding: "10px 15px",
                display: "inline-block",
                color: "black",
                marginRight: "8px",
                marginTop: "5px",
              }}
              className="tag"
              key={index}
            >
              {tag}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Tags;
