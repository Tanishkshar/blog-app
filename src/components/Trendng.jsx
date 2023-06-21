import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

const Trendng = ({ blogs }) => {
  const option = {
    loop: true,
    margin: 10,
    new: "true",
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
  return (
    <>
      <div>
        <div
          style={{ fontWeight: "bolder", fontSize: "30px" }}
          className="blog-heading text-start py-2 mb-4"
        >
          Trending
        </div>
      </div>
      <OwlCarousel className="owl-theme" {...option}>
        {blogs?.map((item) => (
          <div className="item px-2" key={item.id}>
            <Link to={`/Details/${item.id}`}>
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  zIndex: 5,
                }}
                className="trending-img-position"
              >
                <div
                  className="trending-img-size"
                  style={{ height: "325px", overflow: "hidden" }}
                >
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="trending-img-relative"
                    style={{
                      position: "relative",
                      height: "340px",
                      minWidth: "100%",
                    }}
                  />
                </div>
                <div
                  className="trending-img-absolute"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    right: 0,
                    zIndex: 7,
                    background:
                      "-moz-linear-gradient(top,rgba(255,255,255) 0%, rgba(0,0,0,0.83) 100%)",
                  }}
                ></div>
                <div
                  className="trending-img-absolute-1"
                  style={{
                    position: "absolute",
                    zIndex: 9,
                    bottom: 0,
                    width: "100%",
                    padding: "12px",
                  }}
                >
                  <span
                    style={{
                      //   paddingTop: "10px",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                    className="text-white"
                  >
                    {item.title}
                  </span>
                  <div
                    className="trending-meta-info"
                    style={{
                      textDecoration: "none",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
    </>
  );
};

export default Trendng;
