// Function to get cart data from localStorage
function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
}

// Function to save cart data to localStorage
function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load existing cart from localStorage
var cart = getCartFromLocalStorage();

// Display existing cart on page load
displaycart();

// Function to add item to the cart
function addtocart(a) {
    cart.push({ ...categories[a] });
    saveCartToLocalStorage(cart); // Save the updated cart to localStorage
    displaycart();
}

// Function to remove item from the cart
function delElement(a) {
    cart.splice(a, 1);
    saveCartToLocalStorage(cart); // Save the updated cart to localStorage
    displaycart();
}

// Function to display cart
function displaycart() {
    let j = 0,
        total = 0;
    document.getElementById('count').innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML =
            "<img src='images/emptycart_2.png' alt='Empty Cart'><p>Your cart is empty</p>";
        document.getElementById('total').innerHTML = '₹ ' + 0 + '.00';
    } else {
        document.getElementById('cartItem').innerHTML = cart
            .map((items) => {
                var { image, title, price } = items;
                total = total + price;
                document.getElementById('total').innerHTML = '₹ ' + total + '.00';
                return (
                    `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size: 15px;'>₹ ${price}.00</h2>` +
                    "<i class='fa-solid fa-trash' onclick='delElement(" +
                    j++ +
                    ")'></i></div>"
                );
            })
            .join('');
    }
}

// Original code for categories and rendering products
const product = [
    {
        id: 0,
        image: 'images/shower-repair.jpg',
        title: 'Shower Installation',
        price: 120,
    },
    {
        id: 1,
        image: 'images/Plumbing-Repairs.jpg',
        title: 'Washing Basin',
        price: 500,
    },
    {
        id: 2,
        image: 'images/wash-basin-installation.jpg',
        title: 'Wash Basin Installation',
        price: 230,
    },
    {
        id: 3,
        image: 'images/Bathroom-Tile-Filling-Service.jpg',
        title: 'Tile-Filling',
        price: 500,
    },
    {
        id: 4,
        image: 'images/Tap-filter.jpg',
        title: 'Tap-Filter',
        price: 150,
    },
    {
        id: 5,
        image: 'images/Drain-cover.jpg',
        title: 'Drain Cover',
        price: 180,
    },
    {
        id: 6,
        image: 'images/Flush-tank.jpg',
        title: 'Flush Tank',
        price: 200,
    },
    {
        id: 7,
        image: 'images/Indian-Toliet.jpg',
        title: 'Indian Toilet Installation',
        price: 1899,
    },
    {
        id: 8,
        image: 'images/Westren-toilet.jpg',
        title: 'Westren Toilet Installation',
        price: 1899,
    },
    {
        id: 9,
        image: 'images/jet-spary.jpg',
        title: 'Jet Spray Installation/Service',
        price: 150,
    },
    {
        id: 10,
        image: 'images/Hot-and-cold.jpg',
        title: 'Hot / cold water mixer repair',
        price: 300,
    },
    {
        id: 11,
        image: 'images/Tap-repair.jpg',
        title: 'Tap-Repair',
        price: 149,
    },
    {
        id: 12,
        image: 'images/Tank-installation.jpg',
        title: 'Tank-Repair',
        price: 1099,
    },
    {
        id: 13,
        image: 'images/pipeline-leakage.jpg',
        title: 'pipeline-leakage',
        price: 359,
    },
    {
        id: 14,
        image: 'images/Motor-installation.png',
        title: 'Motor-installation / Repair',
        price: 509,
    }

];

const categories = [...new Set(product.map((item) => item))];
let i = 0;
document.getElementById('root').innerHTML = categories
    .map((item) => {
        var { image, title, price } = item;
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image}></img>
                </div>
                <div class='bottom'>
                    <p> ${title}</p>
                    <h2>₹ ${price}.00</h2>` +
            "<button onclick='addtocart(" + (i++) + ")'>Add to cart</button>" +
            `</div>
        </div>`
        );
    })
    .join('');