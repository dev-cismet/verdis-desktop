/** @type { import('@storybook/react').Preview } */
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
};

export default preview;
