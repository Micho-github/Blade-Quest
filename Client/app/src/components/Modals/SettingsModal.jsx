import React from 'react'
import './Styles.css'
import { IoMdClose } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
export default function SettingsModal({SetModalIsOpen}) {
  return (
<div className="modal-window">
  <div className='box-container'>
    <button title="Close"
    onClick={()=>SetModalIsOpen(false)}
    className="modal-close"><IoMdClose size={30}/></button>
    <div className='Title'><div><IoSettingsSharp /></div> <div>Settings Menu</div></div>
    <div className='divider'></div>
    <br />
    <h1>Music</h1>
    <h1>Theme</h1>
    <h1>Language</h1>
  </div>
</div>
  )
}
