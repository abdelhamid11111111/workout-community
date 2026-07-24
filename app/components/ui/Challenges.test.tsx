import { render, screen } from '@testing-library/react'
import Challenges from './Challenges'

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      data: [],
      pagination: { totalItems: 0, currentPage: 1 },
    }),
  }) as jest.Mock
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Challenges', () => {
  it('renders the challenge section', () => {
    render(
      <Challenges
        categories={['Cardio', 'Strength', 'Yoga']}
        levels={['beginner', 'intermediate', 'advanced']}
      />,
    )

    expect(screen.getByRole('heading', { name: /all challenges/i })).toBeInTheDocument()
  })
})

//  npx jest app/components/ui/Challenges.test.ts --coverage --collectCoverageFrom="app/components/ui/Challenges.ts"