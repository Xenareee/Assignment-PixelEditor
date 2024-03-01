import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { ImageContext } from '../contexts/ImageContext'
import { UIContext } from '../contexts/UIContext'
import TopBar from './TopBar'
import Gallery from './Gallery'
import Editor from './Editor'

function App() {

  // Regular Variables
  const defaultImageWidth = 16;
  const defaultImageHeight = 16;
  const defaultImageName = "Untitled";
  const barGalleryTitle = "Gallery";
  const defaultBackgroundColor = "#ffffff";
  const defaultSelectedColor = "#000000";
  const colorPalette = [defaultBackgroundColor, defaultSelectedColor, "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];
  const defaultTool = "PAINT"; // PAINT, FILL, PICK

  // State Variables
  const [showEditor, setShowEditor] = useState(false);
  const [showNewImagePanel, setShowNewImagePanel] = useState(false);
  const [imageWidth, setImageWidth] = useState(defaultImageWidth);
  const [imageHeight, setImageHeight] = useState(defaultImageHeight);
  const [imageName, setImageName] = useState(defaultImageName);
  const [imagePixels, setImagePixels] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(defaultSelectedColor);
  const [images, setImages] = useState([]);
  const [refreshImageList, setRefreshImageList] = useState(true);
  const [currentTool, setCurrentTool] = useState(defaultTool);


  // Effect
  useEffect(()=> {

    const fetchImages = async ()=> {
      try {
        const response = await fetch("http://localhost:5000/api/images");
        const loadedImages = await response.json();
        setImages(loadedImages);
      }
      catch(e){
        console.log(e);
      }
    }

    if (refreshImageList) {
      fetchImages();
      setRefreshImageList(false);
    }
    
  }, [refreshImageList]);
  

  // Functions
  function ShowNewImagePanel() {
    setShowNewImagePanel(true);
  }

  function HideNewImagePanel() {
    setShowNewImagePanel(false);
    ResetImageValues();
  }

  function ResetImageValues() {
    setImageWidth(defaultImageWidth);
    setImageHeight(defaultImageHeight);
    setImageName(defaultImageName);
    setImageId(null);
  }

  const CreateNewImage = async ()=> {
    
    setSelectedColor(defaultSelectedColor);
    setCurrentTool(defaultTool);
    const newPixels = GeneratePixels();

    const name = imageName;
    const width = parseInt(imageWidth);
    const height = parseInt(imageHeight);
    const pixels = newPixels;
    //console.log(JSON.stringify({ name, width, height, pixels }));

    try {
      const response = await fetch("http://localhost:5000/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ name, width, height, pixels, }),
      });

      const newImage = await response.json();
      setImageId(newImage.id);
      setImages([newImage, ...images]);
    }
    catch(e){
      console.log(e);
    }
    
    setShowEditor(true);   
  }

  function EditImage(image) {
    
    setSelectedColor(defaultSelectedColor);
    setCurrentTool(defaultTool);

    setImageName(image.name);
    setImageWidth(image.width);
    setImageHeight(image.height);
    setImagePixels(image.pixels);
    setImageId(image.id)
    
    setShowEditor(true);   
  }

  const DeleteImage = async (image)=> {
    
    if ( !image.id ) {
      return;
    }

    try {
      await fetch("http://localhost:5000/api/images/" + image.id, {
        method: "DELETE",
      });

      setRefreshImageList(true);
    }
    catch(e){
      console.log(e);
    }

  }

  function CloseEditor() {  
    setShowEditor(false);
    HideNewImagePanel();
    setRefreshImageList(true);
  }

  const SaveImage = async ()=>  {

    if ( !imageId ) {
      return;
    }

    const name = imageName;
    const width = parseInt(imageWidth);
    const height = parseInt(imageHeight);
    const pixels = imagePixels;

    try {
      const response = await fetch("http://localhost:5000/api/images/" + imageId, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ name, width, height, pixels, }),
      });

      const newImage = await response.json();
      setImageId(newImage.id);
      setRefreshImageList(true);
      setImages([newImage, ...images]);
    }
    catch(e){
      console.log(e);
    }

  }

  function GeneratePixels() {

    let newPixels = [];

    for (let row = 0; row < imageHeight; row++) {
      for (let col = 0; col < imageWidth; col++) {
        newPixels.push(defaultBackgroundColor);
      }
    }

    setImagePixels(newPixels);
    return newPixels;
  }

 function handlePixelClick( id ) {

  if (currentTool === "PAINT") {

    const nextImagePixels = imagePixels.map((oldColor, i) => {
      if (i === id) {
        return selectedColor;
      }
      else {
        return oldColor;
      }
    }, []);

    setImagePixels(nextImagePixels);

  }
  else if (currentTool === "FILL") {
    if ( imagePixels[id] !== selectedColor ) {
      Fill(id, imagePixels[id]);
    }
  }
  else if (currentTool === "PICK") {
    setSelectedColor(imagePixels[id]);
  }
  
  }

  function handlePixelDrag( id ) {

    if (currentTool === "PAINT") {
      handlePixelClick(id);
    }   

  }

  function handleColorChangeComplete( color ) {
    setSelectedColor(color.hex);
  }

  function Fill ( id, previousColor, previousImagePixels = imagePixels, firstPixel = true ) {

    // if this pixel is outside of the image, return.
    if (id < 0 && id >= imagePixels.length) {
      return previousImagePixels;
    }

    // if this pixel isn't the previous color value, return.
    if (previousImagePixels[id] !== previousColor) {
      return previousImagePixels;
    }

    // fill this pixel
    let newImagePixels = previousImagePixels.map((oldColor, i) => {
      if (i === id) {
        return selectedColor;
      }
      else {
        return oldColor;
      }
    }, []);
    //console.log("FILL NEIGHBOR")

    // fill neighbors
    newImagePixels = Fill(id-imageWidth, previousColor, newImagePixels, false); // up
    newImagePixels = Fill(id+imageWidth, previousColor, newImagePixels, false); // down
    if (id % imageWidth !== 0) {
      newImagePixels = Fill(id-1, previousColor, newImagePixels, false); // left
    }
    if (id+1 % imageWidth !== 0) {
      newImagePixels = Fill(id+1, previousColor, newImagePixels, false); // right
    }

    if (firstPixel) {
      //console.log("FILL END");
      setImagePixels(newImagePixels);
    }
    else {
      return newImagePixels;
    }
  
  }

  
  // Contents
  return (
    <div className='App'>
      <ImageContext.Provider value={{ 
        imageWidth, setImageWidth, 
        imageHeight, setImageHeight, 
        imageName, setImageName,
        imagePixels, handlePixelClick, handlePixelDrag,
        selectedColor, handleColorChangeComplete, colorPalette,
        images,
        currentTool, setCurrentTool
      }}>
      <UIContext.Provider value={{
        showEditor, CloseEditor,
        showNewImagePanel, ShowNewImagePanel, HideNewImagePanel,
        CreateNewImage, SaveImage, EditImage, DeleteImage
      }}>

        <TopBar 
          barTitle={ showEditor ? imageName : barGalleryTitle } 
        />

        <div className='appContentContainer'>
          { showEditor ? <Editor /> : <Gallery /> }
        </div>

      </UIContext.Provider>
      </ImageContext.Provider>
    </div>
  )
}

export default App