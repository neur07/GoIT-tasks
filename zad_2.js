// Zadanie 2

const controls = document.getElementById("controls");
const inputFld = controls.querySelector("input");
const createBtn = controls.querySelector("[data-action='create']");
const destroyBtn = controls.querySelector("[data-action='destroy']");
const boxes = document.getElementById("boxes");

const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 256 * 256 * 256).toString(16);
};

const createBoxesFactory = (initSize = 30) => {
  let size = initSize;
  return (n) => {
    for (let i = 0; i < n; i++) {
      const color = getRandomColor();
      const newDiv = document.createElement("div");
      newDiv.style.backgroundColor = color;
      newDiv.style.width = `${size}px`;
      newDiv.style.height = `${size}px`;
      boxes.appendChild(newDiv);
      size += 10;
    }
  };
};

const createBoxes = createBoxesFactory();

createBtn.addEventListener("click", () => createBoxes(inputFld.value));
destroyBtn.addEventListener("click", () => {
  boxes.remove();
});
