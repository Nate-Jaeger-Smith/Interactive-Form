const nameField = document.getElementById('name');
const otherJobInput = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');

//Set focus on first form field && disable color select menu
nameField.focus();
colorSelect.disabled = true;

//Hide 'Other' job role input until 'Other' is selected in dropdown
otherJobInput.style.display = 'none';



jobRoleSelect.addEventListener('change', e => {
    const jobSelection = jobRoleSelect.value;
    //console.log(jobSelection);
    if (jobSelection === 'other') {
        otherJobInput.style.display = 'inherit';
    } else {
        otherJobInput.style.display = 'none';
    }
});


const designMenu = document.querySelector('#design');

designMenu.addEventListener('change', e => {
    colorSelect.disabled = false;
    const shirtSelection = e.target.value;
    const shirtColors = [...colorSelect.children];

    const matchingShirtColors = shirtColors.filter( color => {
        if (color.dataset.theme !== shirtSelection){
            color.style.display = 'none';
        } else {
            color.style.display = 'block';
            return color;
        }
    });
    matchingShirtColors[0].selected = true;
});
/**
 * Disable the "Color" <select> element.
    Set up the "Design" <select> element to listen for changes. When a change is detected:
        The "Color" <select> element should be enabled.
        The "Color" <select> element should display an available color.
        The "Color" dropdown menu should display only the color options associated with the selected design. For example:
        If the user selects "Theme - JS Puns" then the "Color" menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
        If the user selects "Theme - I ♥ JS" then the "Color" menu should only display "Tomato," "Steel Blue," and "Dim Grey."
 */