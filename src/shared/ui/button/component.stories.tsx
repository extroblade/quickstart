import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./component";

const meta: Meta<typeof Button> = {
  title: "ui/button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};
