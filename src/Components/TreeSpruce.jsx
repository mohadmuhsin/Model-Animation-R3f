/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import {  useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export default function TreeSpruce(props) {
  const group = useRef();
  const { nodes, materials,  } = useGLTF("./models/tree-spruce/model.gltf");
 
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes["tree-spruce"].geometry}
        material={materials.color_main}
      />
    </group>
  );
}

useGLTF.preload("./models/tree-spruce/model.gltf");
