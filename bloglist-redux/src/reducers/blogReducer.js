/* eslint-disable no-case-declarations */
//import { useSelector } from 'react-redux'
import blogService from '../services/blogs'
//import { setNotification } from './notificationReducer'

const  initialState = {
  blogs : [],
  blog :  null

}

const blogReducer = (state = initialState, action) => {

  switch (action.type){
  case 'NEW_BLOG':
    return { ...state,blogs:[...state.blogs,action.data] }
  case 'INIT_BLOGS':
    return { ...state , blogs:[...action.data] }
  case 'REMOVE' :
    return { ...state,blog:null, blogs:state.blogs.filter(blog => blog.id !== action.data.id) }
  case 'CURRENT_BLOG':
    return { ...state,blog : state.blogs.find(blog => blog.id === action.data.id) }
  case 'VOTE':
    return { ...action.data }
  case 'ADD_COMMENT':
    return { ...action.data }
  default:
    return state
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const allblogs = await blogService.getAll()
    const blogToChange = allblogs.find(n => n.id === id)
    const changedBlog = { ...blogToChange, comments: blogToChange.comments.concat(comment) }
    console.log(changedBlog)
    await blogService.update(id,changedBlog)

    const allChanged = allblogs.map(blog => blog.id === id ? changedBlog : blog)

    dispatch({
      type:'ADD_COMMENT',
      data: {
        id: id,
        blogs:allChanged,
        blog: changedBlog
      }
    })
  }
}

export const vote = (id,user) => {

  return async dispatch => {
    const allblogs = await blogService.getAll()
    const blogToChange = allblogs.find(n => n.id === id)

    const isLiked = blogToChange.likes.includes(user.username)

    let changedBlog = isLiked ?
      { ...blogToChange,likes:blogToChange.likes.filter(name => name !== user.username) } :
      { ...blogToChange , likes:[...blogToChange.likes, user.username] }

    await blogService.update(id, changedBlog)

    const allChanged = allblogs.map(blog => blog.id === id ? changedBlog : blog)

    dispatch({
      type:'VOTE',
      data: {
        id: id,
        blogs:allChanged,
        blog: changedBlog
      }
    })

  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type:'REMOVE',
      data:{ id }
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type:'NEW_BLOG',
      data: newBlog
    })
  }
}
export const assignBlog = ( id ) => {
  return async dispatch => {
    dispatch({
      type: 'CURRENT_BLOG',
      data: { id }
    })
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })

  }
}

export default blogReducer