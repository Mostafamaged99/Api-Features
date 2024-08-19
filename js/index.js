//!=====  HTML ELEMENTS =====!\\
const cards = document.querySelector(".cards")
const buttons = document.querySelectorAll(".btn")
const sortedButtons = document.querySelectorAll(".sorted-buttons")
const searchBar = document.querySelector(".search-bar")
//!=====  variables =====!\\
const apiLink = 'https://fakestoreapi.com/products';
let elements; 
let productNames;
let productPrices;
let pricesArray;
let lowToHighArray;
let highToLowArray;
//!=====  FUNCTIONS =====!\\
async function getProducts() {
    const res = await fetch(apiLink)
    const data = await res.json();
    displayCards(data);
    filterProduct("All");
    console.log(data);
}
getProducts()

function displayCards(data) {
    let box = ""
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-4 ">
            <div class=" m-4 px-4 py-2  card ${data[i]?.category} hidden">
                    <img class="w-100" src=${data[i]?.image} alt="">
                    <h5 class="text-center product-title">${data[i]?.title}</h5>
                    <p class="text-center product-Price">Price: ${data[i]?.price}</p>
            </div>
        </div>  
        `
    }
    cards.innerHTML = box;
    elements = document.querySelectorAll(".card");
    productNames = document.querySelectorAll(".product-title");
}

function filterProduct(value) {
    buttons.forEach((button)=>{
        if (value.toLowerCase()== button.innerText.toLowerCase()) {
            button.classList.add("active");
        }
        else{
            button.classList.remove("active");
        }
       elements?.forEach((element)=>{
            if (value=="All") {
                element.classList.remove("hidden")
            }
            else{
                if (element.classList.contains(value)) {
                    element.classList.remove("hidden")
                }
                else{
                    element.classList.add("hidden")
                }
            }
       })
    })
}

//!=====  EVENTS =====!\\
searchBar.addEventListener("input", (e)=>{
    let value = e.target.value;
    productNames?.forEach((name,i)=>{
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            elements[i].classList.remove("hidden")
        }
        else{
            elements[i].classList.add("hidden")
        }
    })
})

// const points = [40, 100, 1, 5, 25, 10];
// points.sort(function(a, b){return a - b});
// console.log(points);
