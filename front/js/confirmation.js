// Récupère l'id de la commande via l'url pour ensuite l'afficher
function showOrderId() {
    const spanOrderId = document.getElementById("orderId");
    let url = new URL(window.location.href);
    let orderId = url.searchParams.get("orderId");
    spanOrderId.innerText = orderId;
}
showOrderId();
