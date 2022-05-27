import React from 'react'
import { Edges } from "@react-three/drei"

export default function EdgesColoredModel({ modelObject }) {

  const nodes = modelObject.nodes  // тут все ноды объекта
  const nodesArray = Object.values(nodes) // массив из всех нодов объекта
  const geometryNodesArray = [] // массив из всех нодов со свойством geometry

  for(let i = 0; i < nodesArray.length; i++) {  // заполняем geometryNodesArray
    if (nodesArray[i].hasOwnProperty('geometry')) {
      geometryNodesArray.push(nodesArray[i])
    }
  }

  console.log(geometryNodesArray)

  return (
    <group dispose={null} position={[0, 0, 0]} rotation={[0, 0, 0]} >
      {geometryNodesArray.map((node) => (
        <mesh geometry={node.geometry}>
            {console.log(node)}
            <meshStandardMaterial transparent />
            <Edges />
        </mesh>
      ))}
      {/* <mesh geometry={nodes.Cube.geometry}>
          {console.log(nodes.Cube.geometry)}
        <meshStandardMaterial transparent />
        <Edges />
      </mesh> */}
    </group>
  )
}
