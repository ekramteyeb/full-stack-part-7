import React,{ useState } from 'react'
import { Form ,Button } from 'react-bootstrap'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification, setColor } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    if(!title || !author || !url ){
      dispatch(setNotification('All filled should be filled', 1))
      dispatch(setColor(false))
      return
    }
    //prevents form submiting usual action like page load
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(createBlog(blogObject))
    dispatch(setNotification('created successfully', 3))
    dispatch(setColor(true))
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  return (
    <div style={{ display:'inline-block' }}>
      <h3>Create new </h3>
      <Form onSubmit={addBlog}>
        <Form.Group>

          <Form.Label>Title :</Form.Label>
          <Form.Control type='text' name='title' value={title} onChange={ event => { setTitle(event.target.value)}} />
          <Form.Label>Author :</Form.Label>
          <Form.Control type='text' id='author' value={author} onChange={ event => { setAuthor(event.target.value)}}/>
          <Form.Label>Url :</Form.Label>
          <Form.Control type='url' id='url' value={url} onChange={ event => { setUrl(event.target.value)}}/>

          <Button  variant='primary' id='create-blog' type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>

  )
}
export default BlogForm


