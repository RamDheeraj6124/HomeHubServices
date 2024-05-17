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
        image: 'images/switchboard-installation.png',
        title: 'Switchbox Installation',
        price: 249,
    },
    {
        id: 1,
        image: 'images/ac-switchbox.webp',
        title: 'AC Switchbox installation',
        price: 299,
    },
    {
        id: 2,
        image: 'images/fan-installation.jpeg',
        title: 'Fan Installation',
        price: 799,
    },
    {
        id: 3,
        image: 'images/exhaust-fan.webp',
        title: 'Exhaust Fan Installation',
        price: 499,
    },
    {
        id: 4,
        image: 'images/fan-repair.webp',
        title: 'Fan Repair',
        price: 999,
    },
    {
        id: 5,
        image: 'images/regulator.webp',
        title: 'Fan Regulator Replacement',
        price: 149,
    },
    {
        id: 6,
        image: 'images/light-installation.jpeg',
        title: 'Light installation',
        price: 150,
    },
    {
        id: 7,
        image: 'images/wall-light.webp',
        title: 'Wall Light Installation',
        price: 399,
    },
    {
        id: 8,
        image: 'images/bulb-holder.webp',
        title: 'Bulb holder installation',
        price: 150,
    },
    {
        id: 9,
        image: 'images/wiring.webp',
        title: 'Wiring (Per 5m)',
        price: 299,
    },
   
 
    {
        id: 10,
        image: 'images/Door-bell.jpeg',
        title: 'Door bell installation',
        price: 300,
    },
    {
        id: 11,
        image: 'images/mcb-fuse.webp',
        title: 'MCB fuse replacement',
        price: 349,
    },
    {
        id: 12,
        image: 'images/sub-meter.webp',
        title: 'Sub Meter installation',
        price: 699,
    },
    {
        id: 13,
        image: 'images/inverter.jpeg',
        title: 'Inverter Installation',
        price: 359,
    },
    {
        id: 14,
        image: 'images/inverter-repair.webp',
        title: 'Inverter Repair',
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
