import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('Blog form post right info', () => {
  const mockAddBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={mockAddBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value : 'Testing Title' }
  })
  fireEvent.change(author, {
    target: { value : 'Testing Author' }
  })
  fireEvent.change(url, {
    target: { value : 'www.url.com' }
  })
  fireEvent.submit(form)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0].title).toBe('Testing Title')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('Testing Author')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('www.url.com')
})