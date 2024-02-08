const nameField = document.getElementById( 'name' ),
	colorSelect = document.getElementById( 'color' ),
	otherJobInput = document.getElementById( 'other-job-role' ),
	jobRoleSelect = document.getElementById( 'title' ),
	designMenu = document.querySelector( '#design' ),
	activityRegister = document.getElementById( 'activities-box' ),
	activitiesTotal = document.getElementById( 'activities-cost' ),
	paymentMenu = document.getElementById( 'payment' ),
	bitcoinPayment = document.getElementById( 'bitcoin' ),
	paypalPayment = document.getElementById( 'paypal' ),
	creditCardPayment = document.getElementById( 'credit-card' ),
	form = document.querySelector( 'form' ),
	emailInput = document.getElementById( 'email' ),
    emailHint = emailInput.nextElementSibling,
	activityCheckboxes = document.querySelectorAll( '[data-cost]' ),
	checkboxParent = activityCheckboxes[ 0 ].parentElement.parentElement,
	cardNumber = document.getElementById( 'cc-num' ),
	cardZip = document.getElementById( 'zip' ),
	cardCVV = document.getElementById( 'cvv' );

// Set focus on name field, disable color select.
nameField.focus();
colorSelect.disabled = true;

// Set credit-card as selected in paymentMenu and hide otherJobInput, bitcoinPayment, and paypalPayment elements.
paymentMenu.children[ 1 ].selected = true;
otherJobInput.setAttribute( 'hidden', true );
bitcoinPayment.setAttribute( 'hidden', true );
paypalPayment.setAttribute( 'hidden', true );

/**
 * Event listener for the change event on the jobRoleSelect element.
 * Toggles the hidden attribute of the otherJobInput element based on the selected value.
 */
jobRoleSelect.addEventListener( 'change', () => {
	const jobSelection = jobRoleSelect.value;
	if ( jobSelection === 'other' ) {
		otherJobInput.removeAttribute( 'hidden' );
	} else {
		otherJobInput.setAttribute( 'hidden', true );
	}
} );

/**
 * Event listener for the change event on the designMenu element.
 * Toggles 'hidden' on options that are not valid color matches.
 * Sets color select element to display first matching color.
 * @param {event} e - The event object
 */
designMenu.addEventListener( 'change', e => {
	colorSelect.disabled = false;
	const shirtSelection = e.target.value;
	const shirtColors = [ ...colorSelect.children ];
	const matchingShirtColors = shirtColors.filter( color => {
		if ( color.dataset.theme !== shirtSelection ) {
			color.setAttribute( 'hidden', true );
		} else {
			color.removeAttribute( 'hidden' );
			return color;
		}
	} );
	matchingShirtColors[ 0 ].selected = true;
} );

let totalCost = 0;
/**
 * Event listener for the change event on the activityRegister fieldset.
 * Updates the total cost of selected activities and displays it.
 * @param {Event} e - The event object.
 */
activityRegister.addEventListener( 'change', e => {
	const activity = e.target,
		cost = parseInt( activity.dataset.cost ),
		dateAndTime = activity.dataset.dayAndTime,
		activityArray = [ ...activityCheckboxes ];
	activity.checked ? totalCost += cost : totalCost -= cost;
	activitiesTotal.textContent = `Total: $${totalCost}`;
	activityArray.filter( checkbox => checkbox.dataset.dayAndTime === dateAndTime )
		.forEach( checkbox => {
			if ( activity.checked ) {
				if ( checkbox !== activity ) {
					checkbox.disabled = true;
					checkbox.parentElement.classList.add( 'disabled' );
				}
			} else {
				checkbox.removeAttribute( 'disabled' );
				checkbox.parentElement.classList.remove( 'disabled' );
			}
		} );
} );

/**
 * Handles the display of payment options based on the selected payment choice.
 * @param {string} paymentChoice - The selected payment choice ('bitcoin', 'paypal', or 'credit-card').
 */
