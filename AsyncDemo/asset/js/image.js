const containerImage = document.querySelector(".container");
document.addEventListener("DOMContentLoaded", imgView);

async function loadImg() {
  let response = await fetch("https://picsum.photos/v2/list");
  let data = await response.json();
  return data;
}

function imgView() {
  loadImg().then((images) => {
    var imagesOnHtml = "";
    for (let index = 0; index < images.length - 12; index++) {
      imagesOnHtml += `
            <div class="row mt-3  p-2 py-5">
            <div class="col-md img-cell">
            <img src="${
              images[index + 12].download_url
            }" style="height: 15rem; width: 100%; object-fit: cover;" alt="">
            </div>

            <div class="col-md img-cell">
            <img src="${
              images[index + 1].download_url
            }" style="height: 15rem; width: 100%; object-fit: cover;" alt="">
            </div>    
            <div class="col-md img-cell">
            <img src="${
              images[index + 6].download_url
            }" style="height: 15rem; width: 100%; object-fit: cover;" alt="">
            </div>   
        </div>
          `;
          if (index > 1){
              break;
          }
    }
    containerImage.innerHTML = imagesOnHtml;
  });
}
function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

function changeImg(change) {
  document.querySelector("#current-img").remove();
  let galleryImages = document.querySelectorAll(".img-cell");
  let getImgWindow = document.querySelector("img-window");
  let newImg = document.createElement("img");
  console.log(getImgWindow);
  getImgWindow.appendChild(newImg);
  let clacNewImg;
  if (change === 1) {
    clacNewImg = getLatestOpenedImg + 1;
    if (clacNewImg > galleryImages.length) {
      clacNewImg = 1;
    }
  } else if (change === 0) {
    clacNewImg = getLatestOpenedImg - 1;
    if (clacNewImg < 1) {
      clacNewImg.galleryImages.length;
    }
  }

  newImg.setAttribute(
    "src",
    galleryImages[clacNewImg].firstElementChild.getAttribute("src")
  );
  return newImg;
}

setTimeout(() => {
  let galleryImages = document.querySelectorAll(".img-cell");
  let getLatestOpenedImg;
  let windowWidth = window.innerWidth;
  galleryImages.forEach(function (image, index) {
    image.onclick = function () {
      getLatestOpenedImg = index + 1;

      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      let newImg = image.firstElementChild.cloneNode();
      newImgWindow.appendChild(newImg);
      newImg.removeAttribute("style");
      newImg.classList.remove("img-cell");
      newImg.classList.add("popup-img");
      newImg.setAttribute("id", "current-img");

      function changeImg1() {
        document.querySelector("#current-img").remove();
        let galleryImages = document.querySelectorAll(".img-cell");
        let newImg = document.createElement("img");
        newImg.classList.add("popup-img");
        newImg.setAttribute("id", "current-img");

        newImgWindow.appendChild(newImg);
        let clacNewImg;
        clacNewImg = getLatestOpenedImg + 1;
        if (clacNewImg >= galleryImages.length) {
          clacNewImg = 1;
          getLatestOpenedImg = 1;
        }
        console.log(
          getLatestOpenedImg +
            "fsdf " +
            galleryImages.length +
            "fdsg " +
            clacNewImg
        );
        newImg.setAttribute(
          "src",
          galleryImages[clacNewImg].firstElementChild.getAttribute("src")
        );
        getLatestOpenedImg += +1;
      }
      function changeImg0() {
        document.querySelector("#current-img").remove();
        let galleryImages = document.querySelectorAll(".img-cell");
        let newImg = document.createElement("img");
        newImg.classList.add("popup-img");
        newImg.setAttribute("id", "current-img");

        newImgWindow.appendChild(newImg);
        let clacNewImg;
        clacNewImg = getLatestOpenedImg - 1;
        if (clacNewImg < 0) {
          clacNewImg = galleryImages.length - 1;
          getLatestOpenedImg = galleryImages.length - 1;
        }
        console.log(
          getLatestOpenedImg +
            "fsdf " +
            galleryImages.length +
            "fdsg " +
            clacNewImg
        );
        newImg.setAttribute(
          "src",
          galleryImages[clacNewImg].firstElementChild.getAttribute("src")
        );
        getLatestOpenedImg += -1;
      }

      newImg.onload = function () {
        let newNextBtn = document.createElement("a");
        newNextBtn.innerHTML = "<i class='fas fa-chevron-right next'></i>";
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        // newNextBtn.setAttribute("onclick", "changeImg(1)");
        newNextBtn.addEventListener("click", changeImg1);

        let newPrevBtn = document.createElement("a");
        newPrevBtn.innerHTML = "<i class='fas fa-chevron-left next'></i>";
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        // newPrevBtn.setAttribute("onclick", changeImg0);
        newPrevBtn.addEventListener("click", changeImg0);
      };
    };
  });
}, 2000);
