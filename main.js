let popupSmallImgContainer = document.querySelectorAll("#popUpSmallImgContainer")
let smallImgContainer = document.querySelectorAll(".small-img-container")
let popupSmallImg = document.querySelectorAll(".popUpSmallImg")
let popUpMainImg = document.querySelector("#PopupmainImg")
let allSmallImg = document.querySelectorAll(".smallImg")
let mainImg = document.getElementById("mainImg");
const cartItem = document.querySelector(".cart-item")
const addToCartBtn = document.querySelector("#addToCartBtn");
let amountCount = document.querySelector("#amount")
let menuContainer = document.getElementById("menu-container")
const overlay = document.querySelector(".overlay")

let dataStore = {
  imgCount: 1,
  itemCount: 0,
}

updateCart();

function openCart(bool) {
  if(bool){
   cartItem.style.display = "block"
  }  
  else {
    cartItem.style.display = "none"
  }
}

function showPopup(bool){
  const popUpImgContainer = document.querySelector(".popup-img-container")
  const showImgContainer = document.querySelector(".popup-shoes-img-container")
  if(bool){
    overlay.classList.remove("hidden")
    popUpImgContainer.classList.remove("hidden")
    showImgContainer.classList.remove("hidden")
  }else{
    overlay.classList.add("hidden")
    popUpImgContainer.classList.add("hidden")
    showImgContainer.classList.add("hidden")

    // reseting img
    changeSmallImgActiveState(dataStore.imgCount - 1, allSmallImg, smallImgContainer);
    mainImg.src = `images/image-product-${dataStore.imgCount}.jpg`;
  }
}

function changePopupMainImg(bool) {
  if(bool){
    if(dataStore.imgCount == 4) return
    dataStore.imgCount++;
    changeSmallImgActiveState(dataStore.imgCount-1, popupSmallImg, popupSmallImgContainer)
  }else{
    if(dataStore.imgCount == 1) return
    dataStore.imgCount--;
    changeSmallImgActiveState(dataStore.imgCount-1, popupSmallImg, popupSmallImgContainer)
  }
  popUpMainImg.src = `images/image-product-${dataStore.imgCount}.jpg`
}

function changeMainImg(bool) {
  if(bool){
    if(dataStore.imgCount == 4) return
    dataStore.imgCount++;
  }else{
    if(dataStore.imgCount == 1) return
    dataStore.imgCount--;
  }
  mainImg.src = `images/image-product-${dataStore.imgCount}.jpg`
}

// option img eventlistener
function changeSmallImg(num){
  changeSmallImgActiveState(num, allSmallImg, smallImgContainer)
  dataStore.imgCount = num + 1;
  popUpMainImg.src = `images/image-product-${dataStore.imgCount}.jpg`
  changeSmallImgActiveState(dataStore.imgCount-1, popupSmallImg, popupSmallImgContainer)
  mainImg.src = `images/image-product-${dataStore.imgCount}.jpg`
}

function changeSmallImgActiveState(el, img, imgContainer) {
  for(let i = 0; i < allSmallImg.length; i++){
    img[i].classList.remove("current-img-display")
    imgContainer[i].classList.remove("active-border")
  }
  img[el].classList.add("current-img-display")
  img[el].parentElement.classList.add("active-border")
}

function increment() {
  dataStore.itemCount++;
  updateTextAmount();
}

function decrement() {
  if(dataStore.itemCount == 0) return
  dataStore.itemCount--;
  updateTextAmount();
}

function updateTextAmount () {
  amountCount.innerText = dataStore.itemCount;
}
// add to cart button listener
addToCartBtn.addEventListener("click", () => {
  updateAmount();
  updateCart();
})

function updateAmount() {
  updateCart();
  let itemCount = document.querySelector(".itemCountShow");
  if(dataStore.itemCount === 0){
    itemCount.classList.add("hidden")
    itemCount.innerText = ""
  }else{
    itemCount.classList.remove("hidden")
    itemCount.innerText = dataStore.itemCount
  }
}

function updateCart() {
  const h3 = document.createElement("h3")
  h3.className = "text-dark-gray-blue empty-cart flex";
  if(dataStore.itemCount === 0) {
    removeActiveDiv();
    if(document.querySelector(".empty-cart")) return
    h3.innerText = "Your Cart Is Empty";
    cartItem.appendChild(h3)
  }else{
    if(document.querySelector(".empty-cart")){
      h3.innerText = "";
      document.querySelector(".empty-cart").remove()
    }
    const activeCartDiv = document.createElement("div")
    removeActiveDiv();
    activeCartDiv.className = "cart-item-active flex";
    activeCartDiv.innerHTML = `
    <div class="flex">
    <img src="images/image-product-1-thumbnail.jpg" class="cart-item-img">
    <div class="text-dark-gray-blue cart-item-active-text">
      <h4>Fall Limited Edition Sneakers</h4>
      <h4>$ 125.00 x ${dataStore.itemCount} <span class="text-black">$ ${125 * dataStore.itemCount}.00</span></h4>
    </div>
      <img src="images/icon-delete.svg" id="delete-icon" onclick="resetItem()" alt="">
    </div>
    <button class="add-to-cart-btn">Checkout</button>
    `

    cartItem.appendChild(activeCartDiv)
  }
}

function removeActiveDiv() {
  if(document.querySelector(".cart-item-active")){
    document.querySelector(".cart-item-active").remove();
  }
}

function resetItem () {
  dataStore.itemCount = 0;
  removeActiveDiv();
  updateCart();
  updateAmount();
  updateTextAmount();
}

// for middle and small screen size menu
function openMenu() {
  menuContainer.style.left = "-40px"
  overlay.classList.remove("hidden")
}

function closeMenu() {
  menuContainer.style.left = "-400px"
  overlay.classList.add("hidden")
}