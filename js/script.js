"use strict";

const mainBox = document.getElementById("mineBox");
const Overlay = document.getElementById("overlay");
const ContentPh = document.getElementById("phConteiner");
const close = document.getElementById("close");

function xmlFunction(linki, gaparsuliInfoCallback) {
  const xml = new XMLHttpRequest();
  xml.open("GET", linki);
  xml.addEventListener("load", function () {
    const gaparsuliInfo = JSON.parse(this.responseText);

    gaparsuliInfoCallback(gaparsuliInfo);
  });
  xml.send();
}
xmlFunction(
  "https://jsonplaceholder.typicode.com/posts",
  function (rendomSaxeli) {
    rendomSaxeli.forEach((element) => {
      titleInfo(element);
    });
  }
);

function titleInfo(item) {
  const divConteiner = document.createElement("div");
  divConteiner.classList.add("divConteiner");
  divConteiner.setAttribute("data-id", item.id);

  const h3 = document.createElement("h3");
  h3.innerText = item.id;
  const h2 = document.createElement("h2");
  h2.innerText = item.title;

  // წაშლის ღილაკი
  const button = document.createElement("button");
  button.innerText = "Derete Post";
  button.setAttribute("item-id", item.id);
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    const delete1 = e.target.getAttribute("item-id");
    // console.log(delete1);
    deleteProperti(delete1);
  });

  divConteiner.appendChild(h3);
  divConteiner.appendChild(h2);
  divConteiner.appendChild(button);

  divConteiner.addEventListener("click", function () {
    const postId = this.getAttribute("data-id");
    // console.log(postId);
    Overlay.classList.add("activeOverlay");
    const newUrlPost = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    xmlFunction(newUrlPost, function (element) {
      detInfoWamogeba(element);
    });
  });

  mainBox.appendChild(divConteiner);

  //პოსტის წაშლა ფუნქცია

  function deleteProperti(delete1) {
    const deleteUrl = `https://jsonplaceholder.typicode.com/posts/${delete1}`;
    fetch(deleteUrl, {
      method: "DELETE",
    }).then(function (deletedata) {
      // console.log(deletedata);
      divConteiner.remove();
    });
  }
}
//  პოსტის ინფორმაციის დეტალური წამოღება

function detInfoWamogeba(item) {
  const pDescrp = document.createElement("p");
  pDescrp.classList.add("pharagrap1");
  pDescrp.innerText = item.body;
  ContentPh.appendChild(pDescrp);
}
// დახურვის ღილაკი
close.addEventListener("click", function () {
  Overlay.classList.remove("activeOverlay");
  ContentPh.innerHTML = " ";
});
