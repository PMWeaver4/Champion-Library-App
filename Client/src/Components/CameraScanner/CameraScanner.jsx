import { useEffect } from "react";
import Quagga from "quagga";
import { useScan } from "./ScanContext";
const Quagga = require("quagga").default;

// camera scanner component, itll basically accept onDetected as a prop which can be called when a barcode is detected
export default function CameraScanner({ onDetected }) {
  const { active } = useScan(); // the context state from ScanContext.jsx

  useEffect(() => {
    if (active) {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              // the width and height of our video feed
              width: 640,
              height: 480,
              facingMode: "environment", // this tells the cam to face out (uses rear cam)
            },
            target: document.querySelector("#scanner-container"),
          },
          decoder: {
            readers: ["ean_reader"], // for ISBNs
          },
        },
        (err) => {
          if (err) {
            console.error(err); // will have to log init errors
            return;
          }
          Quagga.start(); // this calls the Start of the barcode scanning
        }
      );

      Quagga.onDetected((data) => {
        onDetected(data.codeResult.code);
      });
    }

    return () => {
      Quagga.offDetected(); // Remove the event listener
      Quagga.stop(); // Stop Quagga and turn off the camera
    };
  }, [active, onDetected]); // Effect dependencies; the effect runs again if `onDetected` changes.

  //   this is where the video can be seen and also referenced at top
  return <div id="scanner-container" style={{ width: "100%", height: "100%" }}></div>;
}
