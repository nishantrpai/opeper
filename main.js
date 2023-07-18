import './style.css'

const twitterHandle = document.querySelector('#twitter-handle');
const opepebackground = document.querySelector('svg');
const profilePic = document.querySelector('#profile-pic');

const PROD = 'https://opeper-backend.vercel.app/api/twitter?id=';
const LOCAL = 'http://localhost:3000/api/twitter?id=';

const API = LOCAL;

function setSpecs(img, colors) {
  const rightEye = document.querySelector('#right-eye');
  const leftEye = document.querySelector('#left-eye');
  const leftIris = document.querySelector('#left-iris');
  const rightIris = document.querySelector('#right-iris');
  const chest = document.querySelector('#chest');
  const jaw = document.querySelector('#jaw');
  const leftShoulder = document.querySelector('#left-shoulder');
  const rightShoulder = document.querySelector('#right-shoulder');

  chest.style.fill = colors[0];
  rightShoulder.style.fill = colors[1];
  leftShoulder.style.fill = colors[1];
  leftIris.style.fill = colors[2];
  rightIris.style.fill = colors[2];
  mouth.style.fill = colors[2];
  jaw.style.fill = colors[3];
  leftEye.style.fill = colors[4];
  rightEye.style.fill = colors[4];
  opepebackground.style.background = colors[5];
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

twitterHandle.addEventListener('input', function (e) {
  // add a timeout to prevent too many requests
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
});

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