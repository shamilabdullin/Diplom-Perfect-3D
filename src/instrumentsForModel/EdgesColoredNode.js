import React from 'react'
import { Edges } from "@react-three/drei"

export function EdgesColoredNode({ node, modelObject }) {

  const nodes = modelObject.nodes
  const currentNode = nodes[node]

  return (
    <group dispose={null}>
      <mesh geometry={currentNode.geometry} scale={currentNode.scale} rotation={currentNode.rotation}>
        <meshStandardMaterial transparent />
        <Edges />
      </mesh>
    </group>
    
  )
}
