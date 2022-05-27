import { useGLTF } from '@react-three/drei'
import { useState } from 'react'
import React from 'react'
import { Vector3 } from 'three'
import { Edges } from "@react-three/drei"
import { OrbitControls, TransformControls, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { VertexNormalsHelper } from '../instrumentsForView/VertexNormalsHelper'


export function UniversalModel({ 
  modelPath, 
  coloredLines, 
  showVertex,
  firstState,
  setFirstState,
  useStore,
  textured
 }) {

  const modelObject = useGLTF(modelPath)

  // для перемещения и вращения
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  //const { nodes, materials } = useGLTF(modelPath)

  // для подсвечивания белыми линиями
  const nodes = modelObject.nodes  // объект со всеми нодами
  const nodesArray = Object.values(nodes)  // массив со всеми нодами
  const linesGroupArray = []  //  массив из объектов Group для всех нодов с geometry
  const geometryNodes = []  // массив из нодов с св-вом geometry
  const vertexGroupArray = []  // массив из объектов Group для всех нодов с geometry
  const geometryNodes1 = []  // массив из нодов с св-вом geometry
  console.log(modelObject)

  // const group = new THREE.Group();
  // group.name = 'lines'
  // const group1 = new THREE.Group();
  // group1.name = 'vertex'

  function addColoredLines() {  // метод для подсвечивания белыми линиями
    for(let i = 0; i < nodesArray.length; i++) {
      if(nodesArray[i].hasOwnProperty('geometry')) {
        const group = new THREE.Group();
        group.name = `lines ${i}`
        linesGroupArray.push(group)
        geometryNodes.push(nodesArray[i])
      }
    }

    for(let i = 0; i < linesGroupArray.length; i++) {
      //linesGroupArray[i].scale.multiplyScalar( 1 );
      modelObject.scene.add( linesGroupArray[i] );
      //linesGroupArray[i].updateMatrixWorld( true );
    }
  
    //nodes.Cube.geometry.computeTangents() //- было в раб версии
    for(let i = 0; i < linesGroupArray.length; i++) {
      const wireframe = new THREE.WireframeGeometry( geometryNodes[i].geometry );
      let line = new THREE.LineSegments( wireframe );
      line.material.depthTest = false;
      line.material.opacity = 1;
      line.material.transparent = true;
      linesGroupArray[i].add(line)
    }

    setFirstState(false)
  }

  function removeColoredLines() {  //  метод для удаления белых линий
    console.log('removeColoredLines() started')
    for (let i = 0; i < nodesArray.length; i++) {
      if (nodesArray[i].hasOwnProperty('geometry')) {
        const selectedObject = modelObject.scene.getObjectByName(`lines ${i}`)
        if (selectedObject !== undefined) {
          modelObject.scene.remove(selectedObject)
        }
      }
    }
  }

  if( coloredLines ) {
    addColoredLines() 
    console.log('addColoredLines worked') 
  } 
  else if (!firstState) {
    removeColoredLines()
    removeColoredLines()
    console.log('removeColoredLines worked')
  }

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

  function removeVertex() {


    console.log(nodesArray.length)
    for(let i = 0; i < nodesArray.length; i++) {
      if(nodesArray[i].hasOwnProperty('geometry')) {
        geometryNodes1.push(nodesArray[i])
        const selectedObject = modelObject.scene.getObjectByName(`vertex ${i}`)
        if (selectedObject !== undefined) {
          modelObject.scene.remove(selectedObject)
        }
      }
    }


    console.log(geometryNodes1.length)
    for(let i = 0; i < geometryNodes1.length - 2; i++) {
      const selectedObject = modelObject.scene.getObjectByName(`vnh ${i}`)
      console.log(selectedObject)
      if (selectedObject !== undefined) {
        modelObject.scene.remove(selectedObject)
      }
    }
  }

  if( showVertex ) {
    addVertex()
  } 
  else if (!firstState) {
    removeVertex()
    removeVertex()
    console.log(modelObject)
  }

  return (
    <group>
      {/* <mesh geometry={nodes.touchbar.geometry}>
        <Edges />
      </mesh> */}
      <mesh onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <primitive object={modelObject.scene} />
      </mesh>
       {/* <group dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial transparent />
        <Edges />
      </mesh>
    </group> */}
      

    </group>
  )
}
