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
    creditCardPayment = document.getElementById('credit-card');

// Set focus on name field, disable color select, and hide other job & non credit-card payment elements
nameField.focus();
colorSelect.disabled = true;
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
 * Sets color select element to display first 
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
 * @param {string} paymentChoice - The selected payment choice ('bitcoin', 'paypal', or other).
 */
function showPayment (paymentChoice) {
    bitcoinPayment.setAttribute('hidden',true);
    paypalPayment.setAttribute('hidden', true);
    creditCardPayment.setAttribute('hidden', true)

    if (paymentChoice === 'bitcoin') {
        bitcoinPayment.removeAttribute('hidden');
    } else if (paymentChoice === 'paypal') {
        paypalPayment.removeAttribute('hidden');
    } else {
        creditCardPayment.removeAttribute('hidden');
    }
}
paymentMenu.addEventListener('change', e => showPayment(e.target.value));

