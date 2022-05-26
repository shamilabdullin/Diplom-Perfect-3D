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
  const nodes = modelObject.nodes
  const group = new THREE.Group();
  group.name = 'lines'
  const group1 = new THREE.Group();
  group1.name = 'vertex'

  function addColoredLines() {
    const nodes = modelObject.nodes
    group.scale.multiplyScalar( 1 );
    modelObject.scene.add( group );
  
    group.updateMatrixWorld( true );
  
    nodes.Cube.geometry.computeTangents() //- было в раб версии
    const wireframe = new THREE.WireframeGeometry( nodes.Cube.geometry );
    let line = new THREE.LineSegments( wireframe );
    line.material.depthTest = false;
    line.material.opacity = 1;
    line.material.transparent = true;
    line.position.y = 1
  
    group.add( line );  

  }

  function removeColoredLines() {
    const selectedObject = modelObject.scene.getObjectByName("lines")
    if (selectedObject !== undefined) {
      modelObject.scene.remove(selectedObject)
    }
    console.log(modelObject)
  }

  if( coloredLines ) {
    addColoredLines()  
  } 
  else {
    removeColoredLines()
    removeColoredLines()
  }

  function addVertex() {
    console.log(modelObject.nodes)
    let vnh;
    const nodes = modelObject.nodes
    //const group = new THREE.Group();
    group1.scale.multiplyScalar( 1 );
    modelObject.scene.add( group1 );
  
    group1.updateMatrixWorld( true );
  
    vnh = new VertexNormalsHelper( nodes.Cube, 0.01 );  // обозначение красными точками
    vnh.name = 'vnh'
    modelObject.scene.add( vnh );
  
    nodes.Cube.geometry.computeTangents()

  }

  function removeVertex() {

    const selectedObject = modelObject.scene.getObjectByName('vertex')
    const selectedObject1 = modelObject.scene.getObjectByName('vnh')
    if (selectedObject !== undefined) {
      modelObject.scene.remove(selectedObject)
    }
    if (selectedObject1 !== undefined) {
      modelObject.scene.remove(selectedObject1)
    }
  }

  if( showVertex ) {
    addVertex()
  } 
  else {
    removeVertex()
    removeVertex()
  }

  return (
    <group>
      {/* <mesh geometry={nodes.touchbar.geometry}>
        <Edges />
      </mesh> */}
      <primitive object={modelObject.scene} />

    </group>
  )
}
