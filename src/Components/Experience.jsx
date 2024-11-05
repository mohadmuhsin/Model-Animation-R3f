import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Ankou from "./Ankou";
import LampPost from "./LampPost";
import Rock from "./Rock";
import TreeSpruce from "./TreeSpruce";
import YoungKorrigan from "./YoungKorrigan";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { randFloatSpread } from "three/src/math/MathUtils";
import { Grass } from "./Grass";
import { Electric_pole } from "./Electric_pole";
import * as THREE from "three";
import { LayerMaterial, Gradient } from "lamina";
import { useConfigurator } from "../Contexts/Configurator";

const audio = new Audio("./audios/Song Of Unity.mp3");

const OFFSET_X = 80;
const LAMPS_NB = 15;
const LAMBS_SPEED = 0.8;
const TREES_NB = 35;
const TREES_SPEED = 0.4;
const FARTREES_NB = 35;
const FARTREES_SPEED = 0.08;
const ROCKS_NB = 20;
const ROCKS_SPEED = 0.5;
const GRASS_NB = 31;
const GRASS_SPEED = 0.5;
const POST_NB = 21;
const POST_SPEED = 1;
const RANDOMIZED_STRENGTH_SCALE = 0.42;
const RANDOMIZED_STRENGTH_POSITION = 1;

const MovingItem = (props) => {
  const ref = useRef();
  useFrame((_state, delta) => {
    ref.current.position.x += delta * props.speed;
    if (ref.current.position.x >= OFFSET_X) {
      ref.current.position.x = -OFFSET_X;
    }
  });

  useEffect(() => {
    if (props.randomizedPosition) {
      ref.current.position.x += randFloatSpread(RANDOMIZED_STRENGTH_POSITION);
      ref.current.position.z += randFloatSpread(RANDOMIZED_STRENGTH_POSITION);
    }
    if (props.randomizedScale) {
      ref.current.scale.x += randFloatSpread(RANDOMIZED_STRENGTH_SCALE);
      ref.current.scale.y += randFloatSpread(RANDOMIZED_STRENGTH_SCALE);
      ref.current.scale.z += randFloatSpread(RANDOMIZED_STRENGTH_SCALE);
    }
  }, []);

  return (
    <group ref={ref} position={props.position}>
      {props.children}
    </group>
  );
};

