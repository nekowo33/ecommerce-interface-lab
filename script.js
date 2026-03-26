//task 1
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const products = [
    new Product(1, "Rose Bouquet", 1200.00, "https://i.pinimg.com/736x/5a/aa/d2/5aaad243a6cc3e7e3c1f6669b50b260d.jpg"),
    new Product(2, "Tulip Bouquet", 1800.00, "https://i.pinimg.com/736x/f8/6c/7b/f86c7b3f61c7b5409d462498f05bb11b.jpg"),
    new Product(3, "Lilies Bouquet", 2000.00, "https://i.pinimg.com/736x/98/4a/a6/984aa6c4765025d0abac3a00fae15d0d.jpg"),
    new Product(4, "Sunflower Bouquet", 1500.00, "https://i.pinimg.com/1200x/e7/74/ac/e774ace7f45a08a7f1573d42a0824dc0.jpg"),
    new Product(5, "Daisy Bouquet", 900.00, "https://i.pinimg.com/1200x/e1/dd/06/e1dd06c81bde52961dfa25c2c9061fc1.jpg"),
    new Product(6, "Orchid Bouquet", 2500.00, "https://i.pinimg.com/736x/5a/83/0f/5a830f1e2f75fc3bc3a8151b8918670e.jpg"),
    new Product(7, "Peony Bouquet", 2200.00, "https://i.pinimg.com/736x/c4/cf/a6/c4cfa6cf64212db4966cd5d1b801288c.jpg"),
    new Product(8, "Lavender Bouquet", 1300.00, "https://i.pinimg.com/1200x/19/e1/7b/19e17b26ed6a194a3d5f8bbcfe94a31e.jpg"),
    new Product(9, "Mixed Bouquet", 1700.00, "https://i.pinimg.com/1200x/47/c5/e0/47c5e08d73d917717ec2565f4960724b.jpg"),
    new Product(10, "Carnation Bouquet", 1300.00, "https://i.pinimg.com/736x/7f/e0/d5/7fe0d5ac477b225b9602368357690027.jpg"),
]

//task 2

const productContainer = document.querySelector('section[aria-label="Product Grid"]');
if (productContainer) {
    productContainer.innerHTML = "";

    products.forEach(function(product) {
        const article = document.createElement('article');
        article.setAttribute('data-id', product.id);

        const heading = document.createElement('h3');
        const headingText = document.createTextNode(product.name);
        heading.appendChild(headingText);

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const pricePara = document.createElement('p');
        const priceLabel = document.createTextNode('Price: ');
        pricePara.appendChild(priceLabel);

        const priceSpan = document.createElement('span');
        priceSpan.classList.add('price');
        const priceText = document.createTextNode(product.price.toLocaleString('en-PH', { minimumFractionDigits: 2}));
        priceSpan.appendChild(priceText);
        pricePara.appendChild(priceSpan);

        const detailLink = document.createElement('a');
        detailLink.href = 'detail.html';
        const detailText = document.createTextNode('View Details');
        detailLink.appendChild(detailText);

        const addBtn = document.createElement('button');
        addBtn.classList.add('add-to-cart');
        addBtn.setAttribute('data-id', product.id);

        const btnText = document.createTextNode('Add to Cart');
        addBtn.appendChild(btnText);

        article.appendChild(heading);
        article.appendChild(img);
        article.appendChild(pricePara);
        article.appendChild(detailLink);
        article.appendChild(addBtn);

        productContainer.appendChild(article);
    });
}

//Task 3

// State: array to hold cart items
let cart = [];

// Render the cart list and recalculate total
function renderCart() {
    const cartList = document.querySelector('main ul');
    const subtotalSpan = document.querySelector('section[aria-label="Cart Subtotal"] .price');
    const emptySection = document.querySelector('section[aria-label="Empty Cart Message"]');

    if (!cartList) return;

    // Clear the current list
    cartList.innerHTML = '';

    if (cart.length === 0) {
        // Show empty cart message, hide subtotal
        if (emptySection) emptySection.style.display = 'block';
        if (subtotalSpan) subtotalSpan.textContent = '0.00';
        return;
    }

    // Hide empty cart message when there are items
    if (emptySection) emptySection.style.display = 'none';

    // Loop through cart and build each list item
    cart.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.setAttribute('data-id', item.product.id);

        const img = document.createElement('img');
        img.src = item.product.image;
        img.alt = item.product.name;

        const nameSpan = document.createElement('span');
        const nameText = document.createTextNode(item.product.name);
        nameSpan.appendChild(nameText);

        const priceSpan = document.createElement('span');
        priceSpan.classList.add('price');
        const priceText = document.createTextNode(
            (item.product.price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2 })
        );
        priceSpan.appendChild(priceText);

        // Quantity input
        const qtyLabel = document.createElement('label');
        const qtyLabelText = document.createTextNode('Qty: ');
        qtyLabel.appendChild(qtyLabelText);

        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.value = item.quantity;
        qtyInput.min = '0';
        qtyInput.max = '10';
        qtyInput.setAttribute('data-id', item.product.id);

        // Update cart array when quantity changes
        qtyInput.addEventListener('change', function() {
            const newQty = parseInt(this.value);
            const productId = parseInt(this.getAttribute('data-id'));

            if (newQty <= 0) {
                // Remove item from cart if quantity is 0
                cart = cart.filter(function(cartItem) {
                    return cartItem.product.id !== productId;
                });
            } else {
                // Update the quantity
                cart.forEach(function(cartItem) {
                    if (cartItem.product.id === productId) {
                        cartItem.quantity = newQty;
                    }
                });
            }
            renderCart();
        });

        qtyLabel.appendChild(qtyInput);

        li.appendChild(img);
        li.appendChild(nameSpan);
        li.appendChild(qtyLabel);
        li.appendChild(priceSpan);
        cartList.appendChild(li);
    });

    // Calculate total using reduce
    const total = cart.reduce(function(sum, item) {
        return sum + (item.product.price * item.quantity);
    }, 0);

    if (subtotalSpan) {
        subtotalSpan.textContent = total.toLocaleString('en-PH', { minimumFractionDigits: 2 });
    }
}

