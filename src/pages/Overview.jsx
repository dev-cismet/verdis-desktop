import React from "react";
import Map from "../components/commons/Map";
import { Col, Row } from "antd";
import MockCard from "../components/mock/MockCard";
import General from "../components/overview/General";
import Statistics from "../components/overview/Statistics";
import CrossReferences from "../components/overview/CrossReferences";
import Sums from "../components/sealedSurfaces/Sums";
import Summary from "../components/overview/Summary";

const Page = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const firstColCardStyle = {
    width: "100%",
    height: height / 3 - 8,
  };
  const firstRowCardStyle = {
    width: "100%",
    height: height * 0.3 - 12,
  };
  const mapHeight = height * 0.7;

  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={[12, 0]} style={{ height: "100%" }}>
        <Col span={6}>
          <Row gutter={[0, 12]}>
            <General
              width={firstColCardStyle.width}
              height={firstColCardStyle.height}
              style={firstColCardStyle}
            />
          </Row>
          <Row gutter={[0, 12]}>
            <Sums
              width={firstColCardStyle.width}
              height={firstColCardStyle.height}
              style={{ ...firstColCardStyle, marginTop: 12, marginBottom: 12 }}
            />
          </Row>
          <Row gutter={[0, 12]}>
            <Summary
              width={firstColCardStyle.width}
              height={firstColCardStyle.height}
              style={firstColCardStyle}
            />
          </Row>
        </Col>
        <Col span={18}>
          <Row gutter={[12, 12]} style={{ height: "30%" }}>
            <Col span={12}>
              <Statistics
                width={firstRowCardStyle.width}
                height={firstRowCardStyle.height}
                style={firstRowCardStyle}
              />
            </Col>
            <Col span={12}>
              <CrossReferences
                width={firstRowCardStyle.width}
                height={firstRowCardStyle.height}
                style={firstRowCardStyle}
              />
            </Col>
          </Row>
          <Row style={{ height: "70%" }}>
            <Map width={"100%"} height={mapHeight} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Page;
