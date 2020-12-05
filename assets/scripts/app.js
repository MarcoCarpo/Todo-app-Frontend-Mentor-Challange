//--------------------------------------------------------- DOM content
const background = document.querySelector(".background");
const todo = document.querySelector(".todo");
const left = document.querySelector(".todo__left");
const clearBtn = document.querySelector(".todo__clear");
const categ = document.querySelector(".categories");
const options = document.querySelector(".todo__options");
const content = document.querySelector(".todo__content");
const todoItems = document.querySelector(".todo__items");
const itemContainer = document.querySelector(".todo__items");
const input = document.querySelector(".todo__input");
const ghostButton = document.querySelector(".todo__ghostButton");
const buttonLida = document.querySelector(".header__lida input");
const body = document.querySelector("body");
const attr = document.querySelector(".attribution");

//-------------------------------------------------------- Event Listeners
// For media queries
window.addEventListener("DOMContentLoaded", mediaQ);
window.addEventListener("resize", mediaQ);

// Switch between light and Dark mode
buttonLida.addEventListener("click", switchLight);

// Add an Item
ghostButton.addEventListener("click", addItem);

// Check or delete the clicked Item
itemContainer.addEventListener("click", chdel);

// Delete the completed items
clearBtn.addEventListener("click", clearAll);

// Filter Items
categ.addEventListener("click", filterItems);

//----------------------------------------------------------- Functions

function mediaQ() {
  const media = window.matchMedia("(min-width: 780px)");
  const imgBg = document.querySelector(".background");
  if (media.matches) {
    if (buttonLida.classList.contains("dark")) {
      imgBg.src = "./assets/images/bg-desktop-dark.jpg";
    } else {
      imgBg.src = "./assets/images/bg-desktop-light.jpg";
    }
  } else {
    if (buttonLida.classList.contains("dark")) {
      imgBg.src = "./assets/images/bg-mobile-dark.jpg";
    } else {
      imgBg.src = "./assets/images/bg-mobile-light.jpg";
    }
  }
}

function switchLight() {
  options.classList.toggle("dark-options");
  input.classList.toggle("dark-options");
  categ.classList.toggle("dark-options");
  content.classList.toggle("dark-options");

  for (item of itemContainer.children) {
    item.classList.toggle("dark-options");
  }
  background.style.transition = "0.3s";
  if (buttonLida.classList.contains("dark")) {
    for (item of itemContainer.children) {
      item.children[2].children[0].style.background = `url("../assets/images/icon-cross.svg")`;
      item.children[2].children[0].style.backgroundRepeat = `no-repeat`;
      item.children[2].children[0].style.backgroundPosition = `center`;
    }
    buttonLida.previousElementSibling.style.content = `url("../assets/images/icon-moon.svg")`;
    background.style.transform = "translate(100%,0)";
    background.addEventListener("transitionend", () => {
      background.src = "./assets/images/bg-mobile-light.jpg";
      background.style.transform = "translate(0,0)";
      buttonLida.classList.remove("dark");
      body.style.background = "white";
      attr.style.color = "black";
      mediaQ();
    });
  } else {
    for (item of itemContainer.children) {
      item.children[2].children[0].style.background = `url("../assets/images/icon-cross-dark.svg")`;
      item.children[2].children[0].style.backgroundRepeat = `no-repeat`;
      item.children[2].children[0].style.backgroundPosition = `center`;
    }
    buttonLida.previousElementSibling.style.content = `url("../assets/images/icon-sun.svg")`;
    background.style.transform = "translate(100%,0)";
    background.addEventListener("transitionend", () => {
      background.src = "./assets/images/bg-mobile-dark.jpg";
      background.style.transform = "translate(0,0)";
      body.style.background = "#292b3a";
      buttonLida.classList.add("dark");
      attr.style.color = "white";
      mediaQ();
    });
  }
}

function addItem(event) {
  event.preventDefault();

  if (input.value != "") {
    //create the item div

    const newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
      <div class="item__ok">
        <span class="item__okIcon"></span>
        <input type="checkbox" class="item__okButton" />
      </div>
  
      <p class="item__text">
    
      </p>
      <div class="item__del">
        <span class="item__delIcon"></span>
        <input type="checkbox" class="item__delButton" />
      </div>
      `;

    if (options.classList.contains("dark-options")) {
      newItem.classList.add("dark-options");
      newItem.children[2].children[0].style.background = `url("../assets/images/icon-cross-dark.svg")`;
      newItem.children[2].children[0].style.backgroundPosition = "center";
      newItem.children[2].children[0].style.backgroundRepeat = "no-repeat";
    }
    // Append the new item to the item container
    newItem.children[1].innerText = input.value;
    itemContainer.append(newItem);

    // Clear the input
    input.value = "";

    checkLeft();
  }
}

function chdel(event) {
  const item = event.target;

  if (item.classList.contains("item__okButton")) {
    item.previousElementSibling.classList.toggle("bg-ok-button");
    item.parentElement.classList.toggle("bg-ok-button2");
    item.parentElement.parentElement.children[1].classList.toggle("ok-text");
    checkLeft();
  } else if (item.classList.contains("item__delButton")) {
    const todoItem = item.parentElement.parentElement;
    todoItem.style.transition = "0.5s";
    item.parentElement.parentElement.style.transform = "rotateX(180deg)";
    todoItem.style.opacity = 0;
    todo.addEventListener("transitionend", () => {
      todoItem.remove();
      checkLeft();
    });
  }
}

function checkLeft() {
  let leftItems = 0;
  for (let i = itemContainer.children.length - 1; i >= 0; i--) {
    if (itemContainer.children[i].children[0].children[1].checked) continue;
    leftItems++;
  }
  left.innerText = `${leftItems} items left`;
}

function clearAll() {
  for (let i = itemContainer.children.length - 1; i >= 0; i--) {
    if (
      itemContainer.children[i].children[0].classList.contains("bg-ok-button2")
    ) {
      itemContainer.children[i].style.transition = "all 0.3s ease-in";
      itemContainer.children[i].style.transform = "translate(100%,0)";
      itemContainer.children[i].addEventListener("transitionend", (event) => {
        event.target.remove();
      });

      // itemContainer.selector.children[i].remove();
    }
  }
}

function filterItems(event) {
  switch (event.target.classList[0]) {
    case "active":
      for (item of todoItems.children) {
        if (item.children[0].classList.contains("bg-ok-button2"))
          item.style.display = "none";
        else item.style.display = "flex";
      }
      break;
    case "all":
      for (item of todoItems.children) {
        item.style.display = "flex";
      }
      break;
    case "completed":
      for (item of todoItems.children) {
        if (!item.children[0].classList.contains("bg-ok-button2"))
          item.style.display = "none";
        else {
          item.style.display = "flex";
        }
      }
      break;
  }
}
