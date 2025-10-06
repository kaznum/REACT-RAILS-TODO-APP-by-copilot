import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Manual from './Manual'

describe('Manual', () => {
  it('renders manual page title', () => {
    render(<Manual />)
    expect(screen.getByText('ユーザーマニュアル')).toBeInTheDocument()
  })

  it('displays all main sections', () => {
    render(<Manual />)
    
    expect(screen.getByRole('heading', { name: /TODO管理アプリについて/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /はじめに/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /基本的な使い方/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /優先度について/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /フィルター機能/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /期限の表示について/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ログアウト/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ヒント/ })).toBeInTheDocument()
  })

  it('displays login instructions', () => {
    render(<Manual />)
    expect(screen.getByText(/Googleでログイン/)).toBeInTheDocument()
    expect(screen.getByText(/Googleアカウントで認証/)).toBeInTheDocument()
  })

  it('displays TODO management instructions', () => {
    render(<Manual />)
    expect(screen.getByRole('heading', { name: /TODOの追加/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /TODOの編集/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /TODOの削除/ })).toBeInTheDocument()
  })

  it('displays priority information', () => {
    render(<Manual />)
    expect(screen.getByText('高')).toBeInTheDocument()
    expect(screen.getByText('中')).toBeInTheDocument()
    expect(screen.getByText('低')).toBeInTheDocument()
  })

  it('displays filter feature information', () => {
    render(<Manual />)
    expect(screen.getByRole('heading', { name: /フィルター機能/ })).toBeInTheDocument()
    const filterTexts = screen.getAllByText(/優先度フィルター/)
    expect(filterTexts.length).toBeGreaterThan(0)
  })

  it('displays deadline display information', () => {
    render(<Manual />)
    expect(screen.getByRole('heading', { name: /期限の表示について/ })).toBeInTheDocument()
    expect(screen.getByText(/赤色太字/)).toBeInTheDocument()
    expect(screen.getByText(/オレンジ色太字/)).toBeInTheDocument()
  })
})
