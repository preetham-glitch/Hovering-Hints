const wrapper = document.getElementById("tiles");
const buttonsWrapper = document.createElement("div");
buttonsWrapper.id = "buttons";
buttonsWrapper.classList.add("centered");
document.body.appendChild(buttonsWrapper);

let columns = 0,
  rows = 0,
  toggled = false;

function toggle() {
  toggled = !toggled;

  document.body.classList.toggle("toggled");

  // Use existing buttons
  const buttons = document.querySelectorAll(".master button");

  buttons.forEach((button, index) => {
    button.onclick = () => handleButtonClick(index); // Adjusted index
    buttonsWrapper.appendChild(button);
  });

  // Adjust z-index based on the toggle state
  buttonsWrapper.style.zIndex = toggled ? "4" : "1";
}

const handleOnClick = (index) => {
  toggle();

  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
};

const createTile = (index) => {
  const tile = document.createElement("div");

  tile.classList.add("tile");

  tile.style.opacity = toggled ? 0 : 1;

  tile.onclick = () => handleOnClick(index);

  // Add a class for the top row tiles
  if (index < columns) {
    tile.classList.add("top-row");
  }

  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((_tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";

  const size = document.body.clientWidth > 800 ? 100 : 50;

  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

createGrid();

window.onresize = () => createGrid();

function handleButtonClick(index) {
  switch (index) {
    case 0:
      window.location.href = '/pages/html/main.html'; 
      break;
    case 1:
      window.location.href = '/pages/html/rules.html'; 
      break;
    case 2:
      window.location.href = '/pages/html/about.html'; 
      break;
  }
}

buttonsWrapper.addEventListener("click", (event) => {
  const targetButton = event.target;
  const buttonIndex = Array.from(buttonsWrapper.children).indexOf(targetButton);
  if (buttonIndex !== -1) {
    handleButtonClick(buttonIndex);
  }
});
