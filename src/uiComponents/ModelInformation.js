import React from 'react'
import './modelInformation.css'
import InfoList from './InfoList'
import * as THREE from 'three'
import { useGLTF } from "@react-three/drei"

export function ModelInformation({ currentScene, setNode }) {

  const model = useGLTF(currentScene)
  const nodes = model.nodes
  const generator = model.asset.generator
  const sceneName = model.scene.name
  const info = []
  const nodesArray = []
  const modelInfo = model.asset.extras
  const materials = model.materials
  let number = 0;
  let number1 = 0;

  for(let material in materials) {
    info[number] = material
    number = number + 1
  }

  for(let node in nodes) {
    nodesArray[number1] = node
    number1 = number1 + 1
  }

  return (
    <div className='modelInformation'>
        <div className='scene-info'>
          Scene info
        </div>
        <div className='scene-title'>
          {generator}
        </div>
        <div className='scene-author'>
          {sceneName}
        </div>
        <InfoList materialNames={info} listName={'materials'} setNode={setNode}/>
        <InfoList materialNames={nodesArray} listName={'nodes'} setNode={setNode}/>
    </div>
  )
}
