import { render, screen } from '@testing-library/react'
import Page from './page'

jest.mock('@/app/components/admin/challenges/New', () => ({
  __esModule: true,
  default: ({ categories, levels }: any) => <div>{categories.length}-{levels.length}</div>,
}))

describe('app/admin/challenges/new/page', () => {
  it('renders the NewChallengePage wrapper with enum props', () => {
    render(<Page />)

    expect(screen.getByText(/\d+-\d+/)).toBeInTheDocument()
  })
})
