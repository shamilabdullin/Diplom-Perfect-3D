import { Suspense, useRef, useState, useEffect } from "react"
import { ContactShadows, Environment, useGLTF, OrbitControls, Edges } from "@react-three/drei"
import { proxy, useSnapshot } from "valtio"
import { useControls } from 'leva'
import { Canvas, useFrame } from "@react-three/fiber"
import { HexColorPicker } from "react-colorful"

export function Mac({coloredLines, edgesColor, textured, textureColorState}) {

    // const materialProps = useControls({
    //     thickness: { value: 5, min: 0, max: 20 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    //     clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    //     ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    //     envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    //     color: '#ffffff',
    //     attenuationTint: '#ffe79e',
    //     attenuationDistance: { value: 0, min: 0, max: 1 }
    // })

    const group = useRef() // 
    const { nodes, materials } = useGLTF('/mac-draco.glb') // тут будет ссылка
    const [changed, setChanged] = useState(false)
    const snap = useSnapshot(textureColorState)

    if (coloredLines !== changed) {
        setChanged(coloredLines)
    }    

    const [hovered, set] = useState(null)
    useEffect(() => {
      const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
      const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
      if (hovered) {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
        return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
      }
    }, [hovered])

    if (coloredLines == true) {
        if (textured == true) {
            return (
                <group ref={group}  dispose={null}>
                <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh geometry={nodes.Cube008.geometry} material={materials.aluminium}>
                        <Edges color={edgesColor}/>
                        {/* <meshPhysicalMaterial {...materialProps} /> */}
                    </mesh>
                    <mesh geometry={nodes.Cube008_1.geometry} material={materials['matte.001']}>
                        <Edges color={edgesColor}/>
                    </mesh>
                    <mesh geometry={nodes.Cube008_2.geometry} material={materials['screen.001']}>
                        <Edges color={edgesColor}/>
                    </mesh>
                </group>
                </group>
                <mesh geometry={nodes.keyboard.geometry} material={materials.keys} position={[1.79, 0, 3.45]}>
                    <Edges color={edgesColor}/>
                </mesh>
                <group position={[0, -0.1, 3.39]}>
                <mesh geometry={nodes.Cube002.geometry} material={materials.aluminium}>
                    <Edges color={edgesColor}/>
                </mesh>
                <mesh geometry={nodes.Cube002_1.geometry} material={materials.trackpad}>
                    <Edges color={edgesColor}/>
                </mesh>
                </group>
                    <mesh geometry={nodes.touchbar.geometry} material={materials.touchbar} position={[0, -0.03, 1.2]}>
                        <Edges color={edgesColor}/>
                    </mesh>
                </group>
            )
        }
        else {
            return (
                <group ref={group}  dispose={null}>
                <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh geometry={nodes.Cube008.geometry}>
                        <Edges color={edgesColor}/>
                        {/* <meshPhysicalMaterial {...materialProps} /> */}
                    </mesh>
                    <mesh geometry={nodes.Cube008_1.geometry}>
                        <Edges color={edgesColor}/>
                    </mesh>
                    <mesh geometry={nodes.Cube008_2.geometry}>
                        <Edges color={edgesColor}/>
                    </mesh>
                </group>
                </group>
                <mesh geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]}>
                    <Edges color={edgesColor}/>
                </mesh>
                <group position={[0, -0.1, 3.39]}>
                <mesh geometry={nodes.Cube002.geometry} >
                    <Edges color={edgesColor}/>
                </mesh>
                <mesh geometry={nodes.Cube002_1.geometry} >
                    <Edges color={edgesColor}/>
                </mesh>
                </group>
                    <mesh geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]}>
                        <Edges color={edgesColor}/>
                    </mesh>
                </group>
            )
        }
      
    } else {
        if (textured == true) {
            return(
                <group ref={group}  dispose={null}>
                <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh geometry={nodes.Cube008.geometry} material={materials.aluminium}>
                        {/* <meshPhysicalMaterial {...materialProps} /> */}
                    </mesh>
                    <mesh geometry={nodes.Cube008_1.geometry} material={materials['matte.001']}>
                        {/* <meshPhysicalMaterial {...materialProps} /> */}
                    </mesh>
                    <mesh geometry={nodes.Cube008_2.geometry} material={materials['screen.001']}>
                        {/* <meshPhysicalMaterial {...materialProps} /> */}
                    </mesh>
                </group>
                </group>
                <mesh geometry={nodes.keyboard.geometry} material={materials.keys} position={[1.79, 0, 3.45]}>
                    
                </mesh>
                <group position={[0, -0.1, 3.39]}>
                <mesh geometry={nodes.Cube002.geometry} material={materials.aluminium}>
                    
                </mesh>
                <mesh geometry={nodes.Cube002_1.geometry} material={materials.trackpad}>
                   
                </mesh>
                </group>
                    <mesh geometry={nodes.touchbar.geometry} material={materials.touchbar} position={[0, -0.03, 1.2]}>
                        
                    </mesh>
                </group>
            )
        }
        else {
            return(
                <group 
                    ref={group}  
                    dispose={null}
                    onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
                    onPointerOut={(e) => e.intersections.length === 0 && set(null)}
                    onPointerMissed={() => (textureColorState.current = null)}
                    onClick={(e) => (e.stopPropagation(), (textureColorState.current = e.object.material.name))}
                >
                    <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
                        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                            <mesh geometry={nodes.Cube008.geometry} material-color={snap.items.screen1}>
                                {/* <meshPhysicalMaterial {...materialProps} /> */}
                            </mesh>
                            <mesh geometry={nodes.Cube008_1.geometry} material-color={snap.items.screen2}>
                                {/* <meshPhysicalMaterial {...materialProps} /> */}
                            </mesh>
                            <mesh geometry={nodes.Cube008_2.geometry} material-color={snap.items.screen3}>
                                {/* <meshPhysicalMaterial {...materialProps} /> */}
                            </mesh>
                        </group>
                    </group>
                    <mesh geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} material-color={snap.items.keyboard}>
                        
                    </mesh>
                    <group position={[0, -0.1, 3.39]}>
                        <mesh geometry={nodes.Cube002.geometry} material-color={snap.items.body}>                    
                        </mesh>
                        <mesh geometry={nodes.Cube002_1.geometry} material-color={snap.items.audio}>                   
                        </mesh>
                    </group>
                        <mesh geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} material-color={snap.items.touchbar}>                        
                        </mesh>
                </group>
            )
        }

    }
}