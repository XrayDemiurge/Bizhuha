var user = {
	is_logged_in: true,
	name: "",
	cart: {
		items: []
	},
	favorites: {
		items: []
	}
};

let currentBonuses = parseInt(localStorage.getItem('user_bonuses')) || 0;

function updateBonusUI() {
    const counter = document.getElementById('bonus-counter');
    if (counter) {
        counter.textContent = currentBonuses;
    }
}

function addBonus(event) {
    currentBonuses += 100;
    localStorage.setItem('user_bonuses', currentBonuses);
    updateBonusUI();
}



const ItemList = [
{
    name: "Кольцо лунное",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn1')">В корзину</a>`,
    price: 45,
    btnId: "btn1"
},
{
    name: "Мозаичное кольц",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn2')">В корзину</a>`,
    price: 36,
    btnId: "btn2"
},
{
    name: "Звёздное кольцо",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn3')">В корзину</a>`,
    price: 56,
    btnId: "btn3"
},
{
    name: "Серьги-рыбки",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn4')">В корзину</a>`,
    price: 78,
    btnId: "btn4"
},
{
    name: "Серьги капли",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn5')">В корзину</a>`,
    price: 50,
    btnId: "btn5"
},
{
    name: "Павлинья брошь",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn6')">В корзину</a>`,
    price: 70,
    btnId: "btn6"
},
{
    name: "Молья брошь",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn7')">В корзину</a>`,
    price: 85,
    btnId: "btn7"
},
{
    name: "Ласточки-брошь",
    description:`
    <p>Уникальный вариант как для романтичного подарка, так и для самых нежных образов.</p>
    <a class="catalog__item-btn" id="cart-btn1" onclick="add_cart_item('btn8')">В корзину</a>`,
    price: 70,
    btnId: "btn8"
},
{
    btnId: "btn-signup",
    name: "Sign Up",
    description:`
        <form id="reg-form" onsubmit="alert('Регистрация...'); return false;">
            <input type="text" placeholder="Username" required>
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit" class="btn-1" style="width:100%; padding:10px;">Create Account</button>
        </form>`
},
{
    btnId: "btn-signin",
    name: "Sign In",
    description:`
        <form id="auth-form">
            <input id="1" type="text" placeholder="Username" required>
            <input id="2" type="password" placeholder="Password" required>
            <button id="btnLogin" type="submit" class="btn-1" style="width:100%; padding:10px;">Login</button>
        </form>`
},
{
    btnId: "btn-cart",
    name: "🛒 Ваша корзина",
    description: ""
}
]

const userList = [{
    userName: "user",
    password: "123"
}]

let remove_cart_item = (product_cart_item_ind) => {
	console.log('item', product_cart_item_ind, 'removed from cart');
	let to_be_removed = user.cart.items[product_cart_item_ind];
	user.cart.items = user.cart.items.filter( (item) => item != to_be_removed );
	cart_item_counter.innerHTML = user.cart.items.length;
	render_shopping_cart();
}

const remove_favorites_item = (item_ind) => {
	console.log('item', item_ind, 'removed from favorites');
	let to_be_removed = user.favorites.items[item_ind];
	user.favorites.items = user.favorites.items.filter( (item) => item != to_be_removed );
	render_shopping_favorites();
}

const add_favorites_item = (element, item_name) => {
	console.log('favorite_item_id is', item_name);

	if (element.src.includes('heart.png'))
    {element.src = "./assets/icons/heartFull.png";} 
    else
    {element.src = "./assets/icons/heart.png";}

	let item = NaN;
	for (let i = 0; i < ItemList.length; i++) {
		if (item_name == ItemList[i].btnId) {
			item = ItemList[i];
		}
	}
	for (let i = 0; i < user.favorites.items.length; i++) {
		if (user.favorites.items[i].name == item.name) {
			return;
		}
	}

	user.favorites.items.push(item);
	console.log(user.favorites.items);
}

let add_cart_item = (product_cart_id) => {
	console.log('product_cart_id is', product_cart_id);
	let item = NaN;

	for (let i = 0; i < ItemList.length; i++) {
		if (product_cart_id == ItemList[i].btnId) {
			item = ItemList[i];
		}
	}

	user.cart.items.push(item);
	cart_item_counter.innerHTML = user.cart.items.length;
}

