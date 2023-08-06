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
import { download } from './assets';
import { AxesHelper } from 'three';
import { HexColorPicker } from 'react-colorful';
import { state } from './store';
import { downloadCanvasToImage, reader } from './config/helpers';
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  EditorTabs1,
} from './config/constants';
import { fadeAnimation, slideAnimation } from './config/motion';
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  Tab,
  FilePicker,
} from './components';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { easing } from 'maath';
import { AnimatePresence, motion, color } from 'framer-motion';
import { useControls } from 'leva';
// import roughnessMap from '../public/cuero.jpg';
// import normalMap from '../public/leather_1k.jpg';

// import { Model } from './libreta4';

export default function App() {
  // Position and intensity values can be adjusted as needed
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 0.4, 1.1); // Set the position of the point light
  function Lights() {
    const pointRef = useRef();
    useControls('Point Light', {
      visible: {
        value: false,
        onChange: (v) => {
          pointRef.current.visible = v;
        },
      },
      position: {
        x: 0,
        y: 0.4,
        z: 1.1,
        onChange: (v) => {
          pointRef.current.position.copy(v);
        },
      },
      color: {
        value: 'white',
        onChange: (v) => {
          pointRef.current.color = new THREE.Color(v);
        },
      },
    });
    return (
      <>
        <pointLight ref={pointRef}>
          <mesh>
            <sphereGeometry args={[0.25]}></sphereGeometry>
          </mesh>
        </pointLight>
      </>
    );
  }

  function Model(props) {
    const snap = useSnapshot(state);
    const texture = useTexture(`/${snap.selectedDecal}.png`);
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    const [selectedMaterialName0, setSelectedMaterialName0] =
      useState('Material_0');
    const [selectedMaterialName2, setSelectedMaterialName2] =
      useState('Material_2');

    // Get the selected color for Material_0 and Material_2
    const selectedColor0 = snap.selectedColor0 || snap.colors[0];
    const selectedColor2 = snap.selectedColor2 || snap.colors1[0];

    const { nodes, materials } = useGLTF('./models/TravelSkin.glb');
    // Load the wafer texture
    const waferTexture = useTexture('../public/wafer.jpg');

    // Create the wafer material
    const waferMaterial = new THREE.MeshStandardMaterial({
      map: waferTexture,
      // Add any other material properties you want to set for the wafer, e.g., roughness, metalness, etc.
    });
    // useFrame((state, delta) =>
    //   easing.dampC(materials.Material_0.color, snap.selectedColor, 0.25, delta)
    // );
    // const textureLoader = new THREE.TextureLoader();

    useFrame((state, delta) => {
      if (selectedMaterialName0 === 'Material_0') {
        easing.dampC(materials.Material_0.color, selectedColor0, 0.25, delta);
        materials.Material_0.needsUpdate = true; // Add this line to update Material_0

        state.colors = snap.colors; // Set the color palette to colors
      }

      if (selectedMaterialName2 === 'Material_2') {
        easing.dampC(materials.Material_2.color, selectedColor2, 0.25, delta);
        materials.Material_2.needsUpdate = true; // Add this line to update Material_2

        state.colors = snap.colors1; // Set the color palette to colors1
      }
    });

    console.log(materials);

    const [hovered, setHovered] = useState(null);

    return (
      <group
        {...props}
        dispose={null}
        onPointerOver={(e) => {
          setHovered(e.object.material.name);
        }}
        onPointerOut={(e) => {
          e.intersections.length === 0 && setHovered(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          const clickedMaterialName = e.object.material.name;

          if (clickedMaterialName === 'Material_0') {
            state.selectedMaterialName0 = clickedMaterialName;
            state.selectedMaterialName2 = null; // Deselect Material_2 when selecting Material_0
            setSelectedMaterialName0(clickedMaterialName);
            setSelectedMaterialName2(null); // Deselect Material_2 when selecting Material_0
          } else if (clickedMaterialName === 'Material_2') {
            state.selectedMaterialName2 = clickedMaterialName;
            state.selectedMaterialName0 = null; // Deselect Material_0 when selecting Material_2
            setSelectedMaterialName2(clickedMaterialName);
            setSelectedMaterialName0(null); // Deselect Material_0 when selecting Material_2
          }
        }}
      >
        <group position={[-0.064, -0.021, 0.034]} scale={0.005}>
          {/* <group position={[-0.064, -0.021, 0.034]} scale={0.007}> */}
          <group position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* <group position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}> */}
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
                nodes['Hojas(4676884E-6E07-4763-BC75-8E648863D826)'].geometry
              }
              material={materials.Material_1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Tapa(079AAA22-C889-4CD0-A428-A882861B129B)'].geometry
              }
              material={materials.Material_0}
              // material-color={snap.items.Material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Tapa(543E714D-DDAB-4D9D-A083-DD8B14EC65D5)'].geometry
              }
              material={materials.Material_0}
              // material-color={snap.items.Material_0}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Tapa(490C8E14-3344-499F-A9BC-CD72AF09B5A8)'].geometry
              }
              material={materials.Material_0}
              material-color={snap.items.Material_0}
              // material-metalness={0.9}
              // material-roughnessMap={textureLoader.load(roughnessMap)}
              // material-normalMap={textureLoader.load(normalMap)}
              // material-roughness={1}
              // material-map={waferTexture}
              // material-displacementScale={0.1}
              // material-refractionRadio={0.5}
              // material-transparent={false}
            >
              {/* {journal} */}
              {snap.isFullTexture && (
                <Decal
                  //debug // Makes "bounding box" of the decal visible
                  position={[3, 2, 100]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={(100, 100, 100)}
                  // transparent={false}

                  material-map={fullTexture}
                  material-map-anisotropy={10}
                  depthTest={false}
                  depthWrite={true}
                />
              )}
              {/* logo */}
              {snap.isLogoTexture && (
                <Decal
                  //debug // Makes "bounding box" of the decal visible
                  position={[3, 2, 100]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={(30, 30, 30)}
                  // transparent={false}

                  material-map={logoTexture}
                  material-map-anisotropy={10}
                  depthTest={false}
                  depthWrite={true}
                />
              )}
            </mesh>
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
    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState('');
    const [activeFilterTab, setActiveFilterTab] = useState({
      logoShirt: true,
      stylishShirt: false,
    });

    //show tab content depending on the activeTab
    const generateTabContent = () => {
      switch (activeEditorTab) {
        case 'colorpicker':
          return <ColorPicker />;
        // case 'stylishShirt':
        //   return <ColorPicker Material_2 />;
        case 'filepicker':
          return (
            <FilePicker file={file} setFile={setFile} readFile={readFile} />
          );

        // case 'logoShirt':
        //   handleDecals;
        //   break;
        // case 'aipicker':
        //   return (
        //     <AIPicker
        //       prompt={prompt}
        //       setPrompt={setPrompt}
        //       generatingImg={generatingImg}
        //       handleSubmit={handleSubmit}
        //     />
        //   );
        default:
          return null;
      }
    };

    const readFile = (type) => {
      reader(file).then((result) => {
        handleDecals(type, result);
        setActiveEditorTab('');
      });
    };

    const handleDecals = (type, result) => {
      const decalType = DecalTypes[type];
      state[decalType.stateProperty] = result;
      if (!activeFilterTab[decalType.filterTab]) {
        handleActiveFilterTab(decalType.filterTab);
      }
    };

    const handleActiveFilterTab = (tabName) => {
      switch (tabName) {
        case 'logoShirt':
          state.isLogoTexture = !activeFilterTab[tabName];
          break;
        case 'stylishShirt':
          state.isFullTexture = !activeFilterTab[tabName];
          break;
        default:
          state.isLogoTexture = true;
          state.isFullTexture = false;
          break;
      }

      // after setting the state, activeFilterTab is updated
      setActiveFilterTab((prevState) => {
        return {
          ...prevState,
          [tabName]: !prevState[tabName],
        };
      });
    };

    // const decals = ['223', 'three2', 'wall'];

    return (
      <>
        <AnimatePresence>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    // handleClick={() => {}}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            key="custom1"
            className="absolute top-0 right-0 z-10"
            {...slideAnimation('right')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs1.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {}}
                    // handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div>
            <button
              className="absolute z-10 top-5 right-5"
              style={{ background: '#789D4A' }}
              onClick={() => (state.intro = true)}
            >
              BACK
              <AiOutlineArrowLeft size="1.3em" />
            </button>
          </motion.div>

          <motion.div
            key="custom2"
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <section key="custom3">
          <div className="customizer">
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
            {/* <button
              className="exit"
              style={{ background: '#789D4A' }}
              onClick={() => (state.intro = true)}
            >
              GO BACK
              <AiOutlineArrowLeft size="1.3em" />
            </button> */}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Canvas shadows camera={{ position: [-1, 0, 2.5], fov: 45 }}>
        {/* <axesHelper args={[1]} /> */}
        <ambientLight intensity={0.5} />
        {/* <Environment preset="city" /> */}
        <Center>
          <Backdrop />
          {/* <pointLight intensity={1} color="#ff0000" position={(0, 0.4, 1.1)} /> */}
          <Model />
          {/* <Lights /> */}
        </Center>
        <OrbitControls
          minPolarAngle={-Math.PI}
          maxPolarAngle={Math.PI / 2}
          enablePan={false}
          enableZoom={true}
        />
      </Canvas>
      {/* <Picker /> */}

      <Customizer />
    </>
  );
}
