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
            "<img src='emptycart_2.png' alt='Empty Cart'><p>Your cart is empty</p>";
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
        title: 'Bed-Repair',
        price: 999,
    },
    {
        id: 1,
        image: 'images/tv-board.jpg',
        title: 'TV Board Repair',
        price: 799,
    },
    {
        id: 2,
        image: 'images/window.jpeg',
        title: 'Window Repair',
        price: 699,
    },
    {
        id: 3,
        image: 'images/door.jpeg',
        title: 'Door Repair',
        price: 1199,
    },
    {
        id: 4,
        image: 'images/cupboard-repair.jpg',
        title: 'CupBoard Repair',
        price: 999,
    },
    {
        id: 5,
        image: 'images/drywall.jpeg',
        title: 'Drywall Repair',
        price: 599,
    },
    {
        id: 6,
        image: 'images/partition-repair.jpg',
        title: 'Partition Repair',
        price: 1299,
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
