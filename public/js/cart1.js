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
        image: 'images/bed-repair.jpeg',
        title: 'Bed repair',
        price: 1149,
    },
    {
        id: 1,
        image: 'images/cupboard-hinge.jpeg',
        title: 'Cupboard Hinge repair',
        price: 299,
    },
    {
        id: 2,
        image: 'images/cupboard-drawer.jpeg',
        title: 'Cupboard drawer repair',
        price: 599,
    },
    {
        id: 3,
        image: 'images/door-installation.jpeg',
        title: 'Door Installation',
        price: 999,
    },
    {
        id: 4,
        image: 'images/Peephole.jpeg',
        title: 'Peephole Installation',
        price: 99,
    },
    {
        id: 5,
        image: 'images/door-handle.jpeg',
        title: 'Door handle Installation',
        price: 349,
    },
    {
        id: 6,
        image: 'images/mesh-door.jpeg',
        title: 'Mosquito mesh door',
        price: 1150,
    },
    {
        id: 7,
        image: 'images/window.jpeg',
        title: 'Window Installation',
        price: 799,
    },
    {
        id: 8,
        image: 'images/dining-table.webp',
        title: 'Dining table assembly',
        price: 1250,
    },
    {
        id: 9,
        image: 'images/chair.jpeg',
        title: 'Chair',
        price: 299,
    },
    {
        id: 10,
        image: 'images/wooden-shelf.webp',
        title: 'wooden shelf installation',
        price: 300,
    },
    {
        id: 11,
        image: 'images/glass-shelf.webp',
        title: 'Glass shelf installation',
        price: 349,
    },
    {
        id: 12,
        image: 'images/utensils-rack.webp',
        title: 'Utensils rack installation',
        price: 299,
    },
    {
        id: 13,
        image: 'images/curtain-rod.webp',
        title: 'Curtain rod Installation',
        price: 299,
    },
    {
        id: 14,
        image: 'images/door-stopper.webp',
        title: 'Door stopper',
        price: 109,
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
