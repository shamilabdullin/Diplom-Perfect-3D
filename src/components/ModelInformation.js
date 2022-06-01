import React from 'react'
import './modelInformation.css'
import InfoList from './InfoList'
import * as THREE from 'three'

export function ModelInformation({ currentScene, setNode }) {

  const nodes = currentScene.nodes
  const generator = currentScene.asset.generator
  const sceneName = currentScene.scene.name
  const info = []
  const nodesArray = []
  const modelInfo = currentScene.asset.extras
  const materials = currentScene.materials
  // for (let inf in currentScene.asset.extras) {
  let number = 0;
  let number1 = 0;
  // info = Object.values(materials).map(v => Object.values(v))
  // const result = Object.keys(materials).map((value, index) => Object.values(materials[value]));
  // }
  // info = Object.values(currentScene.asset.extras).map(i => Object.values(i))

  for(let material in materials) {
    info[number] = material
    number = number + 1
  }

  for(let node in nodes) {
    nodesArray[number1] = node
    number1 = number1 + 1
  }

  // if(currentScene.asset.extras.title !== undefined) {
  //   const title = currentScene.asset.extras.title
  // }

  // if(currentScene.asset.extras.author !== undefined) {
  //   const author = currentScene.asset.extras.author
  // }

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
