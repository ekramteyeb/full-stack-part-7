import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props,ref) => {
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{ display:'inline-block' }}>
      <div style={showWhenVisible}>
        <Button  onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={hideWhenVisible}>
        {props.children}
        <Button variant='danger' onClick={toggleVisibility}>{props.buttonExit}</Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable