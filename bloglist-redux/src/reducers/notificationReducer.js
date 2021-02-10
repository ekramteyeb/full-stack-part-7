const initialState = {
  notification:'',
  color:false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
  case 'NEW_NOTIFICATION':
    return { ...state,notification:action.content }
  case 'REMOVE_NOTIFICATION':
    return { ...state,notification:action.content }
  case 'SUCCESS':
    return { ...state, color:action.color }
  default:
    return state
  }

}
const timeOuts = []

//action creator
export const setNotification = (content, time, ) => {
  return async dispatch => {
    dispatch({
      type:'NEW_NOTIFICATION',
      content
    })
    let timeIlapsed = setTimeout(() => {
      dispatch({
        type:'REMOVE_NOTIFICATION',
        content: ''
      })
    }, time * 1000)

    timeOuts.push(timeIlapsed)

    for (let index = 0; index < timeOuts.length - 1; index++) {
      clearTimeout(timeOuts[index])
    }

  }
}
export const setColor = (color) => {
  return async dispatch => {
    dispatch({
      type:'SUCCESS',
      color:color
    })
  }
}
export default notificationReducer