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
    const btnProductDeleted = document.getElementsByClassName("deleteItem");

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

function getForm() {
    const form = document.querySelector(".cart__order__form");

    const nameRegExp = new RegExp("^[a-zA-Zàâäéèêëîïìôöòûüùç,.'-]+$");
    const addressRegExp = new RegExp("^[0-9]{1,3}(?:[,. ]{1}[-a-zA-Zàâäéèêëîïìôöòûüùç]+)+$");
    const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    const validFirstName = function(inputFirstName) {
        let firstNameErrrorMsg = inputFirstName.nextElementSibling;
        if(nameRegExp.test(inputFirstName.value)) {
            firstNameErrrorMsg.innerText = "";
        } else {
            firstNameErrrorMsg.innerText = "Veuillez renseigner votre prénom.";
        }
    }

    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        if(nameRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerText = "";
        } else {
            lastNameErrorMsg.innerText = "Veuillez renseigner votre nom.";
        }
    }

    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;
        if(addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerText = "";
        } else {
            addressErrorMsg.innerText = "Veuillez renseigner votre adresse.";
        }
    }

    form.city.addEventListener('change', function() {
        validCity(this);
    });

    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;
        if(nameRegExp.test(inputCity.value)) {
            cityErrorMsg.innerText = "";
        } else {
            cityErrorMsg.innerText = "Veuillez renseigner votre ville.";
        }
    }

    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = "";
        } else {
            emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
        }
    }
}
getForm();

function postForm() {
    const form = document.querySelector(".cart__order__form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const contact = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value,
        }
        let products = productInLocalStorage.map(product => product._id);
        const order = {
            contact,
            products,
        }

        fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then((reponse) => reponse.json())
        .then(data => window.location.href = "confirmation.html?orderId=" + data.orderId)
    });
}
postForm();
