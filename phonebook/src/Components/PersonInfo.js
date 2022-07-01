import React from 'react'

function PersonInfo({ list, deleteContact, modalNotification }) {


  let buttonStatus =
    modalNotification == 'ADDING'
      ? true
      : modalNotification == 'UPDATING'
        ? true
        : modalNotification == 'REMOVING'
          ? true
          : false


  return (
    <>
      {
        list.map(person => {
          return <li
            className='note'
            key={person.id}>
            {person.name} - {person.number}
            <button
              id={person.id}
              onClick={deleteContact}
              type='button'
              disabled={buttonStatus}
            >
              delete
            </button>
          </li >
        })
      }
    </>
  )
}

export default PersonInfo