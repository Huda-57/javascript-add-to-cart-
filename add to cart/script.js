var data=[
{
    Name:"Enchanted Rose Timepiece",
    image:"img/1.jpg",
    price:500,
},
{
    Name:"Majestic",
    image:"img/2.jpg",
    price:800,
},
{
    Name:"Golden Spark",
    image:"img/3.jpg",
    price:400,
},
{
    Name:"Integral",
    image:"img/4.jpg",
    price:1000,
},
{
    Name:"Crystal View",
    image:"img/5.jpg",
    price:900,
},
{
    Name:"Diamond Dazzle Fusion",
    image:"img/6.jpg",
    price:300,
},
{
    Name:"Beauteous Saphire",
    image:"img/7.jpg",
    price:200,
},
{
    Name:"SparkleStone",
    image:"img/8.jpg",
    price:600,
}
];

if (document.querySelector(".product")) {
    for (var i = 0; i < data.length; i++) {
        document.querySelector(".product .row").innerHTML += `
            <div class="col-lg-4 p-3">
                <div class="card" style="width: 18rem;">
                    <img src="${data[i].image}" class="card-img-top" alt="..." height="250px">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].Name}</h5>
                        <p class="card-text">${data[i].price}$</p>
                        <button class="btn btn-primary add-to-cart" data-index="${i}">Add to Cart <i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
    }
}

const mySection = document.getElementById('cart');
let closeButton = document.getElementById('close');

closeButton.addEventListener('click', () => {
    mySection.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const addedProducts = new Map();
    let total = 0;

    cartIcon.addEventListener('click', function(event) {
        event.stopPropagation(); 
        cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function(event) {
        if (!cart.contains(event.target) && event.target !== cartIcon) {
            cart.style.display = 'none';
        }
    });

    cart.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productIndex = this.getAttribute('data-index');
            const productName = data[productIndex].Name;
            const productPrice = parseFloat(data[productIndex].price);
            const productimg = data[productIndex].image;
            const productKey = `${productName}-${productPrice}`;

            if (addedProducts.has(productKey)) {
                alert('This product is already in the cart!');
            } else {
                addedProducts.set(productKey, { name: productName, price: productPrice, image: productimg });

                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    <img src="${productimg}" alt="..." height="30px" width="30px" style="border-radius: 5px;">
                    ${productName} - ${productPrice}$ -
                    <i class="fa-solid fa-trash delete-item" style="color: #fefefe;"></i>
                `;
                cartItems.appendChild(cartItem);

                cart.style.display = 'block';

                total += productPrice;
                document.getElementById('total').textContent = `$ ${total.toFixed(2)}`;
            }
        });
    });

    // trash item
    cartItems.addEventListener('click', function(event) {
        if (event.target.classList.contains('fa-trash')) {
            const item = event.target.parentNode;
            const itemName = item.textContent.split(' - ')[0]; // Get the item name
            const itemPrice = parseFloat(item.textContent.split(' - ')[1].replace('$', '')); // Get the item price
            const itemKey = `${itemName}-${itemPrice}`;

            addedProducts.delete(itemKey);
            total -= itemPrice;
            document.getElementById('total').textContent = `$ ${total.toFixed(2)}`;
            item.remove();
        }
    });
});
const checkoutButton = document.getElementById('checkout');

document.addEventListener('DOMContentLoaded', function() {

    checkoutButton.addEventListener('click', function() {
        const total = parseFloat(document.getElementById('total').textContent.replace('$', '').trim());
        const deliveryCharge = 50;
        const totalPrice = total + deliveryCharge;

        const totalPriceElement = document.getElementById('totalprice');
        const deliveryChargesElement = document.getElementById('deliverycharges');
        const finalPriceElement = document.getElementById('finalprice');

        totalPriceElement.textContent = `Total Amount: $${total.toFixed(2)}`;
        deliveryChargesElement.textContent = `Delivery Charges: $${deliveryCharge.toFixed(2)}`;
        finalPriceElement.textContent = `Final Price: $${totalPrice.toFixed(2)}`;

        const placeOrderButton = document.getElementById('placeorder');
        placeOrderButton.addEventListener('click', function() {
            if (totalPrice > 50) {
                alert('Your order is placed.');
            } else {
      
                alert('Please select items to place an order.');
            }
        });
    });
});