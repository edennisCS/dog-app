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
  
  const [isPoseFive, setIsPoseFive] = useState(false)

  // Sound function
  const playBark = () => {
    const audio = new Audio('/bark.mp3')
    audio.volume = 0.4
    audio.playbackRate = 0.9 + Math.random() * 0.2
    audio.play().catch(() => {}) // Catch prevents errors if audio isn't found
  }

  // Animation Toggle Logic
  useEffect(() => {
    const walkAction = actions[names[4]]
    const poseAction = actions[names[5]]

    if (!walkAction || !poseAction) return

    if (isPoseFive) {
      walkAction.fadeOut(0.5)
      poseAction.reset().fadeIn(0.5).play()
    } else {
      poseAction.fadeOut(0.5)
      walkAction.reset().fadeIn(0.5).play()
    }
  }, [isPoseFive, actions, names])

  // Movement Logic - Added [actions] as a dependency to ensure it loads
  useEffect(() => {
    if (group.current) {
      gsap.fromTo(group.current.position, 
        { z: 5 }, 
        { 
          z: -5, 
          duration: 6, 
          repeat: -1, 
          ease: "none",
        }
      )
    }
  }, [actions]) // This ensures GSAP waits for the model to be ready

  return (
    <group 
      onClick={(e) => {
        e.stopPropagation()
        playBark() // Trigger bark on click
        setIsPoseFive(!isPoseFive)
      }}
    >
      {/* Added a light here to ensure the dog isn't black/unloaded looking */}
      <ambientLight intensity={0.5} />
      
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