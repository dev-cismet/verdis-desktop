/** @type { import('@storybook/react').Preview } */
import { ConfigProvider } from "antd";
import "tailwindcss/tailwind.css";
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "CommonComponents",
          "App",
          "Overview",
          ["Page", "Components"],
          "SealedSurfaces",
          ["Page", "Components"],
          "StreetCleaning",
          ["Page", "Components"],
          "GeneralInfo",
          ["Page", "Components"],
          "SeepagePermits",
          ["Page", "Components"],
          "Settings",
          ["Page", "Components"],
          "Chat",
          ["Page", "Components"],
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#E67843",
          },
        }}
      >
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default preview;
