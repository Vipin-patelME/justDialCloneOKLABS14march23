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
      <Row style={{ padding: "20px" }}>
        <Col lg={5} style={{ padding: "0px", marginLeft:"50px", marginBottom: "20px", marginTop: "10px", marginRight:"10px" }}>
          <Carousel  style={{ padding: "0px" }} indicators={true} pause={false}>
            {mainSlider.map((cv, idx) => (
              <Carousel.Item
                key={idx}
                interval={1000}
              >
                <Link
                  to={`/business/categories/?category_name=${cv.categoryName}`}
                >
                    <img
                        height={200}
                        className="d-block w-100"
                        src={cv.imageUrl}
                        alt={cv.categoryName}
                    />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col style={{ marginBottom: "20px",backgroundColor:"blue", marginTop: "20px", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px", height:"200px", width:"100px", margin:"10px" }}>
            <img
                style={{ borderRadius: "20px" }}
                height={200}
                className="d-block w-100"
                src="https://akam.cdn.jdmagicbox.com/images/icons/website/newhome/1/b2b.png?v=1.01?w=1920&q=75"
                alt="image1"
            />
        </Col>
        <Col style={{ marginBottom: "20px",backgroundColor:"blue", marginTop: "20px", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px", height:"200px", width:"100px", margin:"10px" }}>
            <img
                style={{ borderRadius: "20px" }}
                height={200}
                className="d-block w-100"
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/web_repair_image.png?v=1.0?w=1920&q=75"
                alt="image2"
            />
        </Col>
        <Col style={{ marginBottom: "20px",backgroundColor:"blue", marginTop: "20px", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px", height:"200px", width:"100px", margin:"10px"  }}>
            <img
                style={{ borderRadius: "20px" }}
                className="d-block w-100"
                height={200}
                src="https://akam.cdn.jdmagicbox.com/images/icons/website/newhome/1/realestate.png?v=1.0?w=1920&q=75"
                alt="image3"
            />
        </Col>
        <Col style={{ marginBottom: "20px",backgroundColor:"blue", marginTop: "20px", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px", height:"200px", width:"100px", margin:"10px"  }}>
            <img
                style={{ borderRadius: "20px" }}
                className="d-block w-100"
                height={200}
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/web_doctor_image.png?v=1.0?w=1920&q=75"
                alt="image4"
            />  
        </Col>
      </Row>
  );
}

export default HomeMainSlider;
