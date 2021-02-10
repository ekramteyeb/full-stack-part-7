import React from 'react'
import { useSelector } from 'react-redux'

// eslint-disable-next-line no-unused-vars
const Notification = () => {

  const style = {

    backgroundColor: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10

  }
  const notification = useSelector(state => state.notification.notification)
  const notifyColor = useSelector(state => state.notification.color)

  if(!notification){
    style.display = 'none'
  }else{
    notifyColor ? style.color = 'green' : style.color = 'red'
    style.display = 'block'
  }
  return(
    <div  style={style}>
      {notification}
    </div>
  )
}


export default Notification