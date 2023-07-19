import './style.css'

const twitterHandle = document.querySelector('#twitter-handle');
const opepebackground = document.querySelector('svg');
const profilePic = document.querySelector('#profile-pic');

let typingTimer = null;

const PROD = 'https://opeper-backend.vercel.app/api/twitter?id=';
const LOCAL = 'http://localhost:3000/api/twitter?id=';

const API = PROD;

function setSpecs(img, colors) {
  const rightEye = document.querySelector('#right-eye');
  const leftEye = document.querySelector('#left-eye');
  const leftIris = document.querySelector('#left-iris');
  const rightIris = document.querySelector('#right-iris');
  const chest = document.querySelector('#chest');
  const jaw = document.querySelector('#jaw');
  const leftShoulder = document.querySelector('#left-shoulder');
  const rightShoulder = document.querySelector('#right-shoulder');

  console.log(colors);

  opepebackground.style.background = colors['background'];
  
  leftEye.style.fill = colors['hair'];
  rightEye.style.fill = colors['hair'];
  

  leftIris.style.fill = colors['face'];
  rightIris.style.fill = colors['face'];
  mouth.style.fill = colors['face'];


  jaw.style.fill = colors['jaw'];
  
  chest.style.fill = colors['chest'];
  rightShoulder.style.fill = colors['shoulder'];
  leftShoulder.style.fill = colors['shoulder'];
  
  profilePic.src = img;
}

// make xhr request
// on input change

window.onload = function () {
  opepebackground.style.visibility = "hidden";
  profilePic.style.visibility = "hidden";
  const xhr = new XMLHttpRequest()
  xhr.open('GET', API + 'elonmusk')
  xhr.send();
  xhr.onload = function () {
    let { colors, img } = JSON.parse(xhr.response);
    console.log(colors);
    setSpecs(img, colors);
    opepebackground.style.visibility = "visible";
    profilePic.style.visibility = "visible";
  }
}

twitterHandle.addEventListener('keydown', async function (e) {
  // add a timeout to prevent too many requests
  clearTimeout(typingTimer);
});

twitterHandle.addEventListener('keyup', async function (e) {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, 1000, e);
});

function doneTyping (e) {
  let username = e.target.value;

  if (username === '') return;

  const xhr = new XMLHttpRequest()
  xhr.open('GET', API + username)
  xhr.send();

  // handle response
  xhr.onload = function () {
    let { colors, img } = JSON.parse(xhr.response);
    console.log(colors);
    setSpecs(img, colors);
  }
}

// download svg as png
const download = document.querySelector('#download');
download.addEventListener('click', function () {
  const svg = document.querySelector('svg');
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const svgSize = svg.getBoundingClientRect();
  canvas.width = svgSize.width;
  canvas.height = svgSize.height;
  const ctx = canvas.getContext("2d");
  const img = document.createElement("img");
  img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    const imgsrc = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = `${twitterHandle.value}-opepen.png`
    a.href = imgsrc;
    a.click();
  }
});