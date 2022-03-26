const pixelGrid = document.getElementById('pixel__grid');
const gridTileGroup = document.querySelectorAll('.pixel__grid-tile');
const bgColourPicker = document.getElementById('pixel__palette-bg-color');
const pixelPalette = document.getElementById('pixel__palette');
const colorPickedBox = document.getElementById('pixel__palette-selected');
const gridSizeSelector = document.getElementById('pixel__grid--size-options');

let paletteColourPicked = 'palette-colour-1';
let gridBackgroundColour = 'bg-colour-1'
let gridSizeValue = gridSizeSelector.value

// Main function for adjusting the size of the grid.
// Utilises the <select> box options to set size, and sets the variable used in gridBuilder().
// Grid currently has to be removed and rebuilt in order to function, otherwise the remaining divs keep adding onto eachother.
function gridSizeChanger(){
  gridSizeValue = gridSizeSelector.value; // references value attribute of selected <option>
  let index = gridSizeSelector.selectedIndex; // Index value of selected option starting at zero.
  let selectedIndexId = gridSizeSelector[index].id; // returns ID of selected option, matching relevant class.

  pixelGrid.classList = selectedIndexId;
  pixelGrid.innerHTML = ''; //removes all previously added divs
  gridBuilder() // rebuilds now empty grid again
}

// Main function for building tile grid.
function gridBuilder(){
  for (let i = 1; i <= gridSizeValue; i++){
    let gridTileDiv = document.createElement('div');

    gridTileDiv.classList.add("pixel__grid-tile", gridBackgroundColour);
    // gridTileDiv.textContent = i; // left for debugging

    gridTileDiv.addEventListener('pointerdown', function changeColor(){
      if (gridTileDiv.classList.contains(gridBackgroundColour)){
        gridTileDiv.classList.replace(gridBackgroundColour, paletteColourPicked)
      }else if(gridTileDiv.classList.contains(gridBackgroundColour) === false && gridTileDiv.classList.contains(paletteColourPicked) === false){
        gridTileDiv.classList = paletteColourPicked;
      }else{
        gridTileDiv.classList = gridBackgroundColour;
      }
    });

    pixelGrid.appendChild(gridTileDiv);
  }
}

// Main function for building the colour palette
// Need to manually pick the number of colours by adjusting variable 'i' for now.
function paletteBuilder(){
  for (let i = 1; i <=10; i++){
    let paletteTileDiv = document.createElement('div');

    paletteTileDiv.classList.add("pixel__palette-tile", `palette-colour-${i}`);
    paletteTileDiv.id = `palette-tile-${i}`;
    // paletteTileDiv.textContent = i; // left for debugging
    colorPickedBox.classList = 'palette-colour-1'

    paletteTileDiv.addEventListener('click', function changeColor(){
      paletteColourPicked = `palette-colour-${i}`; // paletteColourPicked class is added on click event for grid tiles.
      colorPickedBox.classList = `palette-colour-${i}` // Changes colour of selected colour box, to match.
    });

    pixelPalette.appendChild(paletteTileDiv);
  }
}

// Main function for changing grid background colour
// Changes colour of all tiles with the gridBackgroundColour class only.
function backgroundColourBuilder(){
  for (let i = 1; i <=6; i++){
    let backgroundTileDiv = document.createElement('div');

    backgroundTileDiv.classList.add("bg-colour-tile", `bg-colour-${i}`);
    backgroundTileDiv.id = `bg-colour-tile-${i}`;
    // backgroundTileDiv.textContent = i; // left for debugging

    backgroundTileDiv.addEventListener('click', function changeBGColor(){
      let tiles = pixelGrid.querySelectorAll('div'); //Selects all tiles in the main pixel grid.
      let previousBackgroundColour = gridBackgroundColour //Need to differentiate previous and newly assigned background.
      for (let tile of tiles){
        if (tile.classList.contains(previousBackgroundColour)){
          tile.classList.remove(previousBackgroundColour);
          gridBackgroundColour = `bg-colour-${i}`;
          tile.classList.add(gridBackgroundColour);
        }
      }
    });

    bgColourPicker.appendChild(backgroundTileDiv);
  }
}

document.addEventListener('DOMContentLoaded', gridBuilder)
document.addEventListener('DOMContentLoaded', paletteBuilder)
document.addEventListener('DOMContentLoaded', backgroundColourBuilder)
