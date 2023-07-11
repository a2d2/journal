import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  SpotLight,
  Decal,
  useTexture,
  useGLTF,
  Center,
  AccumulativeShadows,
  RandomizedLight,
} from '@react-three/drei';

import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import { proxy, useSnapshot } from 'valtio';
import { AxesHelper } from 'three';
import { HexColorPicker } from 'react-colorful';
import { state } from './store';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { easing } from 'maath';
import { color } from 'framer-motion';
// import { Model } from './libreta4';

export default function App() {
  // const state = proxy({
  //   current: null,
  //   items: {
  //     Material_0: '#0000ff',
  //     Material_1: '#ffffff',
  //     Material_2: '#ff0000',
  //   },
  //   selectedDecal: 'three2',
  // });

  function Model(props) {
    const snap = useSnapshot(state);
    const texture = useTexture(`/${snap.selectedDecal}.png`);

    const { nodes, materials } = useGLTF('./models/libreta.glb');
    useFrame((state, delta) =>
      easing.dampC(materials.Material_0.color, snap.selectedColor, 0.25, delta)
    );

    console.log(materials);

    const [hovered, setHovered] = useState(null);

    return (
      <group
        {...props}
        dispose={null}
        // onPointerOver={(e) => {
        //   // console.log(e.object.material.name);
        //   setHovered(e.object.material.name);
        // }}
        // onPointerOut={(e) => {
        //   // console.log(e.object.material.name);
        //   e.intersections.length === 0 && setHovered(null);
        // }}
        // onPointerMissed={(e) => {
        //   state.current = null;
        // }}
        // onClick={(e) => {
        //   // console.log(e);
        //   e.stopPropagation();
        //   state.current = e.object.material.name;
        // }}
      >
        <group position={[-0.064, -0.021, 0.034]} scale={0.007}>
          <group position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Elástico(3DC1EE99-2D33-4495-8223-4BAA1260D758)'].geometry
              }
              material={materials.Material_2}
              material-color={snap.items.Material_2}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(05DAA8E6-C7CF-4657-92E9-EFD8F0005F06)'].geometry
              }
              material={materials.Material_0}
              // material-color={snap.items.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(077A05E9-2BD8-4B62-9B01-3387C604942A)'].geometry
              }
              material={materials.Material_0}
              material-color={snap.items.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(119D16D1-4942-4A52-BD6A-DE874BB8F32D)'].geometry
              }
              material={materials.Material_0}
              // material-color={snap.items.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(3D83D045-8E56-4D70-886D-367F1D6F039B)'].geometry
              }
              material={materials.Material_0}
              //   material-color={snap.items.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(5F1CFF6C-5BCC-450C-B831-39FC12063F55)'].geometry
              }
              material={materials.Material_0}
              //    material-color={snap.items.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Front(78DF5E49-7C38-4F8F-A4C5-0D7C24FFB800)'].geometry
              }
              material={materials.Material_0}
              material-color={snap.items.Material_0}
              // material-transparent={false}
            >
              <Decal
                //debug // Makes "bounding box" of the decal visible
                position={[3, 2, 100]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={(30, 30, 30)}
                // transparent={false}

                material-map={texture}
                material-map-anisotropy={10}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Hojas(A52FF521-4CE0-45A5-BBB4-5174DAD361D2)'].geometry
              }
              material={materials.Material_1}
              material-color={snap.items.Material_1}
            />
          </group>
        </group>
      </group>
    );
  }

  // const Picker = () => {
  //   const snap = useSnapshot(state);
  //   return (
  //     <div style={{ display: snap.current ? 'block' : 'none' }}>
  //       <HexColorPicker
  //         className="picker"
  //         color={snap.items[snap.current]}
  //         onChange={(color) => (state.items[snap.current] = color)}
  //       />
  //       <h1>{snap.current}</h1>
  //     </div>
  //   );
  // };

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

  function Customizer() {
    const snap = useSnapshot(state);
    //MESH color
    const colors = [
      '#0077C8',
      '#25282A',
      '#F7EA48',
      '#007749',
      '#009639',
      '#BA0C2F',
      '#CE0F69',
      '#6558b1',
      '#3e342f',
      '#ea733d',
      '#002855',
      '#2b2926',
    ];
    //LEATHER color
    const colors1 = [
      '#A4343A',
      '#f4f9ff',
      '#789D4A',
      '#425563',
      '#707372',
      '#2b2926',
    ];

    // const decals = ['223', 'three2', 'wall'];

    return (
      <section key="custom">
        <div className="customizer">
          <div className="color-options">
            {colors.map((color) => (
              <div
                key={color}
                className="circle"
                style={{ background: color }}
                onClick={() => (state.selectedColor = color)}
              ></div>
            ))}
          </div>
          <div className="decals">
            <div className="decals--container">
              {snap.decals.map((decal) => (
                <div
                  key={decal}
                  className="decal"
                  onClick={() => (state.selectedDecal = decal)}
                >
                  <img src={decal + '_thumb.png'} alt="brand" />
                </div>
              ))}
            </div>
          </div>
          <button className="share" style={{ background: '#789D4A' }}>
            DOWNLOAD
            <AiFillCamera size="1.3em" />
          </button>
          <button
            className="exit"
            style={{ background: '#789D4A' }}
            onClick={() => (state.intro = true)}
          >
            GO BACK
            <AiOutlineArrowLeft size="1.3em" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Canvas shadows camera={{ position: [-1, 0, 2.5], fov: 60 }}>
        {/* <axesHelper args={[1]} /> */}
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <Center>
          <Backdrop />
          <Model />
        </Center>
        <OrbitControls maxPolarAngle={Math.PI} />
      </Canvas>
      {/* <Picker /> */}
      <Customizer />
    </>
  );
}
