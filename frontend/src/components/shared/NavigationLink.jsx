import React from 'react'
import {Link} from 'react-router-dom'
export default function NavigationLink({to,text,onClick}) {
  return (
    <Link onClick={onClick} to={to}>
      {text}
    </Link>
  )
}
