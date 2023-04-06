import './css/style.css';
import "./scss/style.scss";

let loader = document.querySelector('.loader-wrapper')
let mainContent = document.querySelector('.main-content')
loader && loader.classList.add('is-active')
setTimeout(function () {
    loader && loader.classList.remove('is-active')
    mainContent && mainContent.classList.remove('is-hidden')
}, 1000)