/* штука для входа и инфы с модалок в каталоге*/
let windowOn = function (IdName) {
    document.getElementById("modal-cont").style.display = "flex"; 

    for(let i = 0; i < ItemList.length; i++)
    {
        if(IdName == ItemList[i].btnId)
        {
            document.getElementById("modal__content").innerHTML = `
            <div class="modal-inf-window">
            ${ItemList[i].name}
            <p> ${ItemList[i].description} </p>
            </div>
            `;
            document.getElementById("btnLogin").addEventListener('click', () => {
                for(let counter = 0; counter < userList.length; counter++){
                    if(document.getElementById("1").value == userList[counter].userName){
                        if(document.getElementById("2").value == userList[counter].password)
                        {
                            authenticate_user();
                            document.getElementById("modal-cont").style.display = "none";
                            return;
                        }
                    }
                }
            });
            return;
        };
    };
    
};

let usernanananame = 'placeholder';

let authenticate_user = function() {
    user.is_logged_in = true;
    user.name = usernanananame;
    document.getElementById("open-favorites-btn").classList.remove("stuff");
    document.getElementById("open-cart-btn").classList.remove("stuff");
    document.getElementById("nav").style.display = "none";
    document.getElementById("nav2").style.display = "none";
}

document.getElementById("modal-bg").addEventListener('click', () => {
    if (event.target === event.currentTarget) {
        document.getElementById("modal-cont").style.display = "none";}
});

/* избранные */
const favOpenBtn = document.getElementById('open-favorites-btn');
const favCloseBtn = document.getElementById('close-favorites-btn');
const favoritesDrawer = document.getElementById('favorites-drawer');
const favoritesOverlay = document.getElementById('favorites-overlay');
const favorites_body = document.getElementById('favorites-body');
const favorites_total     = document.getElementById('favorites-total');
const favorites_item_counter = document.getElementById('favorites-count');

function openFavorites() {
  if (user.is_logged_in == false) {
	  alert('Вот тут нужно логин открыть');
	  return;
  }
  console.log('favorites opened');

  favoritesDrawer.classList.add('active');
  favoritesOverlay.classList.add('active');
  favoritesDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  render_shopping_favorites_item = (item, id) => {
	  console.log('rendering item:', item);
	  result = "";
	  result += '<div class="favorites-item">';
	  result += '<span onClick="remove_favorites_item(' + id + ')">D</span>';
	  result += '<span>' + item.name + '</span>';
	  result += '<span>' + item.price + '</span>';
	  result += '</div>';
	  return result;
  }

  render_shopping_favorites();
}
/* обновляет отображение */
let render_shopping_favorites = () => {
	favorites_body.innerHTML = '';

	for (let i = 0; i < user.favorites.items.length; i++) {
		favorites_body.innerHTML += render_shopping_favorites_item(user.favorites.items[i], i);
	}

	console.log("favorites count: ", user.favorites.items.length);
	favorites_total.innerHTML = '<strong>В избранных ' + user.favorites.items.length + ' товаров';
}

function closeFavorites() {
  favoritesDrawer.classList.remove('active');
  favoritesOverlay.classList.remove('active');
  favoritesDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

favOpenBtn.addEventListener('click', openFavorites);
favCloseBtn.addEventListener('click', closeFavorites);
favoritesOverlay.addEventListener('click', closeFavorites);

/* корзина ниже */

const openBtn = document.getElementById('open-cart-btn');
const closeBtn = document.getElementById('close-cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cart_body = document.getElementById('cart-body');
const cart_total     = document.getElementById('cart-total');
const cart_item_counter = document.getElementById('cart-count');

function openCart() {
  if (user.is_logged_in == false) {
	  alert('Вот тут нужно логин открыть');
	  return;
  }
  console.log('cart opened');

  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  render_shopping_cart_item = (item, id) => {
	  console.log('rendering item:', item);
	  result = "";
	  result += '<div class="cart-item">';
	  result += '<span onClick="remove_cart_item(' + id + ')">D</span>';
	  result += '<span>' + item.name + '</span>';
	  result += '<span>' + item.price + '</span>';
	  result += '</div>';
	  return result;
  }
  render_shopping_cart();
}

let render_shopping_cart = () => {
	cart_body.innerHTML = '';

	let total_price = 0;
	for (let i = 0; i < user.cart.items.length; i++) {
		cart_body.innerHTML += render_shopping_cart_item(user.cart.items[i], i);
		total_price += user.cart.items[i].price;
	}

	console.log("total price: ", total_price);
	cart_total.innerHTML = '<strong>Сумма: ' + total_price + '</strong>';
}

function closeCart() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restore background scrolling
}

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
