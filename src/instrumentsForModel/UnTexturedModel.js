import React from 'react'
import * as THREE from 'three'
import { ContactShadows, Environment, useGLTF} from "@react-three/drei"

export default function UnTexturedModel({ 
    modelObject, 
    setTexturedSwitched, 
    setFirstScene 
}) {

    const model = useGLTF(modelObject)
    const nodes = model.nodes  // объект со всеми нодами
    const nodesArray = Object.values(nodes)  // массив со всеми нодами
    const geometryNodes1 = []  // массив из нодов с св-вом geometry

    function untexture() {
        for (let i = 0; i < nodesArray.length; i++) {
            if (nodesArray[i].hasOwnProperty('geometry')) {
                geometryNodes1.push(nodesArray[i])
            }
        }

        for (let i = 0; i < geometryNodes1.length; i++) {
            geometryNodes1[i].material = new THREE.MeshBasicMaterial()
        }
    }

    untexture()
    setTexturedSwitched(true)
    setFirstScene(false)

    return (
        <mesh>
            <primitive object={model.scene} />
        </mesh>
    )
}
