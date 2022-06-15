import './App.css';
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls, Edges, TransformControls, useDepthBuffer } from "@react-three/drei"
import { Debug, Physics } from '@react-three/cannon'
import { UniversalModel } from './instrumentsForModel/UniversalModel';
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

import { Viewcube } from './instrumentsForScene/Viewcube';
import { Portals } from './instrumentsForScene/BackgroundHouse';
import { Footer } from './uiComponents/Footer';
import { ModelInformation } from './uiComponents/ModelInformation';
import { Plane } from './instrumentsForScene/Plane';
import InstrumentPanel from './uiComponents/InstrumentPanel';
import Stats from 'stats.js'
import create from 'zustand'
import { useControls } from 'leva'
import EdgesColoredModel from './instrumentsForModel/EdgesColoredModel';
import VertexedModel from './instrumentsForModel/VertexedModel';
import UnTexturedModel from './instrumentsForModel/UnTexturedModel';
import { InsideColoredLight } from './instrumentsForScene/InsideColoredLight'
import { proxy, useSnapshot } from "valtio"
import { HexColorPicker } from "react-colorful"
import { EdgesColoredNode } from './instrumentsForModel/EdgesColoredNode'
import GlassModel from './instrumentsForModel/GlassModel';
import { TestModel } from './testModels/TestModel';

const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

