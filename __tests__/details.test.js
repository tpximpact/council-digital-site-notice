import Details from "../src/components/details";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test("it should render correctly", () => {
    render(<Details summary="How to write good feedback"/>)
    expect(screen.getByRole('definition', {definition: "How to write good feedback"}))
})