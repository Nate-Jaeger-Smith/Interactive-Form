const nameField = document.getElementById('name'),
    colorSelect = document.getElementById('color'),
    otherJobInput = document.getElementById('other-job-role'),
    jobRoleSelect = document.getElementById('title'),
    designMenu = document.querySelector('#design'),
    activityRegister = document.getElementById('activities'),
    activitiesTotal = document.getElementById('activities-cost'),
    paymentMenu = document.getElementById('payment'),
    bitcoinPayment = document.getElementById('bitcoin'),
    paypalPayment = document.getElementById('paypal'),
    creditCardPayment = document.getElementById('credit-card'),
    form = document.querySelector('form');

// Set focus on name field, disable color select
nameField.focus();
colorSelect.disabled = true;

// Set credit-card as selected in paymentMenu and hide otherJobInput, bitcoinPayment, and paypalPayment elements
paymentMenu.children[1].selected = true;
otherJobInput.setAttribute('hidden', true);
bitcoinPayment.setAttribute('hidden', true);
paypalPayment.setAttribute('hidden', true);


/**
 * Event listener for the change event on the jobRoleSelect element.
 * Toggles the hidden attribute of the otherJobInput element based on the selected value.
 */
jobRoleSelect.addEventListener('change', () => {
    const jobSelection = jobRoleSelect.value;

    if (jobSelection === 'other') {
        otherJobInput.removeAttribute('hidden');
    } else {
        otherJobInput.setAttribute('hidden', true);
    }
});

/**
 * Event listener for the change event on the designMenu element
 * Toggles 'hidden' on options that are not valid color matches
 * Sets color select element to display first matching color
 * @param {event} e - The event object
 */
designMenu.addEventListener('change', e => {
    colorSelect.disabled = false;
    const shirtSelection = e.target.value;
    const shirtColors = [...colorSelect.children];

    const matchingShirtColors = shirtColors.filter( color => {
        if (color.dataset.theme !== shirtSelection){
            color.setAttribute('hidden', true);
        } else {
            color.removeAttribute('hidden');
            return color;
        }
    });
    matchingShirtColors[0].selected = true;
});


let totalCost = 0;
/**
 * Event listener for the change event on the activityRegister fieldset.
 * Updates the total cost of selected activities and displays it.
 * @param {Event} e - The event object.
 */
activityRegister.addEventListener('change', e => {
    const activity = e.target;
    const cost = parseInt(activity.dataset.cost);
    if (activity.checked) {
        totalCost += cost;
    } else {
        totalCost -= cost;
    }
    activitiesTotal.textContent = `Total: $${totalCost}`;
});

/**
 * Handles the display of payment options based on the selected payment choice.
 * @param {string} paymentChoice - The selected payment choice ('bitcoin', 'paypal', or credit-card).
 */
function showPayment (paymentChoice) {
    bitcoinPayment.setAttribute('hidden',true);
    paypalPayment.setAttribute('hidden', true);
    creditCardPayment.setAttribute('hidden', true)

    if (paymentChoice === 'bitcoin') {
        bitcoinPayment.removeAttribute('hidden');
    } else if (paymentChoice === 'paypal') {
        paypalPayment.removeAttribute('hidden');
    } else if (paymentChoice === 'credit-card') {
        creditCardPayment.removeAttribute('hidden');
    }
}
paymentMenu.addEventListener('change', e => showPayment(e.target.value));
const emailInput = document.getElementById('email');
const activityCheckboxes = [...document.querySelectorAll('[data-cost]')];

form.addEventListener('submit', e => {
    const username = nameField.value;
    const userEmail = emailInput.value;
    const cardNumber = document.getElementById('cc-num').value,
            cardZip = document.getElementById('zip').value,
            cardCVV = document.getElementById('cvv').value;
    
    //Working
    function isValidUsername(name) {
        return /^[a-zA-Z0-9_\s?]+$/i.test(name);
    }
    //working
    function isValidEmail(email){
        return /[^@]+@[^@]+\.[a-z]+/i.test(email);
    }
    //Working
    function selectedActivity(list){
        const isChecked = list.find( checkbox => checkbox.checked);
        return isChecked;
    }
    function isValidCard(numb, zip, cvv){
        const validNumber = /^[0-9]{13,16}$/.test(numb);
        const validZip = /^[0-9]{5}$/.test(zip);
        const validCVV = /^[0-9]{3}$/.test(cvv);

        if (validNumber && validZip && validCVV) {
            return true;
        } else {
            return false;
        }
    }

    if (!isValidUsername(username)) {
        e.preventDefault();
    }
    if (!isValidEmail(userEmail)) {
        e.preventDefault();
    }
    if (!selectedActivity(activityCheckboxes)) {
        e.preventDefault();
    }
    if (paymentMenu.value === 'credit-card'){
        if (!isValidCard(cardNumber, cardZip, cardCVV)) {
            e.preventDefault();
        }
    }
});