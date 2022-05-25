import { Physics, Debug, usePlane, useCompoundBody } from '@react-three/cannon'
import * as THREE from 'three'

export function Plane(props) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props }))

    // const planeMaterial = new THREE.ShadowMaterial( { color: 0x000000, opacity: 0.1 } );
    // const helper = new THREE.GridHelper( 2000, 100 );
    // helper.position.y = - 199;
    // helper.material.opacity = 0.25;
    // helper.material.transparent = true;

    return (
    //   <mesh receiveShadow ref={ref}>
    //     <planeGeometry args={[100, 100]} />
    //     <meshStandardMaterial color="#ffffff" />
    //   </mesh>
        <gridHelper args={[1000, 1000, '#cccccc', '#cccccc']} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    )
  }