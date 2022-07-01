import React from 'react'

function Form({ addPerson, getName, getNumber, newName, newNumber, modalNotification }) {

  let buttonStatus = modalNotification == 'ADDING' ? true : false

  return (
    <form>
      <div key={'name'}>
        name:
        <input
          value={newName}
          onChange={getName}
        />
      </div>
      <div key={'number'}>
        number:
        <input
          value={newNumber}
          onChange={getNumber}
        />
      </div>
      <div key={'add'}>
        <button
          type="submit"
          onClick={addPerson}
          disabled={buttonStatus}
        >
          add</button>
      </div>
    </form>

  )
}

export default Form