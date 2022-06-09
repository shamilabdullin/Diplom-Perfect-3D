import React from 'react'
import { ColoredLight } from './ColoredLight'
import { useDepthBuffer } from "@react-three/drei"

export function InsideColoredLight() {
    const depthBuffer = useDepthBuffer({ frames: 1 })
    return (
        <>
            <ColoredLight depthBuffer={depthBuffer} color="green" position={[1, 3, 0]} />
            {/* <ColoredLight depthBuffer={depthBuffer} color="#b00c3f" position={[1, 3, 0]} /> */}
        </>
    )
}
