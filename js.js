let sliderInnerWidth = 0;
let slideWidth = 0;
let slidingSize = 0;
let setIntervalId;
let autoPlayInterval = 3000;
let loop = false;
let isAutoPlay = false;
let slideChangeSpeed = 1;
let form = document.getElementById('slider-options');

for(let el of document.getElementById('slider-id').children) {
    sliderInnerWidth += el.offsetWidth
    slideWidth = el.offsetWidth
}

if(sliderInnerWidth) {
    document.getElementById('slider-id').style.width = sliderInnerWidth + 'px'
    document.getElementById('slider-id').style.transform = `translate3d( ${slidingSize}px, 0, 0)`
}
refreshSlider()

form.addEventListener("input", function () {
    loop = document.getElementById('loop').checked
    isAutoPlay = document.getElementById('autoplay').checked
    autoPlayInterval = document.getElementById('autoPlayInterval').value
    slideChangeSpeed = document.getElementById('slideChangeSpeed').value
    refreshSlider()
});

let nextSlide = function() {
    if(slidingSize === -sliderInnerWidth + slideWidth) {
        slidingSize = 0;
    } else {
        slidingSize -= slideWidth;
    }
    sliderBtnState()
    document.getElementById('slider-id').style.transform = `translate3d( ${slidingSize}px, 0, 0)`
}

let prevSlide = function() {
    if(slidingSize === 0) {
        slidingSize = -sliderInnerWidth + slideWidth;
    } else {
        slidingSize += slideWidth
    }
    sliderBtnState()
    document.getElementById('slider-id').style.transform = `translate3d( ${slidingSize}px, 0, 0)`
}

function sliderBtnState() {
    if(loop === false && slidingSize === -sliderInnerWidth + slideWidth) {
        document.getElementById('next-btn').disabled = true;
    } else {
        document.getElementById('next-btn').disabled = false;
    }

    if(loop === false && slidingSize === 0) {
        document.getElementById('prev-btn').disabled = true;
    } else {
        document.getElementById('prev-btn').disabled = false;
    }
}

function autoplay() {
    setIntervalId = setInterval(() => nextSlide(), +autoPlayInterval)
}

function refreshSlider() {
    clearInterval(setIntervalId)
    if(isAutoPlay) {
        autoplay()
        document.getElementById('autoPlayInterval').removeAttribute('readonly')
    } else {
        document.getElementById('autoPlayInterval').setAttribute('readonly', 'true')
        clearInterval(setIntervalId)
    }
    document.getElementById('slider-id').style.transition = `all ${slideChangeSpeed}s ease 0s`
    sliderBtnState()
}