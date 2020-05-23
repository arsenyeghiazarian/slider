let sliderInnerWidth = 0;
let slideWidth = 0;
let slidingSize = 0;
let setIntervalId;
let autoPlayInterval = 3000;
let loop = false;
let isAutoPlay = false;
let slideChangeSpeed = 1;
let hasProgressBar = true;
let slideCount = document.getElementById('slider-id').children.length
let form = document.getElementById('slider-options');
let progressWidth = 100/slideCount;

// get the sum of widths of all slides
for(let el of document.getElementById('slider-id').children) {
    sliderInnerWidth += el.offsetWidth;
    slideWidth = el.offsetWidth;
}

// set first slide position and slider inner width
if(sliderInnerWidth) {
    document.getElementById('slider-id').style.width = sliderInnerWidth + 'px'
    document.getElementById('slider-id').style.transform = `translate3d( ${slidingSize}px, 0, 0)`
}

// set progress bar width on load
function progressBarWidth(state) {
    if(state === 'next') {
        if(progressWidth === 100) {
            progressWidth = 0;
        } else {
            progressWidth += 100 / slideCount;
        }
    }
    if(state === 'prev') {
        progressWidth -= 100 / slideCount;
    }
    document.getElementById('progressBar').style.width = `${progressWidth}%`
}

// detect form change
form.addEventListener("input", function () {
    loop = document.getElementById('loop').checked
    isAutoPlay = document.getElementById('autoplay').checked
    autoPlayInterval = document.getElementById('autoPlayInterval').value
    slideChangeSpeed = document.getElementById('slideChangeSpeed').value
    hasProgressBar = document.getElementById('progress-checkbox').checked
    if(isAutoPlay) {
        document.getElementById('loop').checked = true
        hasProgressBar = false
    }
    setSliderOption()
});

// navigation buttons
let changeSlide = function(state) {
    if(state === 'next') {
        if(slidingSize === -sliderInnerWidth + slideWidth) {
            slidingSize = 0;
        } else {
            slidingSize -= slideWidth;
        }
        progressBarWidth(state)
    } else if (state === 'prev') {
        if(slidingSize === 0) {
            slidingSize = -sliderInnerWidth + slideWidth;
        } else {
            slidingSize += slideWidth
        }
        progressBarWidth(state)
    }
    sliderBtnState()
    document.getElementById('slider-id').style.transform = `translate3d( ${slidingSize}px, 0, 0)`
}

// to check when buttons should be disabled
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

// autoplay functionality
function autoplay() {
    setIntervalId = setInterval(() => changeSlide('next'), +autoPlayInterval)
}

function setSliderOption() {
    clearInterval(setIntervalId)
    if(isAutoPlay) {
        autoplay()
        document.getElementById('autoPlayInterval').removeAttribute('readonly')
    } else {
        document.getElementById('autoPlayInterval').setAttribute('readonly', 'true')
        clearInterval(setIntervalId)
    }
    if(hasProgressBar) {
        document.getElementById('progressBar').style.display = 'block'
    } else {
        document.getElementById('progressBar').style.display = 'none'
    }
    document.getElementById('slider-id').style.transition = `all ${slideChangeSpeed}s ease 0s`
    sliderBtnState()
    progressBarWidth()
}
progressBarWidth()
setSliderOption();