const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartSummary = document.querySelector('.cart-summary');
const cartTable = document.querySelector('.cart-table');

function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽';
}

function updateCartDisplay() {
    const itemCount = cartItems.querySelectorAll('tr').length;

    if (itemCount === 0) {
        // Показываем сообщение о пустой корзине
        cartTable.style.display = 'none';
        cartSummary.style.display = 'none';
        emptyCartMessage.style.display = 'block';
    } else {
        // Показываем таблицу с товарами
        cartTable.style.display = 'block';
        cartSummary.style.display = 'flex';
        emptyCartMessage.style.display = 'none';
        updateTotals();
    }
}

function updateTotals() {
    let total = 0;
    cartItems.querySelectorAll('tr').forEach(row => {
        const price = +row.dataset.price;
        const qtyInput = row.querySelector('.quantity-input');
        let qty = parseInt(qtyInput.value);
        if (isNaN(qty) || qty < 1) {
            qty = 1;
            qtyInput.value = 1;
        }
        const itemTotal = price * qty;
        row.querySelector('.item-total').textContent = formatPrice(itemTotal);
        total += itemTotal;
    });
    cartTotal.textContent = formatPrice(total);
}

// Обновляем при изменении количества
cartItems.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        updateTotals();
    }
});

// Удаление товара
cartItems.addEventListener('click', (e) => {
    if (e.target.closest('.btn-remove')) {
        const row = e.target.closest('tr');
        row.remove();
        updateCartDisplay();
    }
});

// Инициализация при загрузке страницы
updateCartDisplay();

