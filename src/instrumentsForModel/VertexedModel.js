import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { VertexNormalsHelper } from '../instrumentsForScene/VertexNormalsHelper'

export default function VertexedModel({ 
  modelPath, 
  setFirstState, 
  setShowVertexSwitched 
}) {

    const modelObject = useGLTF(modelPath)

    const nodes = modelObject.nodes  // объект со всеми нодами
    const nodesArray = Object.values(nodes)  // массив со всеми нодами
    const vertexGroupArray = []  // массив из объектов Group для всех нодов с geometry
    const geometryNodes1 = []  // массив из нодов с св-вом geometry

    function addVertex() {
        for(let i = 0; i < nodesArray.length; i++) {
          if(nodesArray[i].hasOwnProperty('geometry')) {
            const group1 = new THREE.Group();
            group1.name = `vertex ${i}`
            vertexGroupArray.push(group1)
            geometryNodes1.push(nodesArray[i])
          }
        }
        console.log(modelObject)
        let vnh;
        const nodes = modelObject.nodes
        //const group = new THREE.Group();
        for(let i = 0; i < vertexGroupArray.length; i++) {
          vertexGroupArray[i].scale.multiplyScalar( 1 );
          modelObject.scene.add(vertexGroupArray[i] );
          vertexGroupArray[i].updateMatrixWorld( true );
        }
        // group1.scale.multiplyScalar( 1 );
        //modelObject.scene.add( group1 );
      
        //group1.updateMatrixWorld( true );
      
        for(let i = 0; i < vertexGroupArray.length; i++) {
          vnh = new VertexNormalsHelper( geometryNodes1[i], 0.01 );  // обозначение красными точками
          vnh.name = `vnh ${i}`
          modelObject.scene.add( vnh );
        }
      
        //nodes.shoe.geometry.computeTangents()
        console.log(geometryNodes1.length)
        setFirstState(false)
      }

    addVertex()
    setShowVertexSwitched(true)

  return (
    <group>
        <mesh> 
            <primitive object={modelObject.scene} />
        </mesh>
  </group>
  )
}
