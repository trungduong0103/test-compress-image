import "./styles.css";
import React from "react";
import CompressorComponent from "./compressions/Compressor";
import SharpComponent from "./compressions/Sharp";
// import sharp from "sharp";

export default function App() {
  return (
    <>
      <CompressorComponent />
      {/* <SharpComponent /> */}
    </>
  );
}
