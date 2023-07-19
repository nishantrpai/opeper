import './style.css'

const twitterHandle = document.querySelector('#twitter-handle');
const opepebackground = document.querySelector('svg');
const profilePic = document.querySelector('#profile-pic');

let typingTimer = null, loadingTimer = null;

const PROD = 'https://opeper-backend.vercel.app/api/twitter?id=';
const LOCAL = 'http://localhost:3000/api/twitter?id=';

const API = PROD;GScalar

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

function runLoadingAnimation() {

  clearTimeout(loadingTimer);

  // show borders 
  document.querySelector('#twitter').style.border = '1px solid #333';
  document.querySelector('#twitter').style.borderRadius = '0 20px 20px 20px';
  document.querySelector('#generated').style.border = '1px solid #333';

  // unset image src
  profilePic.style.visibility = "hidden";
  opepebackground.style.visibility = "hidden";

  // go from 0 height to 100% height smoothly
  const twitter = document.querySelector('#twitter');
  const generated = document.querySelector('#generated');

  twitter.style.animation = 'shake 0.75s ease-in-out 0s infinite alternate';
  generated.style.animation = 'shake 0.75s ease-in-out 0s infinite alternate';

  twitter.style.background = '#333';
  generated.style.background = '#333';
  twitter.style.height = '250px';
  generated.style.height = '250px';
  // sleep for 1 second
  
  loadingTimer = setTimeout(() => {
    twitter.style.height = '200px';
    generated.style.height = '200px';
  }, 5000);

}

function removeLoadingAnimation() {
  // hide borders
  clearTimeout(loadingTimer);
  document.querySelector('#twitter').style.border = 'none';
  document.querySelector('#generated').style.border = 'none';

  document.querySelector('#twitter').style.height = '100%';
  document.querySelector('#generated').style.height = '100%';


  document.querySelector('#twitter').style.background = 'none';
  document.querySelector('#generated').style.background = 'none';

  document.querySelector('#twitter').style.animation = 'none';
  document.querySelector('#generated').style.animation = 'none';

  // set image src
  profilePic.style.visibility = "visible";
  opepebackground.style.visibility = "visible";
}

window.onload = function () {
  opepebackground.style.visibility = "hidden";
  profilePic.style.visibility = "hidden";
  const xhr = new XMLHttpRequest()
  xhr.open('GET', API + 'elonmusk')
  xhr.send();

  // is loading console log
  runLoadingAnimation();

  xhr.onload = function () {
    removeLoadingAnimation();
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

function doneTyping(e) {
  runLoadingAnimation();

  let username = e.target.value;

  username = username.replace('@', '');
  username = username.replace(/ /g, '');

  if (username === '') return;

  const xhr = new XMLHttpRequest()
  xhr.open('GET', API + username)
  xhr.send();


  // handle response
  xhr.onload = function () {
    removeLoadingAnimation();
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