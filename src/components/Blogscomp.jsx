import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility/main";

const Blogscomp = ({ blogs, user, handledelete }) => {
  const user_id = user?.uid;
  //   console.log(user?.displayName);
  return (
    <>
      <hr />
      <div
        className="blog-heading text-start py-2 mb-4"
        style={{ fontSize: "25px", fontWeight: "bold" }}
      >
        Daily Blogs
      </div>
      <hr />
      {blogs?.map((item) => (
        <div className="row pb-4" key={item.id}>
          <div className="col-md-5">
            <div className="hover-blogs-img">
              <div
                style={{
                  height: "216px",
                  overflow: "hidden",
                  position: "relative",
                  top: 0,
                }}
                className="blogs-img"
              >
                <img
                  style={{
                    height: "283px",
                    overflow: "hidden",
                    position: "relative",
                    top: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                    borderRadius: "5px",
                  }}
                  src={item.imgUrl}
                  alt={item.title}
                />
                <div></div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="text-start">
              <h6
                style={{
                  display:
                    "table" /* keep the background color wrapped tight */,
                  /* keep the table centered */
                  padding: "5px",
                  fontSize: "20px",
                  backgroundColor: "blue",
                  color: "#ffffff",
                }}
                className="category catg-color"
              >
                {item.category}
              </h6>
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  display: "block",
                  fontSize: "20px",
                }}
                className="title"
              >
                {item.title}
              </span>
              <span
                style={{ textDecoration: "none", display: "inline-block" }}
                className="meta-info"
              >
                <p
                  style={{
                    display: "inline-block",
                    fontWeight: "bolder",
                    fontSize: "19px",
                  }}
                  className="author"
                >
                  {item.author}
                </p>{" "}
                -&nbsp; {item.timestamp.toDate().toDateString()}
              </span>

              <span
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "left",
                  marginLeft: "4px",
                  position: "relative",

                  // paddingBottom: "14px",
                }}
                className="short-description"
              >
                {excerpt(item.description, 120)}
                {/* this excerpt method is used for shortening our description  */}
              </span>
            </div>

            <Link style={{ textDecoration: "none" }} to={`/Details/${item.id}`}>
              <button
                className="btn btn-read"
                style={{
                  backgroundColor: "black",
                  //   marginRight: "321px",
                  color: "white",
                  marginTop: "14px",

                  marginRight: "20px",
                  display: "block",
                  textDecoration: "none",
                  float: "left",
                }}
              >
                Read More
              </button>
            </Link>
            {user?.uid && item.userId === user.uid && (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6608/6608010.png"
                  alt="img"
                  onClick={() => handledelete(item.id)}
                  cursor="pointer"
                  style={{
                    width: "30px",
                    display: "inline-block",
                    // marginBottom: "18px",
                    cursor: "pointer",
                    float: "right",
                    paddingTop: "13px",
                    // paddingBottom: "10px",
                  }}
                />
                <Link to={`/update/${item.id}`}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                    alt="img"
                    style={{
                      width: "28px",
                      display: "inline-block",
                      //   marginBottom: "3px",
                      cursor: "pointer",
                      float: "right",
                      paddingTop: "13px",
                    }}
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Blogscomp;
