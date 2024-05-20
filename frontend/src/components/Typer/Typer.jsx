import React from 'react'
import {TypeAnimation} from 'react-type-animation'

export default function Typer() {
  return (
<TypeAnimation
  sequence={[
    'Chat With Your Own AI',
    1000,
    'Built With Open AI 😎',
    1000,
    'Your Own Customized ChatGPT 👀',
    1000,
  ]}
  speed={50}
  style={{ fontSize: '60px', color:'white', display:"inline-block", textShadow: '2px 2px 20px #000'}}
  repeat={Infinity}
/>
  )
}
