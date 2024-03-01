import React from 'react'
import '../styles/Preview.css'

function Preview({ image }) {
  return (
    <div className='Preview' style={{
        gridTemplateColumns:  "repeat(" + image.width + ", 1fr)",
        gridTemplateRows:  "repeat(" + image.height + ", 1fr)",
        aspectRatio: image.width + "/" + image.height,
        width: image.width >= image.height ? "100%" : "auto",
        height: image.width < image.height ? "100%" : "auto"
        }}>
        { image.pixels.map((pixel, i) => 
        <div className='previewPixel' key={i} style={{ backgroundColor: pixel }} />
        )}
    </div>
  )
}

export default Preview