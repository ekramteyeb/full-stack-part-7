/* eslint-disable eqeqeq *//* eslint-disable linebreak-style */
import React, { useState,useEffect } from 'react'
import  { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
//import Togglable from './Togglable'
//import loginService from '../services/login'
import { vote, deleteBlog, initializeBlogs, addComment } from '../reducers/blogReducer'
import { deleteUserBlog } from '../reducers/userReducer'
import { setNotification, setColor } from '../reducers/notificationReducer'
//import { assignBlog, vote } from '../reducers/blogReducer'

export const Blog = () => {

  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {

    dispatch(initializeBlogs())

  },[])
  const blogs = useSelector(state => state.blogs.blogs)

  const id = useParams().id
  const user = useSelector(state => state.user.user)



  const blog = blogs.find(blog => blog.id == id)

  const userBlogs = blogs.filter(blog => blog.user.username === user.username).map(blog => blog.id)

  const displayDeleteBtn =  (userBlogs.length > 0 && userBlogs.includes(blog.id)) ? 'block' : 'none'

  if(!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a  href={blog.url}>{blog.url}</a>
      <br/><br/>
      <span className='likesCount' >{blog.likes.length === null ? 0 : blog.likes.length} </span>

      <Button className='likes' onClick={() => dispatch(vote(blog.id, user))}
        style={{ fontSize:10, borderRadius:'1em' }}>{ user ? blog.likes.includes( user.username ) ? 'unlike':'like' : ''}
      </Button>
      <br/><br/>
      added by {blog.author}
      <br/>
      <Link to='/blogs'>
        <Button id='deleteButton' variant='danger' onClick={() => {
          const blogToDelete = blogs.find(n => n.id === blog.id)

          const confirm = window.confirm(`Remove blog ? ${blogToDelete.title} by ${blogToDelete.author}`)

          if(confirm){
            dispatch(setColor(true))
            //deletes the deleted blog's id in the the person's blogs list.
            dispatch(deleteUserBlog(user, id))
            dispatch(deleteBlog(blog.id))
            dispatch(setNotification('Blog deleted successfully', 3))
          }
        }}
        style={{ fontSize:10,backgroundColor:'#6595ED', margin:5,display:`${displayDeleteBtn}` }}>
        remove
        </Button>
      </Link>

      <h4>Comments</h4>
      <p style={{ color:'red' }} >{error}</p>
      <input type='text' value={comment} onChange={(e) => setComment(e.target.value) }/> <button onClick={() => {

        comment ? dispatch(addComment(id, comment)) : setError('Enter comment')
        setComment('')
        setTimeout(() => {setError('')}, 1000)
      }}>add comment</button>
      <ul>
        { blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

const Blogs = () => {

  //const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.blogs)
  //const [userBlogs, setUserBlogs] = useState([])
  //const [currentBlog, setCurrentBlog] = useState('')
  //const [liked, setLiked] = useState('false')
  // const user = useSelector(state => state.user)
  //const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom:5,
    border: 'solid green 1px',
    borderWidth: 1,
    marginBottom: 5,
    marginTop:5,
    borderRadius:'0.5em'
  }
  if(!blogs){
    return null
  }

  return (
    <div >
      {/*blogs sorted decending order by likes first and listed   */
        blogs.sort((a,b) => {
          if(a.likes.length > b.likes.length) return -1
          if(a.likes.length < b.likes.length) return 1
          return 0
        }).map(blog => {
          return(
            <div key={blog.id} className="blog" style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>


            </div>
          )
        })
      }
    </div>
  )
}


export default Blogs
