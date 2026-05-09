import { Canvas } from '@react-three/fiber'
import { Dog } from './components/Dog'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f0f0' }}>
      <Canvas camera={{ position: [4, 1.2, 0], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2} />
        <Dog />
      </Canvas>
    </div>
  )
}