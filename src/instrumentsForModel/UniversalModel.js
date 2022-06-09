import { useGLTF } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import React from 'react'
import { useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { proxy, useSnapshot } from "valtio"


export function UniversalModel({  //  отображение модели по умолчанию
  modelPath, 
  coloredLines, 
  showVertex,
  firstState,
  setFirstState,
  useStore,
  textured,
  showVertexSwitched,
  // firstModelObject,
  texturedSwitched,
 }) {
  const modelObject = useGLTF(modelPath)

  // для перемещения и вращения
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const nodes = modelObject.nodes  // объект со всеми нодами
  const nodesArray = Object.values(nodes)  // массив со всеми нодами
  const linesGroupArray = []  //  массив из объектов Group для всех нодов с geometry
  const geometryNodes = []  // массив из нодов с св-вом geometry
  const vertexGroupArray = []  // массив из объектов Group для всех нодов с geometry
  const geometryNodes1 = []  // массив из нодов с св-вом geometry
  const materials = []  // массив из материалов нодов с geometry
  const nodesForMaterialsArray = []  // массив для материалов для нодов

  const geometryNodesUniversal = []  // массив из нодов с св-вом geometry для рефакторинга без пустых элементов

  for(let i = 0; i < nodesArray.length; i++) {
    if (nodesArray[i].hasOwnProperty('geometry')) {
      geometryNodesUniversal.push(nodesArray[i])
    }
  }

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

  function removeVertex() {

    for(let i = 0; i < nodesArray.length; i++) {
      if(nodesArray[i].hasOwnProperty('geometry')) {
        geometryNodes1.push(nodesArray[i])
        const selectedObject = modelObject.scene.getObjectByName(`vertex ${i}`)
        if (selectedObject !== undefined) {
          modelObject.scene.remove(selectedObject)
        }
      }
    }

    for(let i = 0; i < geometryNodes1.length; i++) {  //  geometryNodes1.length - 2
      const selectedObject = modelObject.scene.getObjectByName(`vnh ${i}`)
      console.log(selectedObject)
      if (selectedObject !== undefined) {
        modelObject.scene.remove(selectedObject)
      }
    }
  }

  // function fillMaterials() {  //  для добаввления материалов к версии объекта без материалов
  //   // for(let i = 0; i < geometryNodesUniversal.length; i++) {
  //   //   materials.push(geometryNodesUniversal[i].material)
  //   // }
  //   for(let i = 0; i < nodesArray.length; i++) {
  //     if (nodesArray[i].hasOwnProperty('geometry')) {
  //       const name = nodesArray[i].name
  //       materials.push(modelObject.nodes[name].material)
  //     }
  //     console.log(materials)
  //   }
  // }

  function addMaterials() {
    const material2 = localStorage.getItem('materials') 
    const materialsObj = JSON.parse(material2)
    const materialsObjArray = Object.values(materialsObj)
    console.log(materialsObjArray)
    for(let i = 0; i < geometryNodesUniversal.length; i++) {
      console.log(i)    
      const name = nodesArray[i].name
      const matArray = materialsObjArray[i]
      console.log(matArray)
      modelObject.nodes[name].material = matArray.materials[0]
    }
  }

  if(showVertexSwitched) {
    removeVertex()
  }

  const ref = useRef()
  const [hovered1, set] = useState(null)
  const materials1 = modelObject.materials

  if (texturedSwitched) {  // если хоть 1 раз нажал применить текстуры

    //addMaterials()
    // console.log(firstModelObject)
    return (
      <group>
        <mesh onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}> 
          <primitive object={modelObject.scene} />
        </mesh>
      </group>
    )
  } else { // один раз работает в начале перед убиранием текстур
    //fillMaterials()
    // console.log(firstModelObject)
  }

  return (
    <group
      ref={ref}
      dispose={null}
    >
      <mesh onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <primitive object={modelObject.scene} />
      </mesh>
    </group>
  )
}
