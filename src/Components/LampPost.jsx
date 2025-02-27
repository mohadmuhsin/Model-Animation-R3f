/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useConfigurator } from "../Contexts/Configurator";
export default function LampPost(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./models/lamp-post/model.gltf");
  const { isNight } = useConfigurator();
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder096.geometry}
        material={materials["Black.012"]}
      />
      <mesh
        geometry={nodes.Cylinder096_1.geometry}
        material={materials["Yellow.007"]}
      >
        <meshBasicMaterial
          color={isNight ? [1.2, 1.2, 0.6] : "#FAF9F6"}
          toneMapped={false}
        />
      </mesh>
      {isNight && (
        <spotLight color={[1.2, 1.2, 0.6]} intensity={1} position={[0, 0, 0]} />
      )}
    </group>
  );
}

useGLTF.preload("./models/lamp-post/model.gltf");
