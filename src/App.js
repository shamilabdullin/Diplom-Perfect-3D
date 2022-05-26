import './App.css';
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls, Edges, TransformControls } from "@react-three/drei"
import { Debug, Physics } from '@react-three/cannon'
import { UniversalModel } from './models/UniversalModel';
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

import { Viewcube } from './instrumentsForView/Viewcube';
import { Portals } from './instrumentsForView/BackgroundHouse';
import { Footer } from './components/Footer';
import { ModelInformation } from './components/ModelInformation';
import { Plane } from './components/Plane';
import InstrumentPanel from './components/InstrumentPanel';
import Stats from 'stats.js'
import { VertexNormalsHelper } from './instrumentsForView/VertexNormalsHelper'

export default function App() {

  const [coloredLines, setColoredLines] = useState(false)
  const [currentModel, setCurrentModel] = useState('headless.glb')
  const [currentColor, setCurrentColor] = useState('red')
  const [debugged, setDebugged] = useState(false)
  const [textured, setTextured] = useState(false)
  const [background, setBackground] = useState(false)
  const [infoPanelOpen, setInfoPanelOpen] = useState(true)
  const [grid, setGrid] = useState(true)
  const [cube, setCube] = useState(true)
  const [showFps, setShowFps] = useState(true)
  const [showVertex, setShowVertex] = useState(false)

  const modelObject = useGLTF(currentModel) 

  // эксперименты с различными режимами

  // console.log(modelObject.nodes)
  // let vnh;
  // const nodes = modelObject.nodes
  // const group = new THREE.Group();
	// group.scale.multiplyScalar( 1 );
  // modelObject.scene.add( group );

  // group.updateMatrixWorld( true );

  // vnh = new VertexNormalsHelper( nodes.Cube, 0.01 );  // обозначение красными точками
  // modelObject.scene.add( vnh );

  // nodes.Cube.geometry.computeTangents()
  // const wireframe = new THREE.WireframeGeometry( nodes.Cube.geometry );
  // let line = new THREE.LineSegments( wireframe );
  // line.material.depthTest = false;
  // line.material.opacity = 1;
  // line.material.transparent = true;
  // line.position.y = 1

  // group.add( line );  // создание нового объекта с ребрами белого цвета

// эксперименты с различными режимами

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

  // const textureColorStateShoe = proxy({
  //   current: null,
  //   items: {
  //     laces: "#ffffff",
  //     mesh: "#ffffff",
  //     caps: "#ffffff",
  //     inner: "#ffffff",
  //     sole1: "#ffffff",
  //     stripes: "#ffffff",
  //     band: "#ffffff",
  //     patch: "#ffffff",
  //   },
  // })

  // const textureColorStateMac = proxy({
  //   current: null,
  //   items: {
  //     keyboard: "#222555",
  //     touchbar: "#777777",
  //     body: "#111",
  //     audio: "#999",
  //     screen1: "#123",
  //     screen2: "#345",
  //     screen3: "#567",
  //   },
  // })

  // function Picker() {
  
  //   const snap = useSnapshot(textureColorStateShoe)
  
  //   return (
  //     <div style={{ display: snap.current ? "block" : "none" }}>
  //       <HexColorPicker color={snap.items[snap.current]} className="picker"
  //         onChange={(color) => (textureColorStateShoe.items[snap.current] = color)} 
  //       />
  //       <div className="article">
  //         <h3>{snap.current}</h3>
  //       </div>
  //     </div>
  //   )
  // }

  function handleDownloadModel(){
    const exporter = new GLTFExporter();

    exporter.parse( 
      modelObject.scene, 
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
  stats.domElement.style.height = '200px';
  
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
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov:50}}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        
        <Suspense fallback={null}>
            {/* {currentModel == 'Shoe' ? 
              <Shoe circled={coloredLines} edgesColor={currentColor} textureColorState={textureColorStateShoe} useStore={useStore}/> : 
              currentModel == 'Mac' ? 
                <Mac coloredLines={coloredLines} edgesColor={currentColor} textured={textured} textureColorState={textureColorStateMac}/>
                /*target && <TransformControls object={target} mode={mode} />*/ /* для перемещения объекта */ }
            <UniversalModel modelPath={currentModel} coloredLines={coloredLines} showVertex={showVertex}/>
          {grid ? 
            <Physics iterations={6}>
              <Plane rotation={[-Math.PI / 2, 0, 0]} />
            </Physics>  :
            <></>
          }
          <Environment preset="sunset" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
          {background ? <Portals /> : <></>}
        </Suspense>
        <OrbitControls />
        {cube ? <Viewcube /> : <></>}
        {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} /> */}
      </Canvas>
      {/* <Picker /> */}
        
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
        />

        {infoPanelOpen ? <ModelInformation currentScene={modelObject}/> : <></>}
        
        <Footer download={handleDownloadModel} displayInfo={handleInfoPanel} />
    </>
  )
}