const Background = () => {
  const ref = useRef();
  const { isNight, setDay } = useConfigurator();
  const {
    lambsNb,
    TreesNb,
    farTreesNb,
    rockNb,
    lambsSpeed,
    treesSpeed,
    farTreesSpeed,
    rockSpeed,
    grassNb,
    grassSpeed,
    backgroundMusic,
    nightMode,
  } = useControls({
    lambsNb: {
      value: LAMPS_NB,
      min: 1,
      max: 100,
      step: 1,
    },
    lambsSpeed: {
      value: LAMBS_SPEED,
      min: 1,
      max: 100,
      step: 1,
    },
    TreesNb: {
      value: TREES_NB,
      min: 1,
      max: 100,
      step: 1,
    },
    treesSpeed: {
      value: TREES_SPEED,
      min: 1,
      max: 100,
      step: 1,
    },
    farTreesNb: {
      value: FARTREES_NB,
      min: 1,
      max: 100,
      step: 1,
    },
    farTreesSpeed: {
      value: FARTREES_SPEED,
      min: 1,
      max: 100,
      step: 1,
    },
    rockNb: {
      value: ROCKS_NB,
      min: 1,
      max: 100,
      step: 1,
    },
    rockSpeed: {
      value: ROCKS_SPEED,
      min: 1,
      max: 100,
      step: 1,
    },
    grassNb: {
      value: GRASS_NB,
      min: 1,
      max: 100,
      step: 1,
    },
    grassSpeed: {
      value: GRASS_SPEED,
      min: 1,
      max: 100,
      step: 1,
    },
    backgroundMusic: {
      value: false,
    },
    nightMode: {
      value: isNight,
    },
  });

  useEffect(() => {
    if (backgroundMusic) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [backgroundMusic]);

  useEffect(() => {
    setDay(nightMode);
  }, [nightMode]);

  return (
    <group position={[0, 0, 0]} ref={ref}>
      {[...Array(lambsNb)].map((_v, index) => (
        <MovingItem
          key={index}
          position={[-OFFSET_X + (index / lambsNb) * OFFSET_X * 2, 0, -1.5]}
          speed={lambsSpeed}
        >
          <LampPost scale={[0.5, 0.5, 0.5]} />
        </MovingItem>
      ))}
      {[...Array(TreesNb)].map((_v, index) => (
        <MovingItem
          key={index}
          position={[-OFFSET_X + (index / TreesNb) * OFFSET_X * 2, 0, -3.5]}
          speed={treesSpeed}
          randomizedPosition
          randomizedScale
        >
          <TreeSpruce scale={[0.1, 0.1, 0.1]} />
        </MovingItem>
      ))}
      {[...Array(farTreesNb)].map((_v, index) => (
        <MovingItem
          key={index}
          position={[-OFFSET_X + (index / farTreesNb) * OFFSET_X * 2, 0, -6]}
          speed={farTreesSpeed}
          randomizedPosition
          randomizedScale
        >
          <TreeSpruce scale={[0.15, 0.15, 0.15]} />
        </MovingItem>
      ))}
      {[...Array(rockNb)].map((_v, index) => (
        <MovingItem
          key={index}
          position={[-OFFSET_X + (index / rockNb) * OFFSET_X * 2, 0, 1]}
          speed={rockSpeed}
          randomizedScale
        >
          <Rock scale={[0.1, 0.1, 0.1]} />
        </MovingItem>
      ))}
      {[...Array(grassNb)].map((_v, index) => (
        <MovingItem
          key={index}
          position={[-OFFSET_X + (index / grassNb) * OFFSET_X * 2, 0, 1]}
          speed={grassSpeed}
          randomizedScale
          //   randomizedPosition
        >
          <Grass scale={[0.005, 0.005, 0.005]} rotation={[0, 1.6, 0]} />
        </MovingItem>
      ))}
      {[...Array(POST_NB)].map((_v, index) => (
        <MovingItem
          key={index}
          position={[-OFFSET_X + (index / POST_NB) * OFFSET_X * 2, 0, 1]}
          speed={POST_SPEED}
          //   randomizedScale
          //   randomizedPosition
        >
          <Electric_pole
            scale={[0.015, 0.024, 0.0148]}
            rotation={[0, 1.57, 0]}
          />
        </MovingItem>
      ))}
    </group>
  );
};

export const Experience = () => {
  const { isNight } = useConfigurator();
  const dayLight = 0.2;
  const nightLight = 1.1;
  return (
    <>
      <OrbitControls
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={15}
      />

      <group position={[0, -1, 0]}>
        <Background />

        <Ankou
          rotation-y={-Math.PI / 2}
          position={[0.9, 0, 0]}
          scale={[0.5, 0.5, 0.5]}
        />
        <YoungKorrigan
          rotation-y={-Math.PI / 2}
          position={[-1, -0.02, 0]}
          scale={[1.5, 1.5, 1.5]}
        />
        <ContactShadows scale={[16, 16]} opacity={0.42} />
        <mesh scale={10}>
          <sphereGeometry args={[7, 60, 60]} />
          <LayerMaterial side={THREE.BackSide}>
            {/* <Color color="#86ceeb" alpha={0.5} mode="darken" />   */}
            {!isNight && (
              <Gradient
                colorA="#00aff5"
                colorB="#a07d69"
                alpha={1}
                mode="darken"
                axes="y"
                contrast={8}
                mapping="local"
              />
            )}
            {isNight && (
              <Gradient
                colorA="#047aa8"
                colorB="#000000"
                alpha={1}
                mode="darken"
                axes="y"
                contrast={8}
                mapping="local"
              />
            )}
          </LayerMaterial>
        </mesh>

        <ambientLight intensity={isNight ? nightLight : dayLight} />

        {!isNight && <Environment preset="sunset" intensity={0.4} blur={0.8} />}
      </group>
    </>
  );
};
