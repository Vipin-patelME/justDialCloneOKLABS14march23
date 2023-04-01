import React, { useContext } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
//import { Rings } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import { searchContext } from "../Context";

function HomeMainSlider() {
  const { mainSlider } = useContext(searchContext);
  //const isLoading = false

  //console.log("mainslider----->", mainSlider);
  return (
    <Container  style={{ padding: "0px" }}>
      <Row style={{ padding: "0px", marginLeft: "-20px" }}>
        <Col style={{ padding: "0px" }}>
          <Carousel  style={{ padding: "0px" }} indicators={true} pause={false}>
            {mainSlider.map((cv, idx) => (
              <Carousel.Item
                key={idx}
                style={{ marginBottom: "20px", marginTop: "20px" }}
                interval={1000}
              >
                <Link
                  to={`/business/categories/?category_name=${cv.categoryName}`}
                >
                  <img
                    style={{ borderRadius: "20px" }}
                    width={1280}
                    height={330}
                    className="d-block w-100"
                    src={cv.imageUrl}
                    alt={cv.categoryName}
                  />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col>
          <h1>I am vipin</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeMainSlider;
