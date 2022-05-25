import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import { Popconfirm } from 'antd'

const store = [
    { name: 'outside', color: 'lightpink', position: [10, 0, -15], url: '/2294472375_24a3b8ef46_o.jpg', link: 1 },
    { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: '/Photosphere1.jpg', link: 0 }
    // ...
  ]

function Dome({ name, position, texture, onClick }) {
    return (
      <group>
        <mesh>
          <sphereBufferGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        {/* <mesh position={position}>
          <sphereGeometry args={[1.25, 32, 32]} />
          <meshBasicMaterial color="white" />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#">{name}</a>
            </Popconfirm>
          </Html>
        </mesh> */}
      </group>
    )
}
  
export function Portals() {
    const [which, set] = useState(0)
    const { link, ...props } = store[which]
    const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
    return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}