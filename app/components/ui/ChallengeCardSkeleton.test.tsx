import { render } from '@testing-library/react'
import ChallengeCardSkeleton from './ChallengeCardSkeleton'

describe('ChallengeCardSkeleton', () => {
  it('renders a loading skeleton placeholder', () => {
    const { container } = render(<ChallengeCardSkeleton />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
