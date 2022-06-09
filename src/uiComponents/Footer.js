import React from 'react'
import './footer.css'
import Button from '@mui/material/Button';
import logo from '../logo.png'

export function Footer({ download, displayInfo }) {
  return (
    <div className='footer'>
      <div className='logo'><img src={logo} width="80" height="80"></img></div>
        <div className='button-download-scene button button-group'>
          <Button variant='contained' onClick={download}>Сохранить сцену</Button>
          <Button variant='contained' onClick={displayInfo}>Инспектор сцены</Button>
        </div>
    </div>
  )
}
