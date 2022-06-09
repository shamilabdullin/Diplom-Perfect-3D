import React from 'react'
import { Edges } from "@react-three/drei"
import { useGLTF } from "@react-three/drei"

export default function EdgesColoredModel({ modelObject }) {

  const model = useGLTF(modelObject)
  const nodes = model.nodes  // тут все ноды объекта
  const nodesArray = Object.values(nodes) // массив из всех нодов объекта
  const geometryNodesArray = [] // массив из всех нодов со свойством geometry
  const children = model.scene.children[0].children[0]
  //  const nodesScales = []  //массив с размерами каждой ноды

  for(let i = 0; i < nodesArray.length; i++) {  // заполняем geometryNodesArray
    if (nodesArray[i].hasOwnProperty('geometry')) {
      geometryNodesArray.push(nodesArray[i])
      // nodesScales.push(nodesArray[i].scale)
    }
  }

  console.log(geometryNodesArray)

  return (
    <group dispose={null}>
      {geometryNodesArray.map((node) => (
        <mesh 
          geometry={node.geometry} 
          scale={node.scale} 
          rotation={node.rotation} 
          key={node.id} 
          position={node.position}
        >
            <meshStandardMaterial transparent />
            <Edges />
        </mesh>
      ))}
    </group>
  )
}