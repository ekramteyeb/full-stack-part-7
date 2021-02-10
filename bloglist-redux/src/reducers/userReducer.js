import userService from '../services/users'

const initialState = {
  user:null,
  users:[]
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {
  case 'SET_USER':
    return { ...state, user:action.data }
  case 'INIT_USERS':
    return { ...state, users:action.data }
  case 'DELETE_BLOG':
    return { ...state, users:action.data }
  default:
    return state
  }
}

export const userAssign = user => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data:user,
    })
  }
}
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}
export const deleteUserBlog = (user,blogId ) => {
  return async dispatch => {
    const users = await userService.getAll()
    const currentUser = users.find(u => u.username === user.username)
    console.log('current user', currentUser.id)

    const changedUser = { ...currentUser, blogs: currentUser.blogs.filter(blog => blog.id !== blogId) }

    await userService.update(currentUser.id , changedUser)
    const updatedUsers = users.map(user => user.id === changedUser.id ? changedUser : user)
    dispatch({
      type: 'DELETE_BLOG',
      data: updatedUsers
    })
  }
}
/* export const initializeUserBlogs = (user) => {
  return async dispatch => {
    const users = await loginService.getAll()
    if(user !== null) {
      const currentUser = users.filter(u => u.username === user.username)
      const userBlogs = currentUser
      dispatch({
        type: 'USER_BLOGS',
        data: userBlogs
      })
    }
  }
} */

export default userReducer