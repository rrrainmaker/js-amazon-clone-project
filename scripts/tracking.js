import {calculateCartQuantity} from '../data/cart.js';
import {setUpSearchBar} from './utils/search.js';

setUpSearchBar();

document.querySelector('.js-cart-quantity')
  .innerHTML = calculateCartQuantity();
