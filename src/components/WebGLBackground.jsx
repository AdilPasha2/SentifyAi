import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { Color } from 'three'

// Animated particles component
function AnimatedParticles(props) {
  const ref = useRef()
  const { size } = useThree()
  
  // Generate random positions for particles
  const [sphere] = useMemo(() => [
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  ], [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

// Floating geometric shapes
function FloatingShapes() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0, -5]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#0080ff" transparent opacity={0.1} wireframe />
    </mesh>
  )
}

// Pulsing orbs
function PulsingOrbs() {
  const orbRefs = useRef([])
  
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ],
      speed: 0.5 + Math.random() * 0.5,
      scale: 0.1 + Math.random() * 0.2
    }))
  }, [])

  useFrame((state) => {
    orbRefs.current.forEach((orb, index) => {
      if (orb) {
        const t = state.clock.elapsedTime * orbs[index].speed
        orb.scale.setScalar(orbs[index].scale + Math.sin(t) * 0.05)
        orb.material.opacity = 0.3 + Math.sin(t) * 0.2
      }
    })
  })

  return (
    <>
      {orbs.map((orb, index) => (
        <mesh
          key={index}
          ref={(el) => (orbRefs.current[index] = el)}
          position={orb.position}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#00ffff" : "#0080ff"}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </>
  )
}

// Neural network visualization
function NeuralNetwork() {
  const linesRef = useRef()
  
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, () => [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4
    ])
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={linesRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Main WebGL Background component
const WebGLBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, 1],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: 'transparent',
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Animated components */}
        <AnimatedParticles />
        <FloatingShapes />
        <PulsingOrbs />
        <NeuralNetwork />
        
        {/* Color management */}
        <color attach="background" args={['#0a0a0a']} />
      </Canvas>
    </div>
  )
}

export default WebGLBackground
