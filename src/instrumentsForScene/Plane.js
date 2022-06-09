import { usePlane } from '@react-three/cannon'
import * as THREE from 'three'

export function Plane(props) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props }))

    return (
        <gridHelper 
            args={[1000, 1000, '#cccccc', '#cccccc']} 
            position={[0, 0, 0]} 
            rotation={[0, 0, 0]} 
        />
    )
}