export default function App() {

  const [modelInformation, setModelInformation] = useState('')
  const [coloredLines, setColoredLines] = useState(false)
  const [currentModel, setCurrentModel] = useState('shoe-draco.glb')
  const [currentColor, setCurrentColor] = useState('red')
  const [debugged, setDebugged] = useState(true)
  const [textured, setTextured] = useState(true)
  const [texturedSwitched, setTexturedSwitched] = useState(false)
  const [background, setBackground] = useState(false)
  const [infoPanelOpen, setInfoPanelOpen] = useState(true)
  const [grid, setGrid] = useState(true)
  const [cube, setCube] = useState(true)
  const [showFps, setShowFps] = useState(true)
  const [showVertex, setShowVertex] = useState(false)
  const [showVertexSwitched, setShowVertexSwitched] = useState(false)
  const [firstState, setFirstState] = useState(true)
  const [coloredEdges, setColoredEdges] = useState(false)
  const [node, setNode] = useState('')
  const [firstScene, setFirstScene] = useState(true) // для сохранения данных о начальной сцене в localstorage
  const [light, setLight] = useState(false)
  const [showModelInstruments, setShowModelInstruments] = useState(false)
  const [modelObject, setModelObject] = useState('shoe-draco.glb')
  const [loader, setLoader] = useState(true)  //надо true при использовании сетевого запроса
  const [changedObject, setChangedObject] = useState('')

  const URL = 'http://VM2205078023.vds.ru:8080/api/instruments/models/model--' // 'http://VM2205078023.vds.ru:8080/api/instruments/models/model--7b97160b-9c79-47a4-ae03-d373814424e4'
  const generatedName = '7b97160b-9c79-47a4-ae03-d373814424e4'
  const modelPath = URL + generatedName

  // useEffect(() => {  //  сетевой запрос
  //   fetch('http://VM2205078023.vds.ru:8080/api/instruments/models')
  //     .then(response => response.json())
  //     .then(model => {
  //       console.log(model)
  //     })
  // }, []
  // )

  useEffect(() => {  //  сетевой запрос
    fetch(modelPath)
      .then(response => response.json())
      .then(model => {
        console.log(model)
        setModelObject(model.modelUrl)
        setLoader(false)
      })
  }, []
  )
  const gltfObject = useGLTF(modelObject)
  // для перемещения объекта
  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })

  if (firstScene) {
    const materials = []
    // const nodesArray = Object.values(modelObject.nodes)  // для сохранения матриалов в local storage 

    // for(let i = 0; i < nodesArray.length; i++) {
    //   if(nodesArray[i].hasOwnProperty('material')) {
    //     //const strObj = JSON.stringify(nodesArray[i].material)
    //     materials.push(nodesArray[i])
    //   }
    // }
    // const q = modelObject.nodes.nodesArray[0]
    // const stigifiedMaterials = JSON.stringify(q) // const stigifiedMaterials = JSON.stringify(materials)
    // localStorage.setItem('materials', stigifiedMaterials)
    // const material1 = JSON.parse(localStorage.getItem('materials'))
    // console.log(material1)
  }

  function handleCurrentModel(event) {
    console.log(event.target.value)
    setCurrentModel(event.target.value)
  }

  function handleCurrentColor(event) {
    setCurrentColor(event.target.value)
  }

  function handleColoredLines() {
    setColoredLines((prev) => {
      return !prev
    })
  }

  function handleTextured() {
    setTextured((prev) => {return !prev})
  }

  function handleBackground() {
    setBackground((prev) => {return !prev})
  }

  function handleInfoPanel() {
    setInfoPanelOpen((prev) => {return !prev})
  }

  function handleGrid() {
    setGrid((prev) => {return !prev})
  }

  function handleCube() {
    setCube((prev) => {return !prev})
  }

  function handleFps() {
    setShowFps((prev) => {return !prev})
  }

  function handleVertex() {
    setShowVertex((prev) => {return !prev})
  }

  function handleColoredEdges() {
    setColoredEdges((prev) => {return !prev})
  }

  function handleLight() {
    setLight((prev) => {return !prev})
  }

  function handleModelInstruments() {
    setShowModelInstruments((prev) => {return !prev})
  }

  function handleDownloadModel(){
    const exporter = new GLTFExporter();

    exporter.parse( 
      gltfObject.scene,//  gltfObject.scene, 
      function ( gltf ) {
      console.log('gltf: ' + gltf)
      saveArrayBuffer(gltf, 'ThreejsScene.glb')
    }, 
    {
      binary: true
    } 
    );
  }

  function saveArrayBuffer(buffer, filename){
    save(new Blob([buffer]), filename)
  }

  const link = document.createElement('a')
  document.body.appendChild(link)

  function save(blob, fileName){
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }



  let stats = new Stats()
  stats.showPanel(0)
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';
  stats.domElement.style.height = '50px';
  stats.domElement.style.width = '50px'
  
  if(showFps) {
    document.body.appendChild( stats.dom );

  } else stats.end()

  function animate() {
    stats.begin();
    // monitored code goes here
    stats.end();
    requestAnimationFrame( animate );
  }

  requestAnimationFrame( animate );

  return (
    <>
      <Canvas 
        shadows dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov:50}} 
        onPointerMissed={() => setTarget(null)}
      >

        
        {light ? <color attach="background" args={['#202020']} /> : 
          <color attach="background" args={['#ffffff']} />
        }

        <Suspense fallback={null}>
            {light ?  <InsideColoredLight /> : <></>}
            {loader ? <></> :
              coloredEdges ? <EdgesColoredModel modelObject={modelObject} /> : 
              showVertex ? <VertexedModel 
                modelPath={modelObject} 
                setFirstState={setFirstState} 
                setShowVertexSwitched={setShowVertexSwitched}/> :
              !textured ? <UnTexturedModel 
                modelObject={modelObject} 
                setTexturedSwitched={setTexturedSwitched} 
                setFirstScene={setFirstScene}/> :
              showModelInstruments ? <GlassModel modelObject={modelObject} setChangedObject={setChangedObject}/> : 
              <UniversalModel 
                modelPath={modelObject} 
                coloredLines={coloredLines} 
                showVertex={showVertex} 
                showVertexSwitched={showVertexSwitched}
                firstState={firstState} 
                setFirstState={setFirstState} 
                useStore={useStore}
                textured={textured}
                texturedSwitched={texturedSwitched}
              />
            }

            {node !== '' ? <EdgesColoredNode 
              node={node} 
              modelObject={modelObject}/> : <></>
            }
            
            {target && <TransformControls object={target} mode={mode} />}
            {grid ? 
              <Physics iterations={6}>
                <Plane rotation={[-Math.PI / 2, 0, 0]} />
              </Physics>  :
              <></>
            }
          <Environment preset="sunset" />
          <ContactShadows 
            rotation-x={Math.PI / 2} 
            position={[0, -0.8, 0]} 
            opacity={0.25} 
            width={10} 
            height={10} 
            blur={1.5} 
            far={0.8} 
          />
          {background ? <Portals /> : <></>}
        </Suspense>
        <OrbitControls  makeDefault/>
        {cube ? <Viewcube /> : <></>}
        
      </Canvas>
        
        <InstrumentPanel 
          coloredLines={coloredLines} 
          handleColoredLines={handleColoredLines} 
          currentColor={currentColor} 
          handleCurrentColor={handleCurrentColor} 
          handleTextured={handleTextured} 
          currentModel={currentModel} 
          handleCurrentModel={handleCurrentModel} 
          handleGrid={handleGrid} 
          handleBackground={handleBackground} 
          handleCube={handleCube}
          handleFps={handleFps}
          handleVertex={handleVertex}
          background={background}
          cube={cube}
          showFps={showFps}
          grid={grid}
          showVertex={showVertex}
          coloredEdges={coloredEdges}
          handleColoredEdges={handleColoredEdges}
          textured={textured}
          light={light}
          handleLight={handleLight}
          handleModelInstruments={handleModelInstruments}
          showModelInstruments={showModelInstruments}
        />

        {infoPanelOpen ? <ModelInformation 
          currentScene={modelObject} 
          setNode={setNode}/> : <></>
        }
        
        <Footer download={handleDownloadModel} displayInfo={handleInfoPanel} />
    </>
  )
}