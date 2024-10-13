function validateInput(input) {
	const regex = /^[a-zA-Z0-9]+$/;
	return regex.test(input);
}

let form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
	let input = document.getElementById("inputField").value;
	if (validateInput(input)) {
		alert("Success! Value is valid");
		form.submit();
	} else {
		event.preventDefault();
		alert("Error: value is not alphanumeric");
	}
});


// JavaScript code for form validation
// Prevent form from submitting

// Retrieve the input field value

// Regular expression pattern for alphanumeric input

// Check if the input value matches the pattern

// Valid input: display confirmation and submit the form

// Invalid input: display error message