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
        image: 'images/furniture_repair1.jpg',
        title:"Scratches",
        price: 999,
    },
    {
        id: 1,
        image: 'images/furniture_repair2.jpg',
        title: "Dents",
        price: 1999,
    },
    {
        id: 2,
        image: 'images/furniture_repair3.jpg',
        title: "Broken Legs",
        price: 2999,
    },
    {
        id: 3,
        image: 'images/furniture_repair4.jpg',
        title: "Assembling Furniture",
        price: 3999,
    },
    {
        id: 4,
        image: 'images/furniture_repair5.jpg',
        title: "Restoration",
        price: 15999,
    },
    {
        id: 5,
        image: 'images/furniture_repair6.jpg',
        title: "Interior Design Consultation",
        price: 1499,
    },
    {
        id: 6,
        image: 'images/furniture_repair7.jpg',
        title:"Foam Replacement",
        price: 4599,
    },
    {
        id: 7,
        image: 'images/furniture_repair8.jpg',
        title:"Fabric Replacement",
        price: 3999,
    },
    {
        id: 8,
        image: 'images/furniture_repair9.jpg',
        price: 6999,
    },
    
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
