import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const User = () => {

  const users = useSelector(state => state.user.users)
  const blogs = useSelector(state => state.blogs.blogs)
  const id = useParams().id
  const currentUser = users.find(u => u.id === id)
  if(!currentUser){
    return null
  }
  return (
    <>
      <h4>{ currentUser.username }</h4>
      <h5>Added Blogs</h5>
      <button>Click me</button>
      <ul>
        {
          users.length === 0 ? '' :
            blogs.filter(b => b.user.username === currentUser.username).map(blog => {
              return <li key={blog.id}>{blog.title} by {blog.author}</li>
            })
        }
      </ul>
    </>
  )
}

export default User
