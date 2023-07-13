import { Card, Row, Col } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";
import { FilePdfOutlined } from "@ant-design/icons";
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const mockExtractor = (input) => {
  return {
    status: "neue Nachricht",
    betroffeneFlaechenc: [
      { id: 9873, title: "A" },
      { id: 123, title: "C" },
      { id: 355, title: "3" },
    ],
  };
};
const ChangeRequests = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  const cardRef = useRef();
  const [dimensions, setDimensions] = useState({});
  const title = "Änderungsanfragen";
  useEffect(() => {
    if (cardRef.current) {
      setDimensions(cardRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <Card
      style={{ ...style, width, height }}
      ref={cardRef}
      title={
        <span>
          <FontAwesomeIcon icon={faBars} /> {title}
        </span>
      }
      size="small"
      hoverable={false}
      shadow={true}
    >
      <p>
        Status: <b>{data.status}</b>
      </p>
      <p>
        Betroffene Flächen:{" "}
        {data.betroffeneFlaechenc.map((flaeche, index) => {
          return (
            <span key={index}>
              {flaeche.title}
              {index < data.betroffeneFlaechenc.length - 1 && ", "}
            </span>
          );
        })}
      </p>
    </Card>
  );
};
export default ChangeRequests;

ChangeRequests.propTypes = {
  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,
  /**
   * The width of the component
   * @default 300
   * @type number
   * @required false
   * @control input
   * @group size
   *
   **/
  width: PropTypes.number,

  /**
   * The height of the component
   *
   * @default 200
   * @type number
   * @required false
   * @control input
   *
   **/

  height: PropTypes.number,

  /**
   * additional style of the component
   *
   * @type object
   * @required false
   * @control input
   * @group style
   *
   *
   * */
  style: PropTypes.object,
};
