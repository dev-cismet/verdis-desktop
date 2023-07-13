import React from "react";
import { Row, Col } from "antd";
import MockSpace from "../components/mock/MockSpace";

const menuWidth = 260;
const footerHeight = 42;
const toolbarHeight = 70;
const gutter = 12;

const MainLayout = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px",
      borderColor: "#ddd",
      padding: "10px",
    };
  }

  const adjustedMenuWidth = menuWidth - gutter;
  const adjustedToolbarHeight = toolbarHeight - gutter;
  const adjustedFooterHeight = footerHeight - gutter;

  return (
    <div
      style={{
        ...storyStyle,
        width,
        height,
        display: "flex",
        flexDirection: "column",
        padding: gutter,
      }}
    >
      <Row
        style={{
          height: `${adjustedToolbarHeight}px`,
          marginBottom: `${gutter}px`,
        }}
      >
        <Col span={24}>
          <MockSpace title="Toolbar" />
        </Col>
      </Row>
      <Row
        style={{ flexGrow: 1, display: "flex", marginBottom: `${gutter}px` }}
      >
        <Col style={{ flexGrow: 1 }}>
          <MockSpace title="Page Content" />
        </Col>
      </Row>
      <Row style={{ height: `${adjustedFooterHeight}px` }}>
        <Col span={24}>
          <MockSpace title="Status Bar" />
        </Col>
      </Row>
    </div>
  );
};

export default MainLayout;
