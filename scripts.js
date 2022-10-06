import data from './data.js'

const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');



for (let i = 0; i < data.length; i += 1) {
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	const img = document.createElement('img');
	img.src = data[i].image
	img.width = 300
	img.height = 300
	newDiv.appendChild(img)

	itemsContainer.appendChild(newDiv)
	const desc = document.createElement('P');
	desc.innerText = data[i].desc
	newDiv.appendChild(desc)
	const price = document.createElement('P');
	price.innerText = data[i].price
	newDiv.appendChild(price)

	const button = document.createElement('button');
	button.id = data[i].name
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
}

const cart = []

const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
	addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
	showItems();
}))

itemList.onchange = function (e) {
	if (e.target && e.target.classList.contains('update')) {
		const name = e.target.dataset.name;
		const qty = parseInt(e.target.value);
		updateCart(name, qty);
	}
}

itemList.onclick = function (e) {
	if (e.target && e.target.classList.contains('remove')) {
		const name = e.target.dataset.name;
		removeItem(name);
	}
	else if (e.target && e.target.classList.contains('add-one')) {
		const name = e.target.dataset.name;
		addItem(name);
	}
	else if (e.target && e.target.classList.contains('remove-one')) {
		const name = e.target.dataset.name;
		removeItem(name, 1);
	}
}

function addItem(name, price) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			cart[i].qty += 1;
			showItems();
			return
		}
	}
	const item = {
        name: name,
        price: price,
        qty: 1
    }
    cart.push(item);
    console.log(cart);
   
}

	function showItems() {
		const qty = getQty();
		cartQty.innerHTML = `You have ${qty} items in your cart`;

		let itemStr = ' '

		for (let i = 0; i < cart.length; i += 1) {
			const price = cart[i].price;
			const name = cart[i].name;
			const quantity = cart[i].qty;
			const itemTotal = cart[i].price * cart[i].qty;

			itemStr += `<li> 
		${name} $${price} x ${quantity} =  $${itemTotal} 
         <button class = "remove" data-name = "${name}" > Remove </button> 
         <button class = "add" data-name = "${name}" >  + </button>
         <button class = "subtract" data-name = "${name}" >  - </button 
		 </li>`;
		}
		itemList.innerHTML = itemStr;
		let total = calculateTotal();
		cartTotal.innerHTML = `Your cart total is ${total}`
		console.log(cart);
	}


	function getQty() {
		let qty = 0;
		for (let i = 0; i < cart.length; i += 1) {
			qty += cart[i].qty;
		}
		return qty;
	}

	function calculateTotal() {
		let total = 0;
		for (let i = 0; i < cart.length; i += 1) {
			total += cart[i].price * cart[i].qty;
		}
		return total.toFixed(2);
	}

	function removeItem(name, qty = 0) {
		console.log('Entered remove item')
		for (let i = 0; i < cart.length; i += 1) {
			if (name === cart[i].name) {
				if (qty > 0) {
					console.log('it matches')
					cart[i].qty -= qty;
				}

				if (cart[i].qty < 1 || qty === 0) {
					cart.splice(i, 1)
				}
				showItems();
				return
			}
		}
	}

	showItems()