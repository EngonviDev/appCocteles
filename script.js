let total = 0;
let countdownTimers = []; // Array para almacenar los temporizadores

document.getElementById('registerButton').addEventListener('click', function() {
    const clientName = document.getElementById('clientName').value;

    if (clientName) {
        const orderList = document.getElementById('orderList');
        const li = document.createElement('li');
        const currentTime = new Date().toLocaleTimeString();

        // Obtener las cantidades de las bebidas
        const quantity1 = parseInt(document.getElementById('quantity1').value);
        const quantity2 = parseInt(document.getElementById('quantity2').value);
        const quantity3 = parseInt(document.getElementById('quantity3').value);

        let orderDetails = '';
        total = 0;
        let totalBeverages = quantity1 + quantity2 + quantity3; // Total de bebidas

        if (quantity1 > 0) {
            orderDetails += `Mojito x${quantity1}, `;
            total += 5 * quantity1;
        }
        if (quantity2 > 0) {
            orderDetails += `Piña Colada x${quantity2}, `;
            total += 6 * quantity2;
        }
        if (quantity3 > 0) {
            orderDetails += `Daiquiri x${quantity3}, `;
            total += 4 * quantity3;
        }

        if (orderDetails) {
            li.textContent = `Cliente: ${clientName}, Pedido: ${orderDetails.slice(0, -2)}, Hora de Salida: ${currentTime}`;
            orderList.appendChild(li);

            // Mostrar la factura
            document.getElementById('invoiceClientName').textContent = clientName;
            const invoiceDrinks = document.getElementById('invoiceDrinks');
            invoiceDrinks.innerHTML = '';

            if (quantity1 > 0) {
                const drinkItem = document.createElement('li');
                drinkItem.textContent = `Mojito x${quantity1} - $${5 * quantity1}`;
                invoiceDrinks.appendChild(drinkItem);
            }
            if (quantity2 > 0) {
                const drinkItem = document.createElement('li');
                drinkItem.textContent = `Piña Colada x${quantity2} - $${6 * quantity2}`;
                invoiceDrinks.appendChild(drinkItem);
            }
            if (quantity3 > 0) {
                const drinkItem = document.createElement('li');
                drinkItem.textContent = `Daiquiri x${quantity3} - $${4 * quantity3}`;
                invoiceDrinks.appendChild(drinkItem);
            }

            document.getElementById('invoiceTotal').textContent = `$${total}`;
            document.getElementById('invoiceTotalBeverages').textContent = `Cantidad total de bebidas: ${totalBeverages}`; // Nueva línea para mostrar total de bebidas
            document.getElementById('invoice').style.display = 'block';

            // Limpiar el campo de entrada
            document.getElementById('clientName').value = '';
            document.getElementById('quantity1').value = 0;
            document.getElementById('quantity2').value = 0;
            document.getElementById('quantity3').value = 0;

            // Iniciar el temporizador para este pedido
            startCountdown(totalBeverages);
        } else {
            alert('Por favor, selecciona al menos una bebida.');
        }
    } else {
        alert('Por favor, ingresa el nombre del cliente.');
    }
});

// Función para iniciar el temporizador
function startCountdown(totalBeverages) {
    let countdownMinutes = 2; // Valor por defecto

    if (totalBeverages > 15) {
        countdownMinutes = 10;
    } else if (totalBeverages >= 10) {
        countdownMinutes = 7;
    } else if (totalBeverages >= 5) {
        countdownMinutes = 5;
    }

    let timeLeft = countdownMinutes * 60; // Convertir a segundos
    const timerDiv = document.createElement('div'); // Crear un nuevo div para el temporizador
    document.getElementById('timers').appendChild(timerDiv); // Agregar el div al contenedor de temporizadores

    countdownTimers.push(setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDiv.textContent = `Tiempo de preparación: ${minutes} minutos y ${seconds} segundos`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimers[countdownTimers.length - 1]); // Detener el temporizador
            timerDiv.textContent = "¡Tiempo de preparación finalizado!";
        }

        timeLeft--;
    }, 1000));
}

// Seleccionar todos los botones de cantidad
const quantityBtns = document.querySelectorAll('.quantity-btn');

// Agregar evento de clic a cada botón
quantityBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.action;
        const input = this.parentNode.querySelector('input');
        let quantity = parseInt(input.value);

        if (action === 'increase') {
            quantity++;
        } else if (action === 'decrease' && quantity > 0) {
            quantity--;
        }

        input.value = quantity;
    });
});