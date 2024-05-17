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
        image:'images/men_spa_and_salon1.jpg',
        title:"Hair Cut",
        price: 199,
    },
    {
        id: 1,
        image: 'images/men_spa_and_salon2.jpg',
        title: "Hair Color",
        price: 149,
    },
    {
        id: 2,
        image: 'images/men_spa_and_salon3.jpg',
        title: "Normal Shaving",
        price: 99,
    },
    {
        id: 3,
        image: 'images/men_spa_and_salon4.jpg',
        title: "Hot Towel",
        price: 599,
    },
    {
        id: 4,
        image: 'images/men_spa_and_salon5.jpg',
        title: "Head Massage",
        price: 399,
    },
    {
        id: 5,
        image: 'images/men_spa_and_salon6.jpg',
        title: "Body Massage",
        price: 1699,
    },
    {
        id: 6,
        image: 'images/men_spa_and_salon7.jpg',
        title: "Manicure",
        price: 99,
    },
    {
        id: 7,
        image: 'images/men_spa_and_salon8.jpg',
        title: "Facial",
        price: 499,
    },
    {
        id: 8,
        image: 'images/men_spa_and_salon9.jpg',
        title: "Threading",
        price: 199,
    },
    {
        id: 9,
        image: 'images/men_spa_and_salon10.jpg',
        title: "Eyebrow Shaping",
        price: 89,
    },
    {
        id: 10,
        image: 'images/men_spa_and_salon11.jpg',
        title: "Waxing",
        price: 699,
    },
    {
        id: 11,
        image: 'images/men_spa_and_salon12.jpg',
        title: "Hair Spray",
        price: 299,
    },
    {
        id: 12,
        image: 'images/men_spa_and_salon13.jpg',
        title: "Hair Wax",
        price: 199,
    },
    {
        id: 13,
        image: 'images/men_spa_and_salon14.jpg',
        title: "Lakme Sun Expert",
        price: 499,
    },
    {
        id: 14,
        image: 'images/men_spa_and_salon15.jpg',
        title: "Hair Oil",
        price: 199,
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
