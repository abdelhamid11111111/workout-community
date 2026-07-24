import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyChallenges } from './EmptyState'

describe('EmptyChallenges', () => {
  it('renders empty copy and calls onClear on button click', async () => {
    const onClear = jest.fn()
    render(<EmptyChallenges onClear={onClear} />)

    expect(screen.getByText('No challenges found')).toBeInTheDocument()
    
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(onClear).toHaveBeenCalled()
  })
})
