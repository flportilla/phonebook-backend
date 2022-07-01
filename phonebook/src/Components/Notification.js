import React from 'react'
import '../App.css'

export default function Notification({ modalNotification, notificationContent }) {

  switch (modalNotification) {
    case 'ADDING':
      return <div className='add'>{notificationContent}</div>
      break;
    case 'REMOVING':
      return <div className='remove'>{notificationContent}</div>
      break;
    case 'UPDATING':
      return <div className='update'>{notificationContent}</div>
      break;
    default: return <></>
      break;
  }

}
