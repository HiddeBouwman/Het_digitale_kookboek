document.addEventListener('DOMContentLoaded', function () {
    var serveContainer = document.querySelector('.serve__container');
    var serve = document.getElementById('serve');
    var persons = document.getElementById('persons');

    var buttonMinus = createButton('-', 'minus');
    var buttonPlus = createButton('+', 'plus');

    serveContainer.insertBefore(buttonMinus, persons);

    serveContainer.appendChild(buttonPlus);

    var serveBase = parseInt(serve.innerText);
    var serveNow;

    buttonPlus.addEventListener('click', function () {
        serveNow = serveBase + 1;
        serve.innerText = serveNow;
        updateIngredients();
    });

    buttonMinus.addEventListener('click', function () {
        if (serveBase > 1) {
            serveNow = serveBase - 1;
            serve.innerText = serveNow;
            updateIngredients();
        }
    });

    function createButton(sign, name) {
        var button = document.createElement('button');
        button.textContent = sign;
        button.className = 'button--' + name;
        return button;
    }

    function updateIngredients() {
        var ingredients = Array.from(document.querySelectorAll('.ingredient'));
        ingredients.forEach(function (ingredient) {
            var amount = ingredient.querySelector('.ingredient__amount');
            if (!amount) return;

            var amountBase = parseFloat(amount.innerText);
            var amountNew = amountBase * serveNow / serveBase;

            var unitSingle = ingredient.querySelector('.ingredient__unit--single');
            var unitPlural = ingredient.querySelector('.ingredient__unit--plural');

            if (amountNew < 1 && unitPlural.innerText === 'kg') {
                amountNew = Math.round(amountNew * 1000);
                amount.innerText = amountNew;
                unitSingle.innerText = 'gram';
                unitPlural.innerText = 'gram';

            } else if (amountNew >= 1000 && unitPlural.innerText === 'gram') {
                amountNew = amountNew / 1000;
                amount.innerText = Number.isInteger(amountNew) ? amountNew : amountNew.toFixed(2);
                unitSingle.innerText = 'kg';
                unitPlural.innerText = 'kg';

            } else {
                amount.innerText = Math.floor(amountNew * 1000) / 1000;
            }

            if (amountNew < 1 && unitPlural.innerText === 'liter') {
                amountNew = Math.round(amountNew * 1000);
                amount.innerText = amountNew;
                unitSingle.innerText = 'ml';
                unitPlural.innerText = 'ml';

            } else if (amountNew >= 1000 && unitPlural.innerText === 'ml') {
                amountNew = amountNew / 1000;
                amount.innerText = Number.isInteger(amountNew) ? amountNew : amountNew.toFixed(2);
                unitSingle.innerText = 'liter';
                unitPlural.innerText = 'liter';

            } else {
                amount.innerText = Math.floor(amountNew * 10000) / 10000;
            }

            if (amountNew > 1) {
                unitSingle.classList.add('hidden');
                unitPlural.classList.remove('hidden');
            } else {
                unitPlural.classList.add('hidden');
                unitSingle.classList.remove('hidden');
            }
        });
        serveBase = serveNow;
    }
});