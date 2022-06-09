let SashaTest = document.getElementById("edit-button");
let MopsTest = document.querySelector(".popup");

SashaTest.addEventListener("click", function() {
    MopsTest.classList.add("popup_opened");
  });

let CatTest = document.getElementById("close-button");

CatTest.addEventListener("click", function() {
    MopsTest.classList.remove("popup_opened");
});


  