// Event Delegation: single listener on document.body for "Add to Cart" clicks
document.body.addEventListener('click', function(event) {
    // Check if the clicked element is an Add to Cart button
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'));

        // Find the matching product in the products array
        const foundProduct = products.filter(function(p) {
            return p.id === productId;
        })[0];

        if (!foundProduct) return;

        // Check if item is already in cart
        const existingItem = cart.filter(function(item) {
            return item.product.id === productId;
        })[0];

        if (existingItem) {
            // Increase quantity if already in cart
            existingItem.quantity += 1;
        } else {
            // Push new item as an object with product and quantity
            cart.push({ product: foundProduct, quantity: 1 });
        }

        // Fade-in animation on the product card (Task 6)
        const card = event.target.closest('article');
        if (card) {
            card.classList.add('fade-in');
            setTimeout(function() {
                card.classList.remove('fade-in');
            }, 500);
        }

        // Re-render cart if on cart page
        renderCart();
    }
});

// Initial render when on cart page
renderCart();


//Task 4

const checkoutForm = document.querySelector('.checkout-container form');

if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(event) {
        // Prevent the page from reloading immediately
        event.preventDefault();

        let isValid = true;

        // Select all required input fields in the checkout container
        const nameInput = document.querySelector('#name');
        const regionInput = document.querySelector('#region');
        const stateInput = document.querySelector('#state');
        const addressInput = document.querySelector('#address');
        const zipInput = document.querySelector('#zip');
        const paymentInput = document.querySelector('input[name="payment"]:checked');

        const fieldsToValidate = [nameInput, regionInput, stateInput, addressInput, zipInput];

        // Validate each text field
        fieldsToValidate.forEach(function(field) {
            if (!field) return;

            // Remove previous error state first
            field.classList.remove('error');

            // Check if empty
            if (field.value.trim() === '') {
                field.classList.add('error');

                // Show error message below the field
                let errorMsg = field.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
                    errorMsg = document.createElement('span');
                    errorMsg.classList.add('error-msg');
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
                errorMsg.textContent = 'This field is required.';
                isValid = false;
            } else {
                // Clear error message if valid
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-msg')) {
                    errorMsg.textContent = '';
                }
            }
        });

        // Validate ZIP: must be numeric
        if (zipInput && zipInput.value.trim() !== '' && isNaN(zipInput.value.trim())) {
            zipInput.classList.add('error');
            let zipError = zipInput.nextElementSibling;
            if (!zipError || !zipError.classList.contains('error-msg')) {
                zipError = document.createElement('span');
                zipError.classList.add('error-msg');
                zipInput.parentNode.insertBefore(zipError, zipInput.nextSibling);
            }
            zipError.textContent = 'ZIP Code must be a number.';
            isValid = false;
        }

        // Validate payment method selection
        if (!paymentInput) {
            const paymentSection = document.querySelector('input[name="payment"]');
            if (paymentSection) {
                let paymentError = document.querySelector('.payment-error');
                if (!paymentError) {
                    paymentError = document.createElement('span');
                    paymentError.classList.add('error-msg', 'payment-error');
                    paymentSection.parentNode.appendChild(paymentError);
                }
                paymentError.textContent = 'Please select a payment method.';
            }
            isValid = false;
        } else {
            const paymentError = document.querySelector('.payment-error');
            if (paymentError) paymentError.textContent = '';
        }

        // If all fields are valid, simulate redirect
        if (isValid) {
            console.log('Form is valid! Redirecting...');
            window.location.href = 'thankyou.html';
        }
    });
}