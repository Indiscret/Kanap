const reponse = await fetch("http://localhost:3000/api/products/");
const products = await reponse.json();

// Crée les élements, à l'aide des informations de chaque produit, pour ensuite les afficher sur la page d'accueil
function showProducts(products) {

    const sectionItems = document.querySelector(".items");
    
    for (let product of products) {
        
        const linkElement = document.createElement("a");
        linkElement.href = "./product.html?id=" + product._id;
    
        const productElement = document.createElement("article");
    
        const imageElement = document.createElement("img");
        imageElement.src = product.imageUrl;
        imageElement.alt = product.altTxt;
        productElement.appendChild(imageElement);
        
        const nameElement = document.createElement("h3");
        nameElement.innerText = product.name;
        nameElement.classList.add("productName");
        productElement.appendChild(nameElement);
    
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = product.description;
        descriptionElement.classList.add("productDescription");
        productElement.appendChild(descriptionElement);

        linkElement.appendChild(productElement);
        sectionItems.appendChild(linkElement);
    };
}
showProducts(products);