import React, { useState, useEffect,useRef } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Blogs, { Blog } from './components/Blogs'
//import { Blog } from './components/Blogs'
import User from './components/User'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
//import Footer from './components/Footer'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { userAssign, initializeUsers } from './reducers/userReducer'
import  Navigator  from './components/Navigation'


const App = () => {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [style, setStyle] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const users = useSelector(state => state.user.users)

  useEffect(() => {
    if(user !== null){
      dispatch(initializeBlogs())
    }
  }, [user])

  useEffect(() => {

    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userAssign(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      //to log out from local storage type in browser
      //window.localStorage.removeItem('loggedblogappUser')
      //window.localStorage.clear()

      blogService.setToken(user.token)
      dispatch(userAssign(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 3))
      setStyle(false)
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }
  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' buttonExit='cancel'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  const blogForm = () => {

    return (
      <Togglable buttonLabel='new blog' buttonExit='cancel' ref={blogFormRef}>
        <BlogForm  />
      </Togglable>
    )
  }

  if(user === null){
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification   notifyColor={style}  />
        {loginForm()}

      </div>
    )
  }

  return (
    <div className='container'>
      <>
      </>
      <Navigator
        user={user}
        blogs={
          <>
            <h2>Blogs lists : </h2>
            <Notification   notifyColor={style} />
            {blogForm()}
            <Blogs />
          </>
        }
        home={
          <>
            <h1>This is bloglist -redux app page</h1>
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </>
        }
        users={
          <>
            <h4>Users</h4>
            <Table striped bordered hover style={{ listStyle:'none' }}>
              <thead>
                <tr>
                  <th></th><th>Blogs created</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  return <tr key={user.id} ><td ><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>
                })}
              </tbody>
            </Table>
          </>
        }
        currentUser={
          <User />
        }
        blog={
          <Blog />
        }
      />
    </div>
  )
}

export default App