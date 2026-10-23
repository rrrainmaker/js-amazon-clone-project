import {orders} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import {addToCart, calculateCartQuantity} from '../data/cart.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {setUpSearchBar} from './utils/search.js';

function updateCartQuantity() {
  document.querySelector('.js-cart-quantity')
    .innerHTML = calculateCartQuantity();
}

function productsListHTML(order) {
  let productsListHTML = '';

  order.products.forEach((orderProduct) => {
    const product = getProduct(orderProduct.productId);

    const deliveryDateString = dayjs(
      orderProduct.estimatedDeliveryTime
    ).format('MMMM D');

    productsListHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${deliveryDateString}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again"
          data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message js-buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return productsListHTML;
}

function renderOrders() {
  let ordersHTML = '';

  orders.forEach((order) => {
    const orderDateString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  if (orders.length === 0) {
    ordersHTML = `
      <div class="no-orders-message">
        You have no orders yet.
        <a class="link-primary" href="amazon.html">View products</a>
      </div>
    `;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again')
    .forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(button.dataset.productId, 1);
        updateCartQuantity();

        const message = button.querySelector('.js-buy-again-message');
        message.innerHTML = 'Added';

        setTimeout(() => {
          message.innerHTML = 'Buy it again';
        }, 1000);
      });
    });
}

async function loadPage() {
  setUpSearchBar();
  updateCartQuantity();

  await loadProductsFetch();

  renderOrders();
}
loadPage();
