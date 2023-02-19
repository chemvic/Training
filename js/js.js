// const colorPalette = document.querySelector(".color-palette");
// const output = document.querySelector(".output");

// colorPalette.addEventListener("click", selectColor);

// // This is where delegation «magic» happens
// function selectColor(event) {
//   if (event.target.nodeName !== "BUTTON") {
//     return;
//   }

//   const selectedColor = event.target.dataset.color;
//   output.textContent = `Selected color: ${selectedColor}`;
//   output.style.color = selectedColor;
// }

// // Some helper functions to render palette items
// createPaletteItems();

// function createPaletteItems() {
//   const items = [];
//   for (let i = 0; i < 60; i++) {
//     const color = getRandomColor();
//     const item = document.createElement("button");
//     item.type = "button";
//     item.dataset.color = color;
//     item.style.backgroundColor = color;
//     item.classList.add("item");
//     items.push(item);
//   }
//   colorPalette.append(...items);
// }

// function getRandomColor() {
//   return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
// }

// function getRandomHex() {
//   return Math.round(Math.random() * 256)
// //     .toString(16)
//     .padStart(2, "0");
// }
localStorage.setItem("ui-theme", "light");
localStorage.setItem("sidebar", "expanded");
localStorage.setItem("notification-level", "mute");
console.log(localStorage.getItem("ui-theme")); // "light"
console.log(localStorage.getItem("sidebar")); // "expanded"
console.log(localStorage.getItem("notification-level")); // "mute"

// localStorage.clear();
console.log(localStorage.getItem("ui-theme")); // null
console.log(localStorage.getItem("sidebar")); // null
console.log(localStorage.getItem("notification-level"));

// null




const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {
  localStorage.removeItem(key);
}

remove("sidebar");

console.log(localStorage.getItem("ui-theme")); // null
console.log(localStorage.getItem("sidebar")); // null
console.log(localStorage.getItem("notification-level"));

