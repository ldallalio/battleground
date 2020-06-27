const stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'auto',
    token: (token) => {
        
    },
});

let priceEl = document.querySelector('.card-text');
let price = parseFloat(priceEl.innerText.replace('$' , "")) * 100;

const purchase = () => {
    stripeHandler.open({
        amount: price,
    })
};
