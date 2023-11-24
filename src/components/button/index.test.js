import Button from ".";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test("it should render correctly", () => {
    render(<Button content="Next test"/>)
    expect(screen.getByText('Next test'))
})