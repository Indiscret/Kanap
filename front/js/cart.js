const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
const reponse = await fetch("http://localhost:3000/api/products/");
const products = await reponse.json();

const sectionEmptyCart = document.querySelector("#cart__items");

function getCart(products) {
    if (productInLocalStorage === null || productInLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        sectionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let product in productInLocalStorage) {
            const currentProduct = products.find(element => element._id == productInLocalStorage[product]._id);
            const productArticle = document.createElement("article");
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', productInLocalStorage[product]._id);
            productArticle.setAttribute('data-color', productInLocalStorage[product].color);
            document.querySelector("#cart__items").appendChild(productArticle);

            const productDivImg = document.createElement("div");
            productDivImg.className = "cart__item__img";
            productArticle.appendChild(productDivImg);
            
            const productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = currentProduct.imageUrl;
            productImg.alt = currentProduct.altTxt;

            const productItemContent = document.createElement("div");
            productItemContent.className = "cart__item__content";
            productArticle.appendChild(productItemContent);

            const productItemContentDescription = document.createElement("div");
            productItemContentDescription.className = "cart__item__content__description";
            productItemContent.appendChild(productItemContentDescription);

            const productTitle = document.createElement("h2");
            productTitle.innerText = currentProduct.name;
            productItemContentDescription.appendChild(productTitle);

            const productColor = document.createElement("p");
            productColor.innerText = productInLocalStorage[product].color;
            productItemContentDescription.appendChild(productColor);

            const productPrice = document.createElement("p");
            productPrice.innerText = currentProduct.price + " €";
            productItemContentDescription.appendChild(productPrice);

            const productItemContentSettings = document.createElement("div");
            productItemContentSettings.className = "cart__item__content__settings";
            productItemContent.appendChild(productItemContentSettings);

            const productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);

            const productQte = document.createElement("p");
            productQte.innerText = "Qté : ";
            productItemContentSettingsQuantity.appendChild(productQte);

            const productQuantity = document.createElement("input");
            productQuantity.value = productInLocalStorage[product].quantity;
            productQuantity.setAttribute("type", "number");
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productItemContentSettingsQuantity.appendChild(productQuantity);

            const productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            productItemContentSettings.appendChild(productItemContentSettingsDelete);

            const productDeleted = document.createElement("p");
            productDeleted.className = "deleteItem";
            productDeleted.innerText = "Supprimer";
            productItemContentSettingsDelete.appendChild(productDeleted);
        }
    }
}
getCart(products);

function getTotal(pro) {
    let elementQuantity = document.getElementsByClassName('itemQuantity');
    let totalQuantity = 0;
    
    for(let i = 0; i < elementQuantity.length; i++) {
        totalQuantity += Number(elementQuantity[i].value);
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerText = totalQuantity;
    
    let totalPrice = 0;

    for(let i = 0; i < elementQuantity.length; i++) {
        const currentProduct = products.find(element => element._id == productInLocalStorage[i]._id);
        totalPrice += Number(elementQuantity[i].value) * Number(currentProduct.price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerText = totalPrice;
    
}
getTotal();

function updateQuantity() {
    document.addEventListener('change', function(event) {
        if(event.target.classList.contains('itemQuantity')) {
            if(event.target.value >= 1 && event.target.value <= 100) {
                getTotal();
                let product = productInLocalStorage.find(element => element._id == event.target.parentElement.parentElement.parentElement.parentElement.dataset.id && element.color == event.target.parentElement.parentElement.parentElement.parentElement.dataset.color);
                product.quantity = event.target.value;
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            }else {
                window.alert("Champ incorrect! La quantité doit être comprise entre 1 et 100");
            }
        }
    });
    
}
updateQuantity();

function deleteProduct() {
    const btnProductDeleted = document.querySelectorAll(".deleteItem");

    for(let i = 0; i < btnProductDeleted.length; i++) {
        btnProductDeleted[i].addEventListener('click' , function(event) {
            let product = productInLocalStorage.find(element => element._id == event.target.parentElement.parentElement.parentElement.parentElement.dataset.id && element.color == event.target.parentElement.parentElement.parentElement.parentElement.dataset.color);
            productInLocalStorage.splice(productInLocalStorage.indexOf(product), 1);
            localStorage.setItem("product" , JSON.stringify(productInLocalStorage));
            location.reload();
        });
    }
}
deleteProduct();