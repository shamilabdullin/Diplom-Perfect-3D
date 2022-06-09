import { useGLTF } from '@react-three/drei'
import React from 'react'

export function TestModel({ modelPath }) {

    const modelObject = useGLTF(modelPath)
    console.log(modelObject)

  return (
    <group>
        <mesh> {/* onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} */}
            <primitive object={modelObject.scene} />
        </mesh>
    </group>
  )
}
