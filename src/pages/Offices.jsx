import React from "react";
import Map from "../components/commons/Map";
import { Col, Row } from "antd";
import MockCard from "../components/mock/MockCard";
const Offices = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }
  const firstRowStyle = { width: "100%", height: height * 0.6 - 12 };
  const secondRowStyle = { width: "100%", height: height * 0.4 - 12 };
  const gutterStyle = [12, 12];
  const marginBottomStyle = { marginBottom: "12px" };

  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={gutterStyle} style={{ height: "60%", ...marginBottomStyle }}>
        <Col span={8}>
          <MockCard style={firstRowStyle} title="Agencies" />
        </Col>
        <Col span={16}>
          <Map width={"100%"} height={firstRowStyle.height} />
        </Col>
      </Row>

      <Row gutter={gutterStyle} style={{ height: "40%" }}>
        <Col span={8}>
          <MockCard style={secondRowStyle} title="Additional Role" />
        </Col>
        <Col span={8}>
          <MockCard style={secondRowStyle} title="Streetfronts" />
        </Col>
        <Col span={8}>
          <MockCard style={secondRowStyle} title="Notes" />
        </Col>
      </Row>
    </div>
  );
};

export default Offices;
