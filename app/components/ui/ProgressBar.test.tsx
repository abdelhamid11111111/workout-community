import { render, screen } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('clamps values outside 0-100 and renders the label', () => {
    render(<ProgressBar progress={150} showLabel color="bg-emerald-600" />)

    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('renders a safe zero-width bar for negative input', () => {
    render(<ProgressBar progress={-20} showLabel />)

    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
