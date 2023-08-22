import React from 'react'
import { render, screen } from '@testing-library/react'
import { HelloWorld } from '../../components/HelloWorld.jsx'
import '@testing-library/jest-dom/extend-expect'
export const helloWorldSteps = ({
given: Given,
and: And,
when: When,
then: Then
}) => {
    Given(/^Hello World$/, () => {
        render(<HelloWorld/>)
    })
    Then(/^I should see "([^"]*)"$/, (text) => {
        const helloWorld = screen.getByTestId('helloWorldS')
        expect(helloWorld).toHaveTextContent(text)
    })
}
export default helloWorldSteps