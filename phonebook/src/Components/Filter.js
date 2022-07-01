import React from 'react'

function Filter({ onChange }) {
  return (
    <div>
      filter shown with:
      <input
        onChange={onChange}
      />
    </div>
  )
}

export default Filter