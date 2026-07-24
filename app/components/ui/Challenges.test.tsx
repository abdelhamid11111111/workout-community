import { render, screen } from '@testing-library/react'
import Challenges from './Challenges'

describe('Challenges', () => {
  it('renders the challenge section', () => {
    render(<Challenges categories={['Cardio', 'Strength', 'Yoga']} />)

    expect(screen.getByText(/challenge/i)).toBeInTheDocument()
  })
})
