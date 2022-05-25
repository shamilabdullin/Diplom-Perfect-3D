import React from 'react'
import { useState, useEffect } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export function ColorSwitcher({ color, colorSwitcher }) {

  return (
    <div className='choose-model'>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label"></InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={color}
        label="Age"
        onChange={colorSwitcher}
      >
        <MenuItem value='black'>Black</MenuItem>
        <MenuItem value='green'>Green</MenuItem>
        <MenuItem value='red'>Red</MenuItem>
        <MenuItem value='blue'>Blue</MenuItem>
      </Select>
    </FormControl>
  </div>
  )
}
