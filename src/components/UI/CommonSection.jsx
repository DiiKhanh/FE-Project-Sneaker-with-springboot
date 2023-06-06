import React from "react";
import { Container, UncontrolledCarousel } from "reactstrap";
import "../../styles/common-section.css";
import sale from "../../assets/images/sale.png";
import sale1 from "../../assets/images/sale1.jpg";
import sale2 from "../../assets/images/sale2.jpg";

const CommonSection = ({ title }) => {
  return (
    <>
      <section className="common__section">
        <Container>
          <UncontrolledCarousel
            style={{
              height: "600px",
            }}
            items={[
              {
                key: 1,
                src: sale1,
              },
              {
                key: 2,
                src: sale,
              },
              {
                key: 3,
                src: sale2,
              },
            ]}
          />
        </Container>
      </section>
    </>
  );
};

export default CommonSection;
