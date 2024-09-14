function bgChange(imgId) {
    const images = {
        img1: { url: "../static/assets/download.jpg" },
        img2: { url: "../static/assets/fishman.jpg" },
        img3: { url: "../static/assets/Untitled.jpg" },
        img4: { url: "../static/assets/img4.jpg" },
    };

    const img = images[imgId];
    if (img) {
        document.body.style.backgroundImage = `url(${img.url})`;
        setBackgroundPosition(imgId);
    }
}

function setBackgroundPosition(imgId) {
    let posY;
    if (window.innerWidth >= 1024) {
        switch (imgId) {
            case 'img1':
                posY = "-50rem";
                break;
            case 'img2':
                posY = "-21rem";
                break;
            case 'img3':
                posY = "-50rem";
                break;
            case 'img4':
                posY = "-50rem";
                break;
            default:
                posY = "0rem";
        }
    } else if (window.innerWidth >= 768) {
        switch (imgId) {
            case 'img1':
                posY = "-30rem";
                break;
            case 'img2':
                posY = "-15rem";
                break;
            case 'img3':
                posY = "-30rem";
                break;
            case 'img4':
                posY = "-30rem";
                break;
            default:
                posY = "0rem";
        }
    } else {
        switch (imgId) {
            case 'img1':
                posY = "0rem";
                break;
            case 'img2':
                posY = "0rem";
                break;
            case 'img3':
                posY = "0rem";
                break;
            case 'img4':
                posY = "0rem";
                break;
            default:
                posY = "0rem";
        }
    }

    document.body.style.backgroundPositionY = posY;
}

window.addEventListener('resize', function() {
    // Reapply the background position when the window is resized
    const currentBgImage = document.body.style.backgroundImage;
    if (currentBgImage.includes("download.jpg")) {
        setBackgroundPosition('img1');
    } else if (currentBgImage.includes("fishman.jpg")) {
        setBackgroundPosition('img2');
    } else if (currentBgImage.includes("Untitled.jpg")) {
        setBackgroundPosition('img3');
    } else if (currentBgImage.includes("img4.jpg")) {
        setBackgroundPosition('img4');
    }
});
let imgContainer = document.querySelector("#img-container");
let backBtn = document.getElementById("up");
let nextBtn = document.getElementById("down");
let leftBtn = document.getElementById("left");
let rightBtn = document.getElementById("right");

backBtn.addEventListener("click", () => {
    imgContainer.scrollTop -= 900;
    if (imgContainer.scrollTop <= 0) {
        imgContainer.scrollTop = imgContainer.scrollHeight;
    }
});

leftBtn.addEventListener("click", () => {
    imgContainer.scrollLeft -= 300;
    if (imgContainer.scrollLeft <= 0) {
        imgContainer.scrollLeft = imgContainer.scrollWidth;
    }
});

nextBtn.addEventListener("click", () => {
    imgContainer.scrollTop += 900;
    if (imgContainer.scrollTop + imgContainer.clientHeight >= imgContainer.scrollHeight) {
        imgContainer.scrollTop = 0;
    }
});

rightBtn.addEventListener("click", () => {
    imgContainer.scrollLeft += 300;
    if (imgContainer.scrollLeft + imgContainer.clientWidth >= imgContainer.scrollWidth) {
        imgContainer.scrollLeft = 0;
    }
});