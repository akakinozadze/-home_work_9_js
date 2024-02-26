"use strict";

const mainBox = document.getElementById("mineBox");
const Overlay = document.getElementById("overlay");
const ContentPh = document.getElementById("phConteiner");
const close = document.getElementById("close");
const post = document.getElementById("post");
const OverlayADD = document.getElementById("postAdd");
const form = document.getElementById("form-overlay");
const close2 = document.getElementById("close2");

// function xmlFunction(linki, gaparsuliInfoCallback) {
//   const xml = new XMLHttpRequest();
//   xml.open("GET", linki);
//   xml.addEventListener("load", function () {
//     const gaparsuliInfo = JSON.parse(this.responseText);

//     gaparsuliInfoCallback(gaparsuliInfo);
//   });
//   xml.send();
// }
// xmlFunction(
//   "https://jsonplaceholder.typicode.com/posts",
//   function (rendomSaxeli) {
//     rendomSaxeli.forEach((element) => {
//       titleInfo(element);
//     });
//   }
// );

function fetch1(url, callback) {
  fetch(url, {
    method: "GET",
  })
    .then(function (item) {
      if (item.status !== 200) {
        throw item.status;
      }
      return item.json();
    })
    .then(function (respons) {
      callback(respons);
    })
    .then(function (error) {
      if (error == 404) {
        console.log("Page Not Found");
      } else if (error == 500) {
        console.log("Server Error");
      }
    });
}

fetch1("https://jsonplaceholder.typicode.com/posts", forEachFnc);

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
  button.innerText = "Delete Post";
  button.setAttribute("item-id", item.id);
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    const delete1 = e.target.getAttribute("item-id");
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
    fetch1(newUrlPost, function (element) {
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

// ასი პოსტის ფუნქცია
function forEachFnc (rendomSaxeli) {
  rendomSaxeli.forEach((element) => {
    titleInfo(element);
  });
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

// პოსტის დამატება
post.addEventListener("click", function () {
  OverlayADD.classList.add("overlayInside");
});

form.addEventListener("submit", function (e) {
  e.preventDefault(); // დასაბმითების (პოსტის გაგზავნის დროს) დროს რომ არ დარესტარტდეს გვერდი
  let formSendInfo = {
    title: e.target.value,
    userid: 11,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formSendInfo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((sendObj) => {
      // გაგზავნას რომ დააწვება დაიხურება გვერდი
      titleInfo(sendObj); // დომში დაამატებს 101 ობიექტს (გაგზავნილი პოსტი დაემატება)
      OverlayADD.classList.remove("overlayInside");
      e.target[0].value = ""; //  გაასუფთავებს ველიუს
    });
});
// პოსტის გაგზავნის გვერდის დახურვა
close2.addEventListener("click", function () {
  OverlayADD.classList.remove("overlayInside");
});
