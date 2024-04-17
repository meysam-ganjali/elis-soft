//TODO: Start Backround Animation
const numCount = 200;
const textCount = 50;
const imageCount = 50;

const numbers = [];
const elements = [];
const imageArray = [];
const color = [
  "#f2295b",
  "#ffb535",
  "#ffb535",
  "#27e55d",
  "#9c33f7",
  "#2ba0ff",
];
const texts = [
  "Console.Log('Hello World')",
  "Print('Hello, world!')",
  "echo 'Hy'",
  "function Hello(){return;}",
  "try{}charch{throw;}",
  "if(1===0){alert();}",
];

var ViewAnimation = document.querySelector("#ViewAnimation");
function getRandomNumber() {
  return Math.random() < 0.5 ? 0 : 1;
}
function getRandomText() {
  return texts[Math.floor(Math.random() * texts.length)];
}
var num = 0;
const BGText = () => {
  function createText() {
    const textElement = document.createElement("div");
    const textValue = getRandomText();
    textElement.textContent = textValue;
    textElement.style.color = color[num];
    // textElement.className = "text s" + color[num].replace("#", "");
    textElement.className = "text";
    num++;
    if (num === 5) num = 0;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const positionX = Math.random() * (windowWidth - 100);
    const positionY = Math.random() * (windowHeight - 40);

    textElement.style.left = positionX + "px";
    textElement.style.top = positionY + "px";

    ViewAnimation.appendChild(textElement);

    elements.push({
      element: textElement,
    });
  }

  for (let i = 0; i < textCount; i++) {
    createText();
  }
};
const BGNumber = () => {
  function createNumber() {
    const numberElement = document.createElement("div");
    const numberValue = getRandomNumber();
    numberElement.textContent = numberValue;
    numberElement.style.color = color[num];
    // numberElement.className = "number s" + color[num].replace("#", "");
    numberElement.className = "number";
    num++;
    if (num === 5) num = 0;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const positionX = Math.random() * (windowWidth - 100);
    const positionY = Math.random() * (windowHeight - 40);

    numberElement.style.left = positionX + "px";
    numberElement.style.top = positionY + "px";

    ViewAnimation.appendChild(numberElement);

    numbers.push({
      element: numberElement,
    });
  }
  for (let i = 0; i < numCount; i++) {
    createNumber();
  }
};
const BGImage = () => {
  function createImage() {
    const file = localStorage.getItem("savedImage");
    const imageElement = document.createElement("img");
    imageElement.className = "imageBackgroundAnimation";
    imageElement.src = file;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const positionX = Math.random() * (windowWidth - 100);
    const positionY = Math.random() * (windowHeight - 40);

    imageElement.style.left = positionX + "px";
    imageElement.style.top = positionY + "px";

    ViewAnimation.appendChild(imageElement);
    imageArray.push({
      element: imageElement,
    });
  }

  for (let i = 0; i < imageCount; i++) {
    createImage();
  }
};

let DistanceFromMouseInBGNumber = (mouseX, mouseY) => {
  numbers.forEach((number) => {
    const rect = number.element.getBoundingClientRect();
    const numX = rect.left + rect.width / 2;
    const numY = rect.top + rect.height / 2;

    const deltaX = mouseX - numX;
    const deltaY = mouseY - numY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 100) {
      const angle = Math.atan2(deltaY, deltaX);
      const distanceFromMouse = 100;
      const newX = numX - Math.cos(angle) * distanceFromMouse;
      const newY = numY - Math.sin(angle) * distanceFromMouse;

      number.element.style.transition = "transform 0.2s ease-in-out";
      number.element.style.transform = `translate(${newX - numX}px, ${
        newY - numY
      }px)`;
    }
  });
};
let DistanceFromMouseInBGText = (mouseX, mouseY) => {
  elements.forEach((element) => {
    const rect = element.element.getBoundingClientRect();
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    const deltaX = mouseX - elementX;
    const deltaY = mouseY - elementY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 100) {
      const angle = Math.atan2(deltaY, deltaX);
      const distanceFromMouse = 180;
      const newX = elementX - Math.cos(angle) * distanceFromMouse;
      const newY = elementY - Math.sin(angle) * distanceFromMouse;

      element.element.style.transition = "transform 0.2s ease-in-out";
      element.element.style.transform = `translate(${newX - elementX}px, ${
        newY - elementY
      }px)`;
    }
  });
};
let DistanceFromMouseInBGImage = (mouseX, mouseY) => {
  imageArray.forEach((element) => {
    const rect = element.element.getBoundingClientRect();
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    const deltaX = mouseX - elementX;
    const deltaY = mouseY - elementY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 100) {
      const angle = Math.atan2(deltaY, deltaX);
      const distanceFromMouse = 180;
      const newX = elementX - Math.cos(angle) * distanceFromMouse;
      const newY = elementY - Math.sin(angle) * distanceFromMouse;

      element.element.style.transition = "transform 0.2s ease-in-out";
      element.element.style.transform = `translate(${newX - elementX}px, ${
        newY - elementY
      }px)`;
    }
  });
};
//? End Backround Animation
//TODO: start Setting Background And SetCookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var setting = getCookie("SettingBackground");
  if (setting != "") {
    //* Create Element for Animation
    switch (setting) {
      case "BGNumber": {
        BGNumber();
        break;
      }
      case "BGText": {
        BGText();
        break;
      }
      case "BGTN": {
        BGText();
        BGNumber();
        break;
      }
      case "BGImage": {
        BGImage();
        break;
      }
    }
    //* Movment Of Page Elements => BG animation
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      switch (setting) {
        case "BGNumber": {
          DistanceFromMouseInBGNumber(mouseX, mouseY);
          break;
        }
        case "BGText": {
          DistanceFromMouseInBGText(mouseX, mouseY);
          break;
        }
        case "BGTN": {
          DistanceFromMouseInBGNumber(mouseX, mouseY);
          DistanceFromMouseInBGText(mouseX, mouseY);
          break;
        }
        case "BGImage": {
          DistanceFromMouseInBGImage(mouseX, mouseY);
          break;
        }
      }
    });
  } else {
    setCookie("SettingBackground", "BGTN", 5);
  }
}
//? End Setting Background And SetCookie
//TODO: start Information Box
// var informationBox = document.querySelector(".informationBox");
// document.querySelector(".btnInformation").addEventListener("click", () => {
//   informationBox.classList.add("show");
// });
// document
//   .querySelector("body>*:not(.informationBox)")
//   .addEventListener("click", () => {
//     informationBox.classList.remove("show");
//   });
// document.querySelector(".closeInformationBox").addEventListener("click", () => {
//   informationBox.classList.remove("show");
// });
//? End Information Box
//TODO: start Change DOM Section Register From Login and vice versa
// var slidero = document.querySelector(".slidero");
// document.querySelector(".btnRegister").addEventListener("click", () => {
//   slidero.classList.remove("login");
//   slidero.classList.add("register");
// });
// document.querySelector(".btnLogin").addEventListener("click", () => {
//   slidero.classList.remove("register");
//   slidero.classList.add("login");
// });
//? End Change DOM Section Register From Login
//TODO: start Section Box Setting
var boxSetting = document.querySelector(".boxSetting");
document.querySelector(".boxSetting-close").addEventListener("click", () => {
  boxSetting.classList.add("d-none");
});
document.querySelector(".btnShowBoxSettubg").addEventListener("click", () => {
  boxSetting.classList.remove("d-none");
});
//**** functions
const ChangeCookieSetting = (NameCom, element) => {
  if (element.checked === true) {
    setCookie("SettingBackground", NameCom, 5);
    ViewAnimation.innerHTML = "";
    checkCookie();
  } else {
    ViewAnimation.innerHTML = "";
    setCookie("SettingBackground", "NULL", 5);
  }
  HandelCheckBoxSectionBoxSetting(element);
};
const ChangeDOMInBoxSetting = (() => {
  var valueC = getCookie("SettingBackground");
  if (valueC !== "NULL" && valueC != "")
    document.querySelector(`.${valueC}`).checked = true;
})();
const HandelCheckBoxSectionBoxSetting = (element) => {
  document.querySelectorAll(".switch input[type='checkbox']").forEach((e) => {
    if (e !== element) e.checked = false;
  });
};
//? End Section Box Setting
checkCookie();
var BGImageCheckbox = document.querySelector(".BGImage");
//TODO: start Section Window Upload Image
var imagePreview = document.getElementById("preview");
const SetImageInPreview = (event) => {
  const [file] = event.files;

  localStorage.getItem("savedImage");

  if (file) {
    var urlImage = URL.createObjectURL(file);
    imagePreview.src = urlImage;
    //* start set image in local storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;

      localStorage.setItem("savedImage", base64Image);
      ViewAnimation.innerHTML = "";
      BGImageCheckbox.checked = true;
      checkCookie();
    };
    reader.readAsDataURL(file);
    //* end set image in local storage
    setCookie("SettingBackground", "BGImage", 5);
  } else {
    setCookie("UrlImageClient", "NULL", -1);
  }
};
var importImageInBGAnimation = document.getElementsByClassName(
  "importImageInBGAnimation"
);
const WindowUploadImage = () => {
  var img = localStorage.getItem("savedImage");
  if (img != null) imagePreview.src = img;
  importImageInBGAnimation[0].classList.remove("opacity-0");
  importImageInBGAnimation[0].classList.add("opacity-1");
  importImageInBGAnimation[0].classList.add("Zindex-200");
};
document
  .getElementsByClassName("btnCloseWindowUploadImage")[0]
  .addEventListener("click", () => {
    importImageInBGAnimation[0].classList.add("opacity-0");
    importImageInBGAnimation[0].classList.remove("opacity-1");
    importImageInBGAnimation[0].classList.remove("Zindex-200");
  });
//? End Section Window Upload Image
//TODO: start Section Window Upload Image
const RemoveImageBG = () => {
  //* Remove an item from local storage
  localStorage.removeItem("savedImage");
  checkCookie();
  ViewAnimation.innerHTML = "";
  BGImageCheckbox.checked = false;
  imagePreview.src = "";
  setCookie("SettingBackground", "NULL", 5);
};
//? End Section Window Upload Image
