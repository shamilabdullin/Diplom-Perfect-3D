import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls, Edges } from "@react-three/drei"
import { proxy, useSnapshot } from "valtio"
import { useControls } from 'leva'
import { HexColorPicker } from "react-colorful"
import create from 'zustand'


export function Shoe({circled, edgesColor, textureColorState, useStore}) {

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

    const ref = useRef()
    const snap = useSnapshot(textureColorState)
    const setTarget = useStore((state) => state.setTarget)
    const { nodes, materials } = useGLTF("shoe-draco.glb")
  
    // Cursor showing current color
    const [hovered, set] = useState(null)
    useEffect(() => {
      const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
      const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
      if (hovered) {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
        return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
      }
    }, [hovered])
  
    // Using the GLTFJSX output here to wire in app-state and hook up events
    if (circled) {
        return (
            <group
              ref={ref}
              dispose={null}
              onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
              onPointerOut={(e) => e.intersections.length === 0 && set(null)}
              // onPointerMissed={() => (textureColorState.current = null)}
              onClick={(e) => (e.stopPropagation(), (textureColorState.current = e.object.material.name))}>
              <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color={snap.items.laces} onClick={(e) => setTarget(e.object)}>
                  
                <Edges color={edgesColor}/>
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={snap.items.mesh} >
                  
                <Edges color={edgesColor}/>
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={snap.items.caps} onClick={(e) => setTarget(e.object)}>
                  
                  <Edges color={edgesColor}/>
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner} onClick={(e) => setTarget(e.object)}>
                  
                  <Edges color={edgesColor}/>
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={snap.items.sole} onClick={(e) => setTarget(e.object)}>
                <Edges color={edgesColor}/>
                
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} onClick={(e) => setTarget(e.object)}>
                  
                <Edges color={edgesColor}/>
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color={snap.items.band} onClick={(e) => setTarget(e.object)}>
                  
                  <Edges color={edgesColor}/>
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch} onClick={(e) => setTarget(e.object)}>
                  
                  <Edges color={edgesColor}/>
              </mesh>
            </group>
        )
    } else {
        return (
            <group
              ref={ref}
              dispose={null}
              onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
              onPointerOut={(e) => e.intersections.length === 0 && set(null)}
              onPointerMissed={() => (textureColorState.current = null)}
              onClick={(e) => (e.stopPropagation(), (textureColorState.current = e.object.material.name))}>
              <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color={snap.items.laces}>
                  {/* <meshPhysicalMaterial {...materialProps} /> */}
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={snap.items.mesh}>
                  
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={snap.items.caps}>
                  
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner}>
                  
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={snap.items.sole1}>
                
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes}>
                  
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color={snap.items.band}>
                  
              </mesh>
              <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch}>
                  
              </mesh>
            </group>
        )
    }
    
}