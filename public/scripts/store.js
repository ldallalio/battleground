const stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'auto',
    token: (token) => {
        fetch('/purchase', {
            method: 'POST',
            headers: 'application/json',
            body: JSON.stringify({
                stripeTokenId: token.id,
                items:items,
            })
        })
    },
});

let priceEl = document.querySelector('.card-text');
let price = parseFloat(priceEl.innerText.replace('$' , "")) * 100;

const purchase = () => {
    stripeHandler.open({
        amount: price,
    })
};

