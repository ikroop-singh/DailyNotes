import React  from 'react'
import Note from './Note'
export default function Home(props) {

  return (
    <div>
      <Note alertHandler={props.alertHandler}/>
    </div>
  )
}
