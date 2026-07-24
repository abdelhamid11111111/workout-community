import { render, screen } from '@testing-library/react'
import Challenges from './page'

jest.mock('@/app/components/admin/challenges/Edit', () => ({
  __esModule: true,
  default: ({ categories, levels }: any) => <div>{categories.length}-{levels.length}</div>,
}))

describe('app/admin/challenges/[id]/page', () => {
  it('renders the edit page wrapper with enum props', () => {
    render(<Challenges />)

    expect(screen.getByText(/\d+-\d+/)).toBeInTheDocument()
  })
})
