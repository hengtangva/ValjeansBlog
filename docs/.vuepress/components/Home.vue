<template>
  <div id="app" class="wrapper" v-cloak v-bind:class="{'is-previous': isPreviousSlide, 'first-load': isFirstLoad}">
            <div class="slide-wrapper" 
                 v-for="(slide, index) in slides" 
                 v-bind:class="{ active: index === currentSlide }"
                 v-bind:style="{ 'z-index': (slides.length - index), 'background-image': 'url(' + slide.bgImg + ')' }">
                <div class="slide-inner">
                    <h2 class="slide-side-text"><span>{{ slide.sublineFirstLine }} / </span><span>{{ slide.sublineSecondLine }}</span></h2></div>
            </div>
        <div class="controls-container">
            <button class="controls-button" 
                    v-for="(slide, index) in slides"
                    v-bind:class="{ active: index === currentSlide }"
                    v-on:click="updateSlide(index)">{{ slide.headlineFirstLine }} {{ slide.headlineSecondLine }}</button>
        </div>
        <div class="pagination-container">
            <span class="pagination-item"
                  v-for="(slide, index) in slides"
                  v-bind:class="{ active: index === currentSlide }"
                  v-on:click="updateSlide(index)"></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
      return {
        currentSlide: 0,
        isPreviousSlide: false,
        isFirstLoad: true,
        slides: [
            {
                headlineFirstLine: "1",
                headlineSecondLine: "",
                sublineFirstLine: "",
                sublineSecondLine: "",
                bgImg: "data:image/jpeg;base64,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",
                rectImg: "https://i.postimg.cc/vTW0XkvM/slide-rect0.jpg"
            },
            {
                headlineFirstLine: "2",
                headlineSecondLine: "",
                sublineFirstLine: "",
                sublineSecondLine: "",
                bgImg: "data:image/jpeg;base64,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",
                rectImg: "https://i.postimg.cc/ryWZ8R2b/slide-rect1.jpg"
            },
            {
                headlineFirstLine: "3",
                headlineSecondLine: "",
                sublineFirstLine: "",
                sublineSecondLine: "",
                bgImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVAgBikunVQmh1PQAZSGyed-uQpC6J4VDwrg&usqp=CAU",
                rectImg: "https://i.postimg.cc/3JFLGMRF/slide-rect2.jpg"
            }
        ]
      }
    },
  mounted: function () {
    var productRotatorSlide = document.getElementById("app");
        var startX = 0;
        var endX = 0;

        productRotatorSlide.addEventListener("touchstart", (event) => startX = event.touches[0].pageX);

        productRotatorSlide.addEventListener("touchmove", (event) => endX = event.touches[0].pageX);

        productRotatorSlide.addEventListener("touchend", function(event) {
            var threshold = startX - endX;

            if (threshold < 150 && 0 < this.currentSlide) {
                this.currentSlide--;
            }
            if (threshold > -150 && this.currentSlide < this.slides.length - 1) {
                this.currentSlide++;
            }
        }.bind(this));
  },
    methods: {
        updateSlide(index) {
            index < this.currentSlide ? this.isPreviousSlide = true : this.isPreviousSlide = false;
            this.currentSlide = index;
            this.isFirstLoad = false;
        }
    }
}
</script>

<style>
.wrapper {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.controls-button, .slide-side-text, .slide-content-cta {
  font-family: 'Montserrat';
  text-transform: uppercase;
  color: #fff;
  letter-spacing: .12rem;
  font-size: .7rem;
  line-height: 1;
}

[v-cloak] {
  opacity: 0;
}

.wrapper {
  cursor: default;
}

.wrapper ::selection {
  background-color: rgba(46, 49, 52, 0.7);
  color: #f5f5f1;
}

.wrapper ::-moz-selection {
  background-color: rgba(46, 49, 52, 0.7);
  color: #f5f5f1;
}

.wrapper {
  height: calc(100vh - 90px);
  min-height: 36rem;
  position: relative;
}

@media (max-width: 630px) {
  .wrapper {
    height: 100vh;
    min-height: 0;
  }
}

.slide-wrapper {
  background-size: cover;
  height: 100%;
  background-position: center center;
  position: absolute;
  width: 100%;
  background-blend-mode: darken;
}

.slide-wrapper:nth-child(1) {
  background-color: rgba(115, 129, 153, 0.4);
}

.slide-wrapper:nth-child(1):before {
  background-color: rgba(115, 129, 153, 0.25);
}

.slide-wrapper:nth-child(1) .slide-content-text {
  text-shadow: 2px 5px 45px rgba(85, 96, 113, 0.25);
}

.slide-wrapper:nth-child(2) {
  background-color: rgba(144, 171, 184, 0.7);
}

.slide-wrapper:nth-child(2):before {
  background-color: rgba(144, 171, 184, 0.3);
}

.slide-wrapper:nth-child(2) .slide-content-text {
  text-shadow: 2px 5px 45px rgba(121, 142, 152, 0.2);
}

.slide-wrapper:nth-child(3) {
  background-color: rgba(86, 125, 156, 0.5);
}

.slide-wrapper:nth-child(3):before {
  background-color: rgba(86, 125, 156, 0.2);
}

.slide-wrapper:nth-child(3) .slide-content-text {
  text-shadow: 2px 5px 55px rgba(57, 83, 103, 0.4);
}

.slide-wrapper:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slide-inner {
  position: relative;
  z-index: 2;
  height: 100%;
  overflow: hidden;
}

.slide-bg-text {
  font-family: 'Playfair Display';
  color: #000;
  font-size: 42vh;
  line-height: .8;
  opacity: .03;
  font-weight: 900;
  margin-top: -4rem;
  position: absolute;
  top: 50%;
  left: 5vw;
  transform: translateY(-50%);
}

.slide-bg-text > p:last-child {
  padding-left: 4rem;
}

.slide-content {
  color: #fff;
  margin-top: 5rem;
  position: absolute;
  top: 50%;
  left: calc(13vw + (.7) * 48vh);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}

@media (max-width: 1000px) {
  .slide-content {
    left: calc(13vw + 1rem);
  }
}

@media (max-height: 730px) {
  .slide-content {
    top: 30%;
    transform: translateY(-30%);
    left: calc(9vw + (.7) * 16vw);
  }
}

.slide-content-text {
  font-family: 'Playfair Display';
  font-size: 9rem;
  letter-spacing: .2rem;
  line-height: .87;
  font-weight: 700;
  will-change: auto;
}

@media (max-height: 790px) {
  .slide-content-text {
    font-size: 7rem;
  }
}

@media (max-width: 1150px) {
  .slide-content-text {
    font-size: 7rem;
  }
}

@media (max-width: 840px) {
  .slide-content-text {
    font-size: 5.5rem;
  }
}

@media (max-width: 630px) {
  .slide-content-text {
    margin-bottom: 5.5rem;
  }
}

@media (max-width: 500px) {
  .slide-content-text {
    font-size: 3.5rem;
  }
}

.slide-content-text > p:last-child {
  padding-left: 3rem;
}

.slide-content-cta {
  cursor: pointer;
  align-self: flex-start;
  margin-top: 4.5rem;
  margin-left: calc((.3) * 48vh + 4.5rem);
  padding: .9rem 2.2rem;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  transition: .18s ease-in-out;
  font-weight: 700;
}

@media (max-width: 1000px) {
  .slide-content-cta {
    background-color: rgba(255, 255, 255, 0.3);
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }
}

@media (max-width: 630px) {
  .slide-content-cta {
    display: none;
  }
}

.slide-content-cta:hover {
  color: #000;
  background-color: #fff;
}

.slide-rect {
  height: 62vh;
  width: 48vh;
  border-image-slice: 10%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 13vw;
  border-width: 5vh;
  border-style: solid;
  box-shadow: 2px 2px 90px 30px rgba(41, 50, 61, 0.22);
  will-change: auto;
}

@media (max-height: 790px) {
  .slide-rect {
    left: 9vw;
    height: 20vw;
    width: 16vw;
    border-width: 5vh;
  }
}

@media (max-height: 730px) {
  .slide-rect {
    top: 30%;
    transform: translateY(-30%);
  }
}

.slide-rect-filter {
  filter: brightness(110%) contrast(110%) saturate(110%);
}

.slide-side-text {
  position: absolute;
  left: calc(13vw - 3rem);
  writing-mode: vertical-rl;
  top: calc((50% - (62vh / 2)) + (5vh / 2));
}

@media (max-height: 790px) {
  .slide-side-text {
    left: calc(9vw - 3rem);
    top: calc((50% - (20vw / 2)) + (5vh / 2));
  }
}

@media (max-height: 730px) {
  .slide-side-text {
    top: calc((40% - (20vw / 2)) + (5vh / 2));
  }
}

.slide-side-text > span:first-child {
  font-weight: 700;
}

.slide-side-text:after {
  content: "";
  width: 1px;
  background-color: #fff;
  height: 40px;
  display: block;
  position: absolute;
  top: calc(100% + 25px);
  left: 50%;
  transform: translateX(-50%);
}

.controls-container {
  position: absolute;
  z-index: 200;
  display: flex;
  bottom: 0;
  right: 0;
  align-items: flex-end;
}

@media (max-width: 630px) {
  .controls-container {
    display: none;
  }
}

.controls-button {
  cursor: pointer;
  background-color: rgba(208, 206, 204, 0.32);
  border: 0;
  padding: 1.6rem 2.2rem;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 15rem;
  transition: .25s ease-in-out;
  outline: 0;
}

@media (max-width: 730px) {
  .controls-button {
    padding: 1.2rem 1.4rem;
    min-width: 13rem;
  }
}

.controls-button:not(.active):hover {
  color: #000;
  background-color: #fff;
}

.controls-button.active {
  cursor: default;
  font-weight: 700;
  background-color: #3b3e45;
  padding-top: 1.9rem;
  padding-bottom: 1.9rem;
  margin-bottom: -0.3rem;
  position: relative;
}

@media (max-width: 730px) {
  .controls-button.active {
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
    margin-bottom: -0.15rem;
  }
}

.controls-button.active:after {
  content: "";
  background-color: #e3e3e3;
  height: 5px;
  width: calc(100% - 8px);
  position: absolute;
  top: 100%;
  left: 4px;
}

.controls-button:not(.active) + .controls-button {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.pagination-container {
  position: absolute;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

@media (max-width: 920px) {
  .pagination-container {
    display: none;
  }
}

.pagination-item {
  width: 30px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: .18s ease-in-out;
}

.pagination-item + .pagination-item {
  margin-top: 1rem;
}

.pagination-item.active {
  background-color: #fff;
  position: relative;
  transform: translateX(-0.6rem);
  width: 35px;
}

.pagination-item.active:after {
  content: "";
  height: 4px;
  width: 2px;
  border-radius: 35%;
  background-color: #fff;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateX(0.6rem) translateY(-50%);
}

.pagination-item:not(.active) {
  cursor: pointer;
}

.pagination-item:not(.active):hover {
  background-color: #fff;
  width: 35px;
}

@keyframes slideLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slideRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes cutTextUp {
  from {
    clip-path: inset(0 0 -10% 0);
  }
  to {
    clip-path: inset(0 0 100% 0);
  }
}

@keyframes cutTextDown {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(-10% 0 -20% 0);
    opacity: 1;
  }
}

@keyframes cutTextDownFromTop {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 -30% 0);
    opacity: 1;
  }
}

@keyframes rectMovement {
  0% {
    transform: translateX(0) rotate(0) translateY(-50%);
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-50%);
    opacity: 0;
  }
}

@media (max-height: 730px) {
  @keyframes rectMovement {
    0% {
      transform: translateX(0) rotate(0) translateY(-30%);
    }
    60% {
      opacity: 1;
    }
    100% {
      transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-30%);
      opacity: 0;
    }
  }
}

@keyframes rectMovementFromRight {
  0% {
    transform: translateX(calc(48vh)) rotate(12deg) translateY(-50%);
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: translateX(0) rotate(0) translateY(-50%);
    opacity: 1;
    @media (max-height: 730px) {
      transform: translateX(0) rotate(0) translateY(-30%);
    }
  }
}

@media (max-height: 730px) {
  @keyframes rectMovementFromRight {
    0% {
      transform: translateX(calc(48vh)) rotate(12deg) translateY(-30%);
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
    100% {
      transform: translateX(0) rotate(0) translateY(-30%);
      opacity: 1;
    }
  }
}

@keyframes rectMovementRight {
  0% {
    transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-50%);
  }
  40% {
    opacity: 1;
  }
  100% {
    transform: translateX(0) rotate(0) translateY(-50%);
    opacity: 1;
    @media (max-height: 730px) {
      transform: translateX(0) rotate(0) translateY(-30%);
    }
  }
}

@media (max-height: 730px) {
  @keyframes rectMovementRight {
    0% {
      transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-30%);
    }
    40% {
      opacity: 1;
    }
    100% {
      transform: translateX(0) rotate(0) translateY(-30%);
      opacity: 1;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.slide-wrapper {
  opacity: 0;
  transition-delay: 1.4s;
  transition-duration: 0s;
  transition-property: opacity;
  will-change: opacity, transform;
}

.slide-wrapper:not(.active) {
  animation-delay: 0.5s;
  animation-name: slideLeft;
  animation-duration: 0.9s;
  animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
  pointer-events: none;
}

.slide-wrapper:not(.active) .slide-content-text > p,
.slide-wrapper:not(.active) .slide-side-text {
  animation-name: cutTextUp;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
}

.slide-wrapper:not(.active) .slide-rect {
  animation-name: rectMovement;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.slide-wrapper.active {
  transition-delay: 0s;
  opacity: 1;
}

.slide-wrapper.active .slide-content-text > p {
  opacity: 0;
  animation-delay: 0.8s;
  animation-name: cutTextDown;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.slide-wrapper.active .slide-rect {
  opacity: 0;
  animation-name: rectMovementFromRight;
  animation-duration: 0.45s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: 0.9s;
}

.is-previous .slide-wrapper:not(.active) {
  animation: none;
}

.is-previous .slide-wrapper:not(.active) .slide-rect {
  animation: none;
}

.is-previous .slide-wrapper.active {
  transform: translateX(-100%);
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
  animation-name: slideRight;
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
}

.is-previous .slide-wrapper.active .slide-rect {
  opacity: 0;
  animation-name: rectMovementRight;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-delay: 0.9s;
}

.first-load .slide-wrapper.active .slide-side-text,
.first-load .slide-wrapper.active .slide-content-cta,
.first-load .slide-wrapper.active .slide-rect,
.first-load .controls-container {
  opacity: 0;
  animation-name: fadeIn;
  animation-delay: .3s;
  animation-duration: .3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
}

.first-load .slide-wrapper.active .slide-content-text > p {
  animation-name: fadeIn;
  animation-delay: 0.5s;
  animation-duration: 0.7s;
}

</style>