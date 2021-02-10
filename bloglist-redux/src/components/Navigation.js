import React from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { userAssign } from '../reducers/userReducer'

const Navigator  = ({ blogs, users , home, currentUser,blog, user }) => {

  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div style={{ display:'inline' }}>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      <>
        {/*       <div style={{ color:'red', fontSize: 19 }}>{showError ? showError: ''}</div>
 */}      <p style={{ display:'inline' }}>{user.username} logged-in <button onClick={() => {
          dispatch(userAssign(null))
          window.localStorage.removeItem('loggedBlogappUser')
        }
        }>Logout</button></p>
      </>
      <Switch>
        <Route path="/blogs/:id">
          {blog}
        </Route>
        <Route path="/blogs">
          {blogs}
        </Route>
        <Route path="/users/:id">
          { currentUser }
        </Route>
        <Route path="/users">
          {users}
        </Route>
        <Route path="/">
          {home}
        </Route>
      </Switch>

    </Router>
  )
}
export default Navigator