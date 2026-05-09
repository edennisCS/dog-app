import * as THREE from 'three'
import { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei'
import type { GLTF } from 'three-stdlib' 
import gsap from 'gsap'

type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Object3D | THREE.Mesh }
  materials: { [key: string]: THREE.Material }
}

export function Dog() {
  const group = useRef<THREE.Group>(null!)
  const { scene, animations } = useGLTF('/dog.glb') as GLTFResult
  const { actions, names } = useAnimations(animations, group)
  
  // State to track which animation is active
  const [isPoseFive, setIsPoseFive] = useState(false)

  useEffect(() => {
    // Determine which clips to use
    // Assuming names[4] is the walk and names[5] is the click-target
    const walkAction = actions[names[4]]
    const poseAction = actions[names[5]]

    if (!walkAction || !poseAction) return

    if (isPoseFive) {
      // Transition to Pose 5
      walkAction.fadeOut(0.5)
      poseAction.reset().fadeIn(0.5).play()
    } else {
      // Transition back to Walk (Names[4])
      poseAction.fadeOut(0.5)
      walkAction.reset().fadeIn(0.5).play()
    }
  }, [isPoseFive, actions, names])

  // Initial GSAP movement remains the same
  useEffect(() => {
    gsap.fromTo(group.current.position, 
      { z: 5 }, 
      { 
        z: -5, 
        duration: 6, 
        repeat: -1, 
        ease: "none",
      }
    )
  }, [])

  return (
    <group 
      // Toggle state when the user clicks the dog
      onClick={(e) => {
        e.stopPropagation() // Prevents clicking through the dog
        setIsPoseFive(!isPoseFive)
      }}
    >
      <primitive 
        ref={group} 
        object={scene} 
        scale={1.5} 
        position={[0, -1.3, 5]} 
        rotation={[0, 0, 0]} 
      />
      
      <ContactShadows 
        position={[0, -1.3, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2.5} 
        far={4} 
      />
    </group>
  )
}

useGLTF.preload('/dog.glb')