import React from "react";
import Map from "../components/commons/Map";
import { Col, Row } from "antd";
import ChangeRequests from "../components/sealedSurfaces/ChangeRequests";
import Sums from "../components/sealedSurfaces/Sums";
import Areas from "../components/sealedSurfaces/Areas";

const Page = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const cardStyleArea = { width: "100%", height: height * 0.5 - 12 };
  const cardStyleSum = { width: "100%", height: height * 0.3 - 12 };
  const cardStyleChangeReq = { width: "100%", height: height * 0.2 };
  const mapHeight = height;

  return (
    <div style={{ ...storyStyle, width, height }}>
      <Row gutter={[12, 0]} style={{ height: "100%" }}>
        <Col span={6}>
          <Row gutter={[0, 12]}>
            <Areas
              width={cardStyleArea.width}
              height={cardStyleArea.height}
              style={cardStyleArea}
            />
          </Row>
          <Row gutter={[0, 12]}>
            <Sums
              width={cardStyleSum.width}
              height={cardStyleSum.height}
              style={{ ...cardStyleSum, marginTop: 12, marginBottom: 12 }}
            />
          </Row>
          <Row gutter={[0, 12]}>
            <ChangeRequests
              width={cardStyleChangeReq.width}
              height={cardStyleChangeReq.height}
              style={cardStyleChangeReq}
            />
          </Row>
        </Col>
        <Col span={18}>
          <Map width={"100%"} height={mapHeight} />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
