/** @type { import('@storybook/react').Preview } */
import "../src/app/ui/globals.css"; // Here!
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
