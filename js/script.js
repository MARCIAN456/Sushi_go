async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("db.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

function getCardHTML(product){
    return `<div class="sushi-card">
    <div class="sushi-card-img"><img src="${product.img}" alt=""></div>
    <div class="sushi-card-info">
        <p class="sushi-text-title">${product.title}</p>
        <p class="sushi-text-body">${product.description}</p>
    </div>
    <div class="sushi-card-footer">
        <span class="sushi-text-title">${product.price}</span>
        <div class="sushi-card-button">
            Замовити
        </div>
    </div>
</div>`
}

getProducts().then(function (products) {
    let productsList = document.querySelector('.products-list')
    if (productsList) {
        products.forEach(function (product) {
            // Відображаємо товари на сторінці
            productsList.innerHTML += getCardHTML(product)
        })
    }
}  