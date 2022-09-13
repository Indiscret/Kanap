const reponse = await fetch("http://localhost:3000/api/products/");
const products = await reponse.json();

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
}

function showProductInfo(products) {
   const id = getProductIdFromUrl();

   const product = products.find(product => product._id === id);

   const divItemImage = document.querySelector(".item__img");

   const imageElement = document.createElement("img");
   imageElement.src = product.imageUrl;
   imageElement.alt = product.altTxt;
   divItemImage.appendChild(imageElement);
   
   const h1Title = document.getElementById("title");
   h1Title.innerText = product.name;

   const spanPrice = document.getElementById("price");
   spanPrice.innerText = product.price;

   const pDescription = document.getElementById("description");
   pDescription.innerText =  product.description;

   const selectColors = document.querySelector("#colors");
   for (let i = 0; i < product.colors.length; i++) {
       const optionColors = document.createElement("option");
       optionColors.text = product.colors[i];
       optionColors.value = product.colors[i];
       selectColors.appendChild(optionColors);
   } 
}
showProductInfo(products);


function addToCart(id) {
    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", function() {
        let arrayProduct = JSON.parse(localStorage.getItem("product"));
        const colorSelected = document.getElementById("colors").value;
        const quantitySelected = document.getElementById("quantity").value;
        

        if(!colorSelected || (quantitySelected > 100 || quantitySelected < 1)) {
             window.alert("Champ incorrect! Couleur non définie ou quantité incorrect");
        } else {
            const productToAdd = {
                _id: id,
                color: colorSelected,
                quantity: quantitySelected,
            }
            
            if (arrayProduct == null) {
                arrayProduct = [];
                arrayProduct.push(productToAdd);
            } else {
                const productAlreadyInCart = arrayProduct.find(product => product._id == productToAdd._id && product.color == productToAdd.color);
                if(productAlreadyInCart) {
                    const index = arrayProduct.indexOf(productAlreadyInCart);
                    arrayProduct[index].quantity = Number(arrayProduct[index].quantity) + Number(quantitySelected);
                } else {
                    arrayProduct.push(productToAdd);
                }
            }
            localStorage.setItem("product",JSON.stringify(arrayProduct));
            location.replace("./index.html");
        }
    });
}
addToCart(getProductIdFromUrl());