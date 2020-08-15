import React, { useEffect, useState } from 'react';
import './App.css';
import Jimp from 'jimp'

function App() {

  const IMAGE_URL = ''
  const [pixels, setPixels] = useState([])
  const [url, setUrl] = useState(IMAGE_URL)

  useEffect(() => {

    const response = window.prompt("Insert image URL:")
    setUrl(response)

  }, [])

  useEffect(() => {
    const newPixels = []
    if (!!url) {
      Jimp.read(url)
        .then((base) => {
          const img = base.resize(256, 256)
          for (let i = 0; i < 256; i++) {
            for (let j = 0; j < 256; j++) {
              const hex = img.getPixelColor(i, j).toString(16)
              const value = hex
              newPixels.push(value)
              console.log(`X = ${i}, Y = ${j}, Value = ${value}`)
            }
          }

          setPixels(newPixels)
        })
    }
  }, [url])

  function printPixels() {
    return pixels.map((pixel, index) => {

      console.log(`Pixel: ${index + 1}/${pixels.length}`)

      return (
        <div
          key={`pixel-${index}`}
          style={{
            width: '2px',
            height: '2px',
            backgroundColor: '#' + pixel
          }} />)
    })
  }

  return (
    <div className="App">
      {printPixels()}
    </div>
  );
}

export default App;
