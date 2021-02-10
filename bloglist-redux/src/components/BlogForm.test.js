import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of blog forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'Ahmed' }
  })
  fireEvent.change(url, {
    target: { value: 'www.ahmedreem.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of blog forms could be easier' )
  expect(createBlog.mock.calls[0][0].author).toBe('Ahmed' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.ahmedreem.com' )
})