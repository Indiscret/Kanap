const reponse = await fetch("http://localhost:3000/api/products/");
const products = await reponse.json();

function showProducts(products) {

    const sectionItems = document.querySelector(".items");
    
    for (let i = 0; i < products.length; i++) {
        
        const linkElement = document.createElement("a");
        linkElement.href = "./product.html?id=" + products[i]._id;
    
        const productElement = document.createElement("article");
    
        const imageElement = document.createElement("img");
        imageElement.src = products[i].imageUrl;
        imageElement.alt = products[i].altTxt;
        productElement.appendChild(imageElement);
        
        const nameElement = document.createElement("h3");
        nameElement.innerText = products[i].name;
        nameElement.classList.add("productName");
        productElement.appendChild(nameElement);
    
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = products[i].description;
        descriptionElement.classList.add("productDescription");
        productElement.appendChild(descriptionElement);

        linkElement.appendChild(productElement);
        sectionItems.appendChild(linkElement);
    };
}
showProducts(products);