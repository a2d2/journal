import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  SpotLight,
  Center,
  AccumulativeShadows,
  RandomizedLight,
} from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { easing } from 'maath';
// import { Model } from './libreta4';

export default function App() {
  function Model(props) {
    const { nodes, materials } = useGLTF('./models/libreta5.glb');
    return (
      <group {...props} dispose={null}>
        <group position={[-0.064, -0.021, 0.034]} scale={0.007}>
          <group position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Elástico(3DC1EE99-2D33-4495-8223-4BAA1260D758)'].geometry
              }
              material={materials.Material_2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(05DAA8E6-C7CF-4657-92E9-EFD8F0005F06)'].geometry
              }
              material={materials.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(077A05E9-2BD8-4B62-9B01-3387C604942A)'].geometry
              }
              material={materials.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(119D16D1-4942-4A52-BD6A-DE874BB8F32D)'].geometry
              }
              material={materials.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(3D83D045-8E56-4D70-886D-367F1D6F039B)'].geometry
              }
              material={materials.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(5F1CFF6C-5BCC-450C-B831-39FC12063F55)'].geometry
              }
              material={materials.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(78DF5E49-7C38-4F8F-A4C5-0D7C24FFB800)'].geometry
              }
              material={materials.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Hojas(A52FF521-4CE0-45A5-BBB4-5174DAD361D2)'].geometry
              }
              material={materials.Material_1}
            />
          </group>
        </group>
      </group>
    );
  }

  function Backdrop() {
    return (
      <AccumulativeShadows
        temporal
        frames={60}
        alphaTest={0.65}
        scale={20}
        rotation={[0, Math.PI, 0]}
        position={[0, -0.14, -0.14]}
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.55}
          ambient={0.25}
          position={[5, 5, -10]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.55}
          position={[-5, 5, -9]}
        />
      </AccumulativeShadows>
    );
  }

  return (
    <Canvas shadows camera={{ position: [-1, 0, 2.5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Center>
        <Backdrop />
        <Model />
      </Center>
      <OrbitControls maxPolarAngle={Math.PI} />
    </Canvas>
  );
}
