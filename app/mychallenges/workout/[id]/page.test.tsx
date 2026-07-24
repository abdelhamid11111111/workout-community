import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SubmitRoutine from './page'

const push = jest.fn()
const back = jest.fn()

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'c1' }),
  useRouter: () => ({ push, back }),
}))

describe('app/mychallenges/workout/[id]/page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }) as any
  })

  it('lets a user submit a workout and then navigates back to my challenges', async () => {
    const user = userEvent.setup()
    render(<SubmitRoutine />)

    await user.type(screen.getByPlaceholderText('e.g., 45'), '45')
    await user.type(screen.getByPlaceholderText('e.g., 350'), '250')
    await user.click(screen.getByText('Medium'))
    await user.click(screen.getByText('Good'))
    await user.click(screen.getByRole('button', { name: /submit workout/i }))

    expect(global.fetch).toHaveBeenCalledWith('/api/workout/c1', expect.objectContaining({ method: 'POST' }))
    expect(push).toHaveBeenCalledWith('/mychallenges')
  })
})
