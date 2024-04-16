import { useEffect } from "react";
import Quagga from "quagga";

// camera scanner component, itll basically accept onDetected as a prop which can be called when a barcode is detected
export default function CameraScanner({ onDetected }) {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            // the width and height of our video feed
            width: 600,
            height: 300,
            facingMode: "environment", // this tells the cam to face out (uses rear cam)
          },
          target: document.querySelector("#camera-scanner"),
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
      Quagga.stop();
    });

    return () => {
      Quagga.offDetected(); // Remove the event listener
      Quagga.stop(); // Stop Quagga and turn off the camera
    };
  }, [onDetected]); // Effect dependencies; the effect runs again if `onDetected` changes.

  //   this is where the video can be seen and also referenced at top
  return (
    <div className="camera-scanner-container" style={{ position: "absolute", zIndex: 99999999, backgroundColor: "white" }}>
      <div id="camera-scanner"></div>
    </div>
  );
}
