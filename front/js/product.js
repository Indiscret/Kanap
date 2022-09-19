const reponse = await fetch("http://localhost:3000/api/products/");
const products = await reponse.json();

// Renvois l'id d'un produit récupéré à partir de l'url
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
}

// Crée les éléments du produit et les affiche à l'aide de la fonction getProductIdFromUrl
function showProductInfo(products) {
    const id = getProductIdFromUrl();

    const product = products.find(product => product._id === id);

    const title = document.querySelector("title");
    title.innerText = product.name;

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
    pDescription.innerText = product.description;

    const selectColors = document.querySelector("#colors");

    for (let color of product.colors) {
        const optionColors = document.createElement("option");
        optionColors.text = color;
        optionColors.value = color;
        selectColors.appendChild(optionColors);
    }
}
showProductInfo(products);

// Ajoute les produits au panier en vérifiant bien que la quantité soit comprise entre 0 et 100 et qu'une couleur soit selectionnée
function addToCart(id) {
    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", function () {
        const colorSelected = document.getElementById("colors").value;
        const quantitySelected = document.getElementById("quantity").value;


        if (!colorSelected || !(quantitySelected <= 100 && quantitySelected >= 1)) {
            window.alert("Champ incorrect! Couleur non définie ou quantité incorrect");
        } else {
            let arrayProduct = JSON.parse(localStorage.getItem("product"));

            const productToAdd = {
                _id: id,
                color: colorSelected,
                quantity: quantitySelected,
            };

            if (arrayProduct == null) {
                arrayProduct = [];
                arrayProduct.push(productToAdd);
            } else {
                const productInCart = arrayProduct.find(product => product._id == productToAdd._id && product.color == productToAdd.color);
                if (productInCart) {
                    if (parseInt(productInCart.quantity) + parseInt(productToAdd.quantity) <= 100) {
                        arrayProduct.forEach(product => {
                            if (product._id == productToAdd._id && product.color == productToAdd.color) {
                                product.quantity = parseInt(product.quantity) + parseInt(productToAdd.quantity);
                            }
                        });
                    } else {
                        return window.alert("Quantité maximale dans le panier atteinte");
                    }
                } else {
                    arrayProduct.push(productToAdd);
                }
            }
            localStorage.setItem("product", JSON.stringify(arrayProduct));
            location.replace("./index.html");
        }
    });
}
addToCart(getProductIdFromUrl());