const EventEmitter = require('events');

//custom class
class PizzaShop extends EventEmitter {
    constructor() {
        super();
        this.orderNumber = 0;
    }

    placeOrder(size, topping) {
        this.orderNumber++;
        this.emit('order', size, topping);
    }

    displayOrderNumber() {
        // console.log(`Current order number: ${this.orderNumber}`);
        return this.orderNumber;
    }
}

// Usage
const myShop = new PizzaShop();

// 1. Handle the event
myShop.on('order', (size,topping) => {
    console.log(`[Order Received ] Baking a ${size} pizza with ${topping}.`);
});

// 2. Handle an event only once
myShop.once('grandOpening', () => {
    console.log('🎉 GRAND OPENING CEREMONY! 🎉');
});

// Trigger events
myShop.emit('grandOpening'); // Prints
myShop.emit('grandOpening'); // Ignored (was 'once')

myShop.placeOrder('large', 'pepperoni');
myShop.placeOrder('medium', 'mushrooms');

module.exports = PizzaShop;
