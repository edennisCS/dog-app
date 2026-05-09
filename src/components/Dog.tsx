import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { GLTF } from 'three-stdlib' 
import gsap from 'gsap'


// Define the type for your specific GLB file
type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Object3D | THREE.Mesh }
  materials: { [key: string]: THREE.Material }
}

export function Dog() {
  const group = useRef<THREE.Group>(null!)
  const { scene, animations } = useGLTF('/dog.glb') as GLTFResult
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    const walkAction = actions[names[4]]
    if (walkAction) walkAction.play()

    gsap.fromTo(group.current.position, 
      { z: 5 },  // START 
      { 
        z: -5,   // END 
        duration: 6, 
        repeat: -1, 
        ease: "none",
      }
    )
  }, [actions, names])

  return (
    <primitive 
      ref={group} 
      object={scene} 
      scale={1.5} 
      position={[0, -1.3, 5]} 
      rotation={[0, 0, 0]} 
    />
  )
}

// Pre-load the asset for performance
useGLTF.preload('/dog.glb')