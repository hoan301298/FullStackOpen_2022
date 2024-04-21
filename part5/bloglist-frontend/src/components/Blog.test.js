import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import Blog from './Blog'

describe('Frontend test', () => {
  let component, mockUpdate, mockDelete

  beforeEach(() => {
    let blog = {
      title: 'Testing this',
      author: 'KuroKousuii',
      url: 'www.test.com',
      likes: 69,
      user: {
        username: 'username1'
      }
    }
    let currentUser = {
      username: 'username1'
    }
    mockUpdate = jest.fn()
    mockDelete = jest.fn()
    component = render(
      <Togglable buttonLabel='show....' cancelLabel='cancel'>
        <Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDelete} currentUser={currentUser}/>
      </Togglable>
    )
  })

  test('It shows title and author by default', () => {
    const check = component.getByText('Testing this by KuroKousuii')
    expect(check).toBeDefined()
  })

  test('It shows url and likes when clicked', () => {
    const show = component.getByText('show....')
    fireEvent.click(show)
    const togg = component.container.querySelector('.togglableContent')
    expect(togg).toHaveTextContent('www.test.com')
    expect(togg).toHaveTextContent('69')
  })

  test('like button clicked twice', () => {
    const show = component.getByText('show....')
    fireEvent.click(show)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})