import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
  // parameters: {
  //   docs: {
  //     source: { type: 'code' },
  //   },
  // },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const DefaultButton: Story = {
  args: {
    //👇 The args you need here will depend on your component
    // label: 'Click',
    // background: 'red'
    $sm: false,
    children: 'Click me',
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
}

export const SmallButton: Story = {
  args: {
    $sm: true,
    children: 'Click me',
  },
}
