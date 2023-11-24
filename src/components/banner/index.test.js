import Banner from ".";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test("it should render correctly", () => {
    render(<Banner />)
    expect(screen.getByRole('link', {name: 'feedback'}))
})