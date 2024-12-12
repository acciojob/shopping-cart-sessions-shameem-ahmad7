// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart" buttons
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => addToCart(parseInt(button.getAttribute("data-id"))));
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear the current list
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Add event listeners for "Remove" buttons
  const buttons = document.querySelectorAll(".remove-from-cart-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => removeFromCart(parseInt(button.getAttribute("data-id"))));
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    updateLocalStorage();
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateLocalStorage();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  updateLocalStorage();
  renderCart();
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
