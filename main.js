import './style.css'

// make xhr request
const profilePic = document.querySelector('#profile-pic');
const rightEye = document.querySelector('#right-eye');
const leftEye = document.querySelector('#left-eye');
const leftIris = document.querySelector('#left-iris');
const rightIris = document.querySelector('#right-iris');
const chest = document.querySelector('#chest');
const jaw = document.querySelector('#jaw');
const leftShoulder = document.querySelector('#left-shoulder');
const rightShoulder = document.querySelector('#right-shoulder');
const opepebackground = document.querySelector('svg');
const twitterHandle  = document.querySelector('#twitter-handle');
// on input change
twitterHandle.addEventListener('input', function(e) {
  // add a timeout to prevent too many requests
let username = e.target.value;
const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://opeper-backend.vercel.app/api/twitter?id=' + username);
xhr.send();

// handle response
xhr.onload = function() {
  let { colors, img } = JSON.parse(xhr.response);
  console.log(colors);
  rightShoulder.style.fill = colors[1];
  chest.style.fill = colors[0];
  leftShoulder.style.fill = colors[1];
  mouth.style.fill = colors[2];
  jaw.style.fill = colors[3];
  leftEye.style.fill = colors[4];
  rightEye.style.fill = colors[4];
  leftIris.style.fill = colors[2];
  rightIris.style.fill = colors[2];
  opepebackground.style.background = colors[5];
  profilePic.src = img;
}
});