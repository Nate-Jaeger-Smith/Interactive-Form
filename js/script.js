const nameField = document.querySelector('input[type="text"]');
const otherJobInput = document.querySelector("#other-job-role");
const jobRoleSelect = document.querySelector('#title');

//Set focus on first form field
nameField.focus();

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

//Program the "Job Role" <select> element to listen for changes.
// When a change is detected, display/hide the "text field" based on the selection in the drop-down menu.