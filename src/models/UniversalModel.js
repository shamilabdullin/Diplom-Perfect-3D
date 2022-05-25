import { useGLTF } from '@react-three/drei'
import React from 'react'
import { Vector3 } from 'three'
import { Edges } from "@react-three/drei"
import * as THREE from 'three'
import { VertexNormalsHelper } from '../instrumentsForView/VertexNormalsHelper'

export function UniversalModel({ modelPath, coloredLines, showVertex }) {

  const modelObject = useGLTF(modelPath)
  // const vector3 = new Vector3({x:1, y:2, z:3})
  // scene.scene.scale = vector3

  //const { nodes, materials } = useGLTF(modelPath)

  // для подсвечивания белыми линиями
  const group = new THREE.Group();



  //const vnh = new VertexNormalsHelper( nodes.Cube, 0.01 );

  function addColoredLines() {
    console.log(modelObject.nodes)
    let vnh;
    const nodes = modelObject.nodes
    group.scale.multiplyScalar( 1 );
    modelObject.scene.add( group );
  
    group.updateMatrixWorld( true );
  
    vnh = new VertexNormalsHelper( nodes.Cube, 0.01 );  // обозначение красными точками
    modelObject.scene.add( vnh );
  
    // nodes.Cube.geometry.computeTangents()
    const wireframe = new THREE.WireframeGeometry( nodes.Cube.geometry );
    let line = new THREE.LineSegments( wireframe );
    line.material.depthTest = false;
    line.material.opacity = 1;
    line.material.transparent = true;
    line.position.y = 1
    // line.position.x = 1;
    group.add( line ); 

  }

  function removeColoredLines() {
    console.log(modelObject)
    const selectedObject = modelObject.scene.getObjectByName(group.name)
    console.log(selectedObject)
    modelObject.scene.remove(selectedObject)
    console.log(modelObject)
  }

  if( coloredLines ) {
    addColoredLines()  
  } 
  else {
    removeColoredLines()
    removeColoredLines()
  }

  // function addVertex() {
  //   modelObject.scene.add( vnh );
  // }

  // function removeVertex() {
  //   const selectedObject = modelObject.scene.getObjectByName(vnh.name)
  //   modelObject.scene.remove(selectedObject)
  // }

  // if( showVertex ) {
  //   addVertex()
  // } 
  // else {
  //   removeVertex()
  //   removeVertex()
  // }

  return (
    <group>
      {/* <mesh geometry={nodes.touchbar.geometry}>
        <Edges />
      </mesh> */}
      <primitive object={modelObject.scene} />

    </group>
  )
}
