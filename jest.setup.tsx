import '@testing-library/jest-dom'
import React from 'react'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt = '', ...rest } = props
    return <img alt={alt} {...rest} />
  },
}))

jest.mock('framer-motion', () => {
  const React = require('react')
  const passthrough = (Tag: string) =>
    React.forwardRef((props: any, ref: any) => {
      const { children, initial, animate, exit, transition, whileHover, whileTap, ...rest } = props
      return React.createElement(Tag, { ...rest, ref }, children)
    })

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) => passthrough(tag),
      },
    ),
    AnimatePresence: ({ children }: any) => children,
  }
})

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: jest.fn(),
  }),
}))

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }

  const params = {}
  const searchParams = new URLSearchParams()

  return {
    useRouter: () => router,
    useParams: () => params,
    useSearchParams: () => searchParams,
    usePathname: () => '/',
  }
})
