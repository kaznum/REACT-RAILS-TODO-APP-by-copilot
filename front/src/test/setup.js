import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// クリーンアップをテスト後に実行
afterEach(() => {
  cleanup()
})