function showPayment( paymentChoice ) {
	bitcoinPayment.setAttribute( 'hidden', true );
	paypalPayment.setAttribute( 'hidden', true );
	creditCardPayment.setAttribute( 'hidden', true )
	if ( paymentChoice === 'bitcoin' ) {
		bitcoinPayment.removeAttribute( 'hidden' );
	} else if ( paymentChoice === 'paypal' ) {
		paypalPayment.removeAttribute( 'hidden' );
	} else if ( paymentChoice === 'credit-card' ) {
		creditCardPayment.removeAttribute( 'hidden' );
	}
} //Call showPayment when payment method changes
paymentMenu.addEventListener( 'change', e => showPayment( e.target.value ) );

/**
 * Validates the input value of the given element against a given regular expression.
 * Updates the styles of the parent element based on the validation result.
 * @param {HTMLElement} element - The element to be validated.
 * @param {RegExp} regex - The regular expression used.
 * @returns {boolean} - Indicates whether the input passed validation.
 */
function validateInput( element, regex ) {
	const isValid = regex.test( element.value );
	updateValidStyle( element, isValid );
	return isValid;
}

/**
 * Updates the style of the parent element based on the validation result.
 * Adds or removes 'valid' and 'not-valid' classes to the parent element.
 * Toggles the display of the last-child element based on the validation result.
 * @param {HTMLElement} element - The input element whose style is being updated.
 * @param {boolean} isValid - The validity of the input element.
 */
function updateValidStyle( element, isValid ) {
	const parent = element.parentElement;
	parent.classList.toggle( 'valid', isValid );
	parent.classList.toggle( 'not-valid', !isValid );
	parent.lastElementChild.style.display = isValid ? 'none' : 'block';
}

/**
 * Event listener for form submission.
 * Validates form inputs including username, email, selected activity, and credit-card details.
 * Prevents form submission if any validation fails.
 * @param {Event} e - The submit event object.
 */
form.addEventListener( 'submit', e => {
	const username = validateInput( nameField, /^[a-zA-Z0-9_\s?]+$/i ),
		userEmail = validateInput( emailInput, /[^@]+@[^@]+\.[a-z]+/i ),
		isActivitySelected = totalCost !== 0,
		isCardSelected = paymentMenu.value === 'credit-card',
		isCardValid = isCardSelected ? isValidCard( cardNumber.value, cardZip.value, cardCVV.value ) : true;
	if ( !username || !userEmail || !isCardValid || !isActivitySelected ) {
		e.preventDefault();
		updateValidStyle( checkboxParent, isActivitySelected );
	}

	function isValidCard( numb, zip, cvv ) {
		const validNumber = /^[0-9]{13,16}$/.test( numb ),
			validZip = /^[0-9]{5}$/.test( zip ),
			validCVV = /^[0-9]{3}$/.test( cvv );
		updateValidStyle( cardNumber, validNumber );
		updateValidStyle( cardZip, validZip );
		updateValidStyle( cardCVV, validCVV );
		return validNumber && validZip && validCVV;
	}
} );

/**
 * Adds the 'focus' class to the checkbox's parent label element when in focus.
 * Removes the 'focus' class on the checkbox's parent label element when out of focus.
 */
activityRegister.addEventListener( 'focusin', e => {
	const label = e.target.parentElement;
	label.classList.add( 'focus' );
} );
activityRegister.addEventListener( 'focusout', e => {
	const label = e.target.parentElement;
	label.classList.remove( 'focus' );
} );

// Event listener for 'keyup' on cardNumber input. Provides real-time error messaging.
cardNumber.addEventListener( 'keyup', () => validateInput( cardNumber, /^[0-9]{13,16}$/ ) );

// Validates the email input value on keyup and displays appropriate error messages.
emailInput.addEventListener( 'keyup', () => {
    const email = emailInput.value;
    if ( email.length !== 0 ) {
        validateInput( emailInput, /[^@]+@[^@]+\.[a-z]+/i );
        if ( !/@\w+\./.test( email ) ) {
            emailHint.textContent = "Email must contain a '@' and '.' character";
        }
    } else {
        emailHint.textContent = "Email field cannot be left blank";
    }
});