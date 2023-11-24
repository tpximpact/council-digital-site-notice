import Checkbox from ".";
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

test("it should render correctly", () => {
    render(<Checkbox label="House" onChange={(e) => {}}/>)
    const checkbox = screen.getByTestId('checkbox')
    fireEvent.click(checkbox)
    expect(screen.getByText('House'))
    expect(screen.getByRole('checkbox', {checked: true}))
})