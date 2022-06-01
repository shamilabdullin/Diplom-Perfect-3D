import React, { useState } from 'react'
import './instrumentPanel.css'
import { ColorSwitcher } from './ColorSwitcher';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';

export default function InstrumentPanel({ 
    coloredLines, 
    handleColoredLines, 
    currentColor, 
    handleCurrentColor, 
    handleTextured,
    currentModel, 
    handleCurrentModel, 
    handleGrid, 
    handleBackground, 
    handleCube,
    handleFps,
    background, 
    cube,
    showFps,
    grid,
    showVertex,
    handleVertex,
    coloredEdges,
    handleColoredEdges
}) {

    const [instrumentPanelOpen, setinstrumentPanelOpen] = useState(true)

    function handleinstrumentPanelOpen() {
        setinstrumentPanelOpen((prev) => {return !prev})
    }

  return (
    <div className='instruments'>
    <div className='instruments-title'>
        Панель инструментов
        <div className='instruments-close' onClick={handleinstrumentPanelOpen}>
            <ClearIcon />
        </div>
    </div>
    {instrumentPanelOpen ? 
        <div className='instruments-body'>

            <div className='instruments-body-title-1'>
                Редактор модели
            </div>

            <div className='instruments-body-item'>
                { coloredLines ? 
                <div className='button-coloring-edges'>
                    <Button variant='contained' onClick={handleColoredLines}>Не подсвещать текстуры</Button> 
                    {/* <ColorSwitcher color={currentColor} colorSwitcher={handleCurrentColor}/> */}
                </div> : 
                <div className='button-coloring-edges'>
                    <Button variant='contained' onClick={handleColoredLines}>Подсветить текстуры</Button>
                </div>
                }
            </div>
        
            <div className='instruments-body-item'>
                <div className='button-switching-vertex'>
                    {showVertex ?
                        <Button variant='contained' onClick={handleVertex}>Не Подсвещать вершины</Button> :
                        <Button variant='contained' onClick={handleVertex}>Подсветить вершины</Button>   
                    }
                </div>
            </div>

            <div className='instruments-body-item'>
                <div className='button-switching-coloredEdges'>
                    {coloredEdges ?
                        <Button variant='contained' onClick={handleColoredEdges}>Не подсвещать ребра</Button> :
                        <Button variant='contained' onClick={handleColoredEdges}>Подсветить ребра</Button>   
                    }
                </div>
            </div>

            <div className='instruments-body-item'>
                <div className='button-switching-textures button'>
                <Button variant='contained' onClick={handleTextured}>Убрать текстуры</Button>
                </div>
            </div>
        
            {/* <div className='instruments-body-item'>
                <div className='button-switching-model'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentModel}
                    label="Age"
                    onChange={handleCurrentModel}
                    >
                    <MenuItem value='shoe-draco.glb'>Shoe</MenuItem>
                    <MenuItem value='mac-draco.glb'>Mac</MenuItem>
                    <MenuItem value='headless.glb'>Headless</MenuItem>
                    <MenuItem value='lambo.glb'>Car</MenuItem>
                    </Select>
                </FormControl>
                </div>
            </div> */}

            <div className='instruments-body-title-2'>
                Редактор сцены
            </div>
        
            <div className='instruments-body-item'>
                <div className='button-switcging-grid'>
                    {grid ?
                        <Button variant='contained' onClick={handleGrid}>Выключить сетку</Button> :
                        <Button variant='contained' onClick={handleGrid}>Включить сетку</Button>   
                    }
                </div>
            </div>
        
            <div className='instruments-body-item'>
                <div className='button-switch-background'>
                    {background ? 
                        <Button variant='contained' onClick={handleBackground}>Выключить фон</Button> : 
                        <Button variant='contained' onClick={handleBackground}>Включить фон</Button>
                    }
                </div>
            </div>
        
            <div className='instruments-body-item'>
                <div className='button-switch-cube'>
                    {cube ? 
                        <Button variant='contained' onClick={handleCube}>Выключить кубик</Button> :
                        <Button variant='contained' onClick={handleCube}>Включить кубик</Button>
                    }
                </div>
            </div>

            <div className='instruments-body-item'>
                <div className='button-switch-fps'>
                    {showFps ?
                        <Button variant='contained' onClick={handleFps}>Выключить показатель fps</Button> :
                        <Button variant='contained' onClick={handleFps}>Включить показатель fps</Button>
                    }
                </div>
            </div>

        </div>

        : <></>
    }

  </div>
  )

}
