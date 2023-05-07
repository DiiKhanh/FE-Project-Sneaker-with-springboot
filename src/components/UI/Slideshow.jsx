import React from "react";
import { Fade, Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import fadeImages from "../../assets/data/imgArr";

const Slideshow = ({ width }) => {
  return (
    <div className="slide-container">
      {width > 50 ? (
        <>
          <Fade duration={1000} arrows={false} autoplay={true} infinite={true}>
            {fadeImages.map((fadeImage, index) => (
              <div key={index} className="slide">
                <img
                  style={{
                    width: "65%",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                  }}
                  src={fadeImage.url}
                />
                <h4 className="slide-text">Cho đôi chân của bạn</h4>
              </div>
            ))}
          </Fade>
        </>
      ) : (
        <>
          <Zoom duration={1000} arrows={false} autoplay={true} infinite={true}>
            {fadeImages.map((fadeImage, index) => (
              <div key={index} className="slide">
                <img style={{ width: "30%" }} src={fadeImage.url} />
              </div>
            ))}
          </Zoom>
        </>
      )}
    </div>
  );
};
export default Slideshow;
