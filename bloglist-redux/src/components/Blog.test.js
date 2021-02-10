import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
//import Togglable from './Togglable'



test('renders title and author only', () => {
  const blog = {
    title: 'CSS beautifies website',
    author: 'Hachalu',
    likes: [],
    url:'www.html.com',
    user:'mohema',

  }
  const component = render(
    <Blog blog={blog } />
  )
  const div = component.container.querySelector('.togglableDiv')

  expect(div).toHaveStyle('display: none')
  //const div = component.container.querySelector('.blog')
  expect(component.container).toHaveTextContent(
    'CSS beautifies website by Hachalu'
  )
})

test('renders url, likes (details) when view button clicked', () => {
  const blog = {
    title: 'CSS beautifies website',
    author: 'Hachalu',
    likes: [],
    url:'www.html.com',
    user:'mohema',

  }
  const component = render(
    <Blog blog={blog } />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  const div = component.container.querySelector('.togglableDiv')

  expect(div).toHaveStyle('display: block')
  //const div = component.container.querySelector('.blog')
  expect(component.container).toHaveTextContent(
    'www.html.com 0'
  )
})

test('clicking the likes button twice  calls event handler twice', () => {

  const blog = {
    title: 'CSS beautifies website',
    author: 'Hachalu',
    likes: [],
    url:'www.html.com',
    user:'mohema',

  }

  const mockHandler = jest.fn()
  //const mockHandler1 = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikes={mockHandler} isItLiked='likes' />
  )
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('likes')
  //const unlikeButton = component.getByText('unlike')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
  expect(component.container).toHaveTextContent(
    '0'
  )
  //expect(mockHandler1.mock.calls).toHaveLength(1)
})
