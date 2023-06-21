import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Tags from "../components/Tags";

const Details = ({ setActive, user }) => {
  const { id } = useParams();
  const [blog, setBlogs] = useState(null);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docref = doc(db, "blogs", id);
    const blogdetails = await getDoc(docref);
    setBlogs(blogdetails.data());
    setActive(null);
  };
  return (
    <>
      <div
        className="single"
        style={{
          position: "relative",
          minHeight: "100%",
          height: "700px",
          minHeight: "100%",
        }}
      >
        <div
          className="blog-title-box"
          style={{
            backgroundImage: `url(${blog?.imgUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minWidth: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zindex: 10,
              //   background: "rgba(0,0,0,.4)",
            }}
            className="overlay"
          ></div>
          <div className="blog-title">
            <span
              style={{
                display: "inline-block",
                color: "white",
                marginTop: "500px",
                fontWeight: "bolder",
              }}
            >
              {blog?.timestamp.toDate().toDateString()}
            </span>
            <h1
              style={{
                color: "white",
                fontWeight: "bolder",
                fontsize: "400px",
              }}
            >
              {blog?.title}
            </h1>
          </div>
        </div>
        <div className="container-fluid pb-4 pt-4 padding blog-single-content">
          <div className="container-padding">
            <div className="row mx-0">
              <div className="col-md-8">
                <span
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#222",
                    marginTop: "4px",
                    marginBottom: "15px",
                    fontWeight: "bold",
                    fontsize: "16px",
                  }}
                  className="meta-info text-start"
                >
                  By{" "}
                  <p style={{ display: "inline-block" }} className="author">
                    {blog?.author}
                  </p>
                  - &nbsp;
                  {blog?.timestamp.toDate().toDateString()}
                </span>
                <hr />
                <p className="text-start">{blog?.description}</p>
              </div>
              <div style={{ display: "inline-block" }} className="col-md-3">
                <Tags tags={blog?.tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
