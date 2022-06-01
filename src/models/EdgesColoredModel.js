import React from 'react'
import { Edges } from "@react-three/drei"

export default function EdgesColoredModel({ modelObject }) {

  const nodes = modelObject.nodes  // тут все ноды объекта
  const nodesArray = Object.values(nodes) // массив из всех нодов объекта
  const geometryNodesArray = [] // массив из всех нодов со свойством geometry
  const children = modelObject.scene.children[0].children[0]
  //  const nodesScales = []  //массив с размерами каждой ноды

  console.log(children.scale)

  for(let i = 0; i < nodesArray.length; i++) {  // заполняем geometryNodesArray
    if (nodesArray[i].hasOwnProperty('geometry')) {
      geometryNodesArray.push(nodesArray[i])
      // nodesScales.push(nodesArray[i].scale)
    }
  }

  console.log(geometryNodesArray)

  return (
    <group dispose={null} position={children.position} rotation={children.rotation} scale={children.scale}> {/*scale={[0.01,0.01,0.01]}*/}
      {geometryNodesArray.map((node) => (
        <mesh geometry={node.geometry} scale={node.scale} rotation={node.rotation} key={node.id} position={node.position}>
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
