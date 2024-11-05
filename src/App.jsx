import { Canvas, useThree } from "@react-three/fiber";
import { Experience } from "./Components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect } from "react";
import { Html, Loader } from "@react-three/drei";
import { LoadingScreen } from "./Components/LoadingScreen";
import * as THREE from "three";
import { useConfigurator } from "./Contexts/Configurator";

function App() {
  const { isNight } = useConfigurator();
  // const listener = new THREE.AudioListener();
  // const sound = new THREE.Audio(listener);
  // const audioLoader = new THREE.AudioLoader();
  // audioLoader.load("./audios/Song Of Unity.mp3", function (buffer) {
  //   sound.setBuffer(buffer);
  //   sound.setLoop(true);
  //   sound.setVolume(0.5);
  // });

  const dayLight = "#a07d69";
  const nightLight = "#000000";
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 1, 6], fov: 44.1 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
        <fog attach="fog" args={[isNight ? nightLight : dayLight, 12, 100]} />
        {isNight && <spotLight intensity={.5} color={"white"} castShadow />}
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
