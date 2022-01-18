import React from 'react'
import { useParams } from 'react-router-dom'

const InFolder = () => {
  const {id} = useParams()
  return (
    <div>
      <p>{id}</p>
      InFolder
    </div>
  )
}

export default InFolder
