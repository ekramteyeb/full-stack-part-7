import React from 'react'
import PropTypes from 'prop-types'
import { Form,Button } from 'react-bootstrap'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div style={{ display:'inline-block' }}>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username :</Form.Label>
          <Form.Control type='text' name='username' value={username} onChange={handleUsernameChange}/>
          <Form.Control id='password' type='password' name='password' value={password} onChange={handlePasswordChange}/>
          <Button  id='login-button' variant='primary' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm