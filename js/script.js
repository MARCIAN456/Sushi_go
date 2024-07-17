async function getProducts(db_name) {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch(db_name)
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску символу
            "="
        }
    }
    return ''
}

function getCardHTML(product) {
    return `<div class="sushi-card">
    <div class="sushi-card-img"><img src="${product.img}" alt=""></div>
    <div class="sushi-card-info">
        <p class="sushi-text-title">${product.title}</p>
        <p class="sushi-text-body">${product.description}</p>
        <p class="sushi-weight-body">Вага: ${product.weight}г</p>
    </div>
    <div class="sushi-card-footer">
        <span class="sushi-text-title">${product.price} грн</span>
        <div class="sushi-card-button" data-product='${JSON.stringify(product)}'>
            Замовити
        </div>
    </div>
</div>`
}

function getCartItem(product){
    return `<div class="sushi-card">
    <div class="sushi-card-img"><img src="${product.img}" alt=""></div>
    <div class="sushi-card-info">
        <p class="sushi-text-title">${product.title}</p>
        <p class="sushi-text-body">${product.description}</p>
        <p class="sushi-weight-body">Вага: ${product.weight}г</p>
    </div>
    <div class="sushi-card-footer">
        <p>Кількість: ${product.quentity}</p>
        <p class="sushi-text-title">${product.price*product.quentity} грн</p>
    </div>
</div>`
}

class ShoppingCart {
    constructor() {
        this.items = {}
        this.loadCartFromCookies()
    }
    addItem(item) {
        if (this.items[item.title]) {
            this.items[item.title].quentity += 1
        } else {
            this.items[item.title] = item
            this.items[item.title].quentity = 1
        }
        this.saveCartToCookies()



    }
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }
    // Завантаження кошика з кукі
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie);
        }
    }
}
let cart = new ShoppingCart()

function order(event) {
    let product = event.target.getAttribute('data-product')
    product = JSON.parse(product)
    cart.addItem(product)
    console.log(cart)
}


getProducts("db.json").then(function (products) {
    let productsList = document.querySelector('.sushi-list')
    if (productsList) {
        products.forEach(function (product) {
            // Відображаємо товари на сторінці
            productsList.innerHTML += getCardHTML(product)
        })
    }
    let order_buttons = document.querySelectorAll(".sushi-card-button")
    order_buttons.forEach(function(button){
        button.addEventListener("click", order)
    })

}) 

let cart_container = document.querySelector(".cart-container")
if (cart_container){
    for (let title in cart.items){
        cart_container.innerHTML += getCartItem(cart.items[title])
    }
}




