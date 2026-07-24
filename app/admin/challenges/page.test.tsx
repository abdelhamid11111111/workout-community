import { render, screen } from '@testing-library/react'
import Challenges from './page'

jest.mock('@/app/components/admin/challenges/Challenges', () => ({
  __esModule: true,
  default: ({ categories, levels }: any) => <div>{categories.length}-{levels.length}</div>,
}))

describe('app/admin/challenges/page', () => {
  it('passes the enum values down to the challenges page component', () => {
    render(<Challenges />)

    expect(screen.getByText(/\d+-\d+/)).toBeInTheDocument()
  })
})
