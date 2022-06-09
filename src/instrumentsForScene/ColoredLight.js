import { Vector3 } from 'three'
import { useRef } from 'react'
import { useGLTF, SpotLight, useDepthBuffer } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

export function ColoredLight({ vec = new Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)

  return <SpotLight 
    castShadow ref={light} 
    penumbra={1} 
    distance={6} 
    angle={0.35} 
    attenuation={3.5} 
    anglePower={4} 
    intensity={1} 
    {...props} 
  />
}