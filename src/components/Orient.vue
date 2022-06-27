<template>
  <div class="wrap">
    <div id="animator">
      <div class="world-fix">
        <div class="phone">
          <div class="top"></div>
          <div class="front"></div>
          <div class="bottom">
            <div class="charge">&nbsp;</div>
          </div>
          <div class="back"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
    </div>
  </div>
  <div id="q">
    <div id="w"></div>
    <div id="x"></div>
    <div id="y"></div>
    <div id="z"></div>
  </div>
  <div id="mat">
    <div>
      <span>1</span><span>2</span><span>3</span>
    </div>
    <div>
      <span>4</span><span>5</span><span>6</span>
    </div>
    <div>
      <span>7</span><span>8</span><span>9</span>
    </div>
  </div>
</template>

<style scoped>
span {
  border: solid 1px;
  width: 100px;
  display: inline-block;
}

.wrap {
  perspective: 400px;
  perspective-origin: 50% 100px;
  margin-top: 40px;
  height: 190px;
  width: 230px;
  padding-top: 40px;
  background: linear-gradient(0deg, #a1e0e0 30%, #dcf9ff 36%);
  border: solid 1px #AAA;
}

.world-fix {
  transform-style: preserve-3d;
  transform: rotateX(-90deg) rotateZ(180deg);
}

.phone {
  transform-style: preserve-3d;
  transform: rotateX(0deg) rotateY(0deg);
  height: 170px;
  width: 72px;
  transform-origin: center;
  margin: auto;
}

.phone div {
  background: #cccccc;
}

.front,
.back {
  background: #000 !important;
  background-size: cover !important;
  width: 72px;
  height: 150px;
}

.back {
  background: #CCC !important;
  transform: translateZ(-10px) rotateY(180deg) translateY(-160px);
}

.top,
.bottom {
  height: 10px;
  width: 72px;
}

.top {
  transform: rotateX(90deg);
  transform-origin: bottom;
}

.bottom {
  transform: rotateX(90deg) translateY(-10px);
  transform-origin: top;
  padding-top: 2px;
  height: 8px;
}

.left,
.right {
  height: 150px;
  width: 10px;
}

.left {
  transform: translateY(-310px) translateZ(-10px) rotateY(-90deg);
  transform-origin: left;
}

.right {
  transform: translateY(-460px) translateZ(-10px) translateX(62px) rotateY(90deg);
  transform-origin: right;
  background: #CCC;
  background-size: cover !important;
  background-position-x: 10px !important;
}

.charge {
  width: 13px;
  margin: auto;
  background: #333333 !important;
  height: 5px;
  border-radius: 5px;
}

.reset-animation {
  transform: rotateY(0deg);
}

.animator {
  transform-style: preserve-3d;
  transform: rotateY(10000deg);
  transition: 100s;
}
</style>