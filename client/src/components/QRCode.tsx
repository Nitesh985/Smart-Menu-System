import React, { useEffect, useRef, useState} from "react";
import QRCodeStyling from "qr-code-styling";
import qrLogo from '../assets/qrlogo.png'


interface QRCodeProps{
    url:string;
}



export default function QRCode({url}:QRCodeProps) {
  const ref = useRef(null);
  const ref2 = useRef(null)
  const [qrCode, setQrCode] = useState(new QRCodeStyling({
    type: "canvas",
    shape: "square",
    width: 300,
    height: 300,
    data: "https://qr-code-styling.com",
    margin: 0,
    qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
    imageOptions: {
      saveAsBlob: true,
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 1,
    },
    dotsOptions: {
      type: "extra-rounded",
      color: "#6a1a4c",
      roundSize: true,
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#6a1a4c" },
          { offset: 1, color: "#e60000" },
        ],
      },
    },
    backgroundOptions: { round: 0, color: "#ffffff" },
    image:`${qrLogo}`,
    dotsOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: "0",
      },
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#258c18" },
          { offset: 1, color: "#cc7d0f" },
        ],
      },
    },
    cornersSquareOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    cornersDotOptions: {
      type: "",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#ff7b00" },
          { offset: 1, color: "#f20202" },
        ],
      },
    },
    cornersDotOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    backgroundOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#ffffff",
        color2: "#ffffff",
        rotation: "0",
      },
    },
  }))
    
  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);



  return (
    <>
     <div ref={ref}></div>
     <div ref={ref2}></div>
      
    </>
);
}
