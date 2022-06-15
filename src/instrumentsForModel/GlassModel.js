import React from 'react'
import { useControls } from 'leva'
import { useGLTF } from '@react-three/drei'

export default function GlassModel({ modelObject, setChangedObject }) {

    const model = useGLTF(modelObject)
    setChangedObject(model)
    const nodes = model.nodes
    const nodesArray = Object.values(nodes) // массив из всех нодов объекта
    const geometryNodesArray = [] // массив из всех нодов со свойством geometry

    for(let i = 0; i < nodesArray.length; i++) {  // заполняем geometryNodesArray
        if (nodesArray[i].hasOwnProperty('geometry')) {
          geometryNodesArray.push(nodesArray[i])
          // nodesScales.push(nodesArray[i].scale)
        }
    }

    console.log(model)

    const materialProps = useControls({
        thickness: { value: 5, min: 0, max: 20 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
        clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
        ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
        envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
        color: '#ffffff',
        attenuationTint: '#ffe79e',
        attenuationDistance: { value: 0, min: 0, max: 1 }
      })

  return (
    <group dispose={null}> 
        {geometryNodesArray.map((node) => (
            <mesh geometry={node.geometry} scale={node.scale} rotation={node.rotation} key={node.id} position={node.position}>
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        ))}
    </group>
  )
}
