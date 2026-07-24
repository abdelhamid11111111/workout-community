import { render } from '@testing-library/react'
import { ChallengeCardSkeleton } from './LoadingState'

describe('ChallengeCardSkeleton', () => {
  it('renders a skeleton card', () => {
    const { container } = render(<ChallengeCardSkeleton index={1} />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })
})
