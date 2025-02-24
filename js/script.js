//get id hanyaambil element yang pertama saja
//return = single object
console.log(document.getElementById("title"));

//get element by tag
//return = array of object
console.log(document.getElementsByTagName("h2"));

console.log(document.getElementsByClassName("wrap"));

//AMBIL ELEMENT PERTAMA
console.log(document.querySelector("h2.heading"));
//bisa ambil
// class
// id
// tag
// parent child "table tbody"

console.log(document.querySelectorAll(".wrap"));
// return array of object

const firstWrap = document.querySelector(".wrap");
const paragraph = document.createElement("p");
paragraph.innerHTML = "lorem bubur sumsum";

const headerUl = document.createElement("ul");
const days = ["senin", "selasa", "rabu"];
days.forEach((val) => {
  const li = document.createElement("li");
  li.innerText = val;
  headerUl.appendChild(li);
});
firstWrap.appendChild(paragraph);
firstWrap.appendChild(headerUl);
