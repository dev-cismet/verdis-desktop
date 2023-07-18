import { withDesign } from "storybook-addon-designs";
import NavBar from "../../components/commons/NavBar";
import design from "../assets/commons/Map.png";

export default {
  title: "CommonComponents/NavBar",
  component: NavBar,
  decorators: [withDesign],
};

export const Mockup = {
  args: {},
};
export const M = {
  args: { width: 1440, height: 73 },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

export const L = {
  args: { width: 1600, height: 73 },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

export const XL = {
  args: { width: 1920, height: 73 },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

export const S = {
  args: { width: 1024, height: 73 },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
