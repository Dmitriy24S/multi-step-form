import type { Meta, StoryObj } from '@storybook/react'

import { Button, FormNavigationButtonContainer } from './Button'
// import { DefaultButton } from './Button.stories'
// import Button from './Button.stories'
// import * as Button from './Button.stories'

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof FormNavigationButtonContainer> = {
  component: FormNavigationButtonContainer,
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
}

export default meta
type Story = StoryObj<typeof FormNavigationButtonContainer>

export const Default: Story = {
  render: (args) => (
    <FormNavigationButtonContainer {...args}>
      <Button>Back</Button>
      <Button>Next</Button>
    </FormNavigationButtonContainer>
  ),
}

// export const Default: Story = (args) => (
//   <FormNavigationButtonContainer {...args}>
//     <DefaultButton {...DefaultButton.args} />
//   </FormNavigationButtonContainer>
// );

// export const Default = () => (
//   <FormNavigationButtonContainer>
//     <Button>Back</Button>
//     <Button>Next</Button>
//   </FormNavigationButtonContainer>
// )

// export const Default: Story = {
//   args: {
//     children: <DefaultButton {...DefaultButton.args} />,
//     children: [{ ...Button.DefaultButton.args }],
//   },
// }

// export const Default = {
//   args: {
//     children: [
//       { ...Button.DefaultButton.args },
//       { ...Button.DefaultButton.args },
//     ],
//   },
// }
