// Variables for contact form elements
const contactForm = document.querySelector('.contact-form')
const messageField = document.getElementById('Message')
const subjectField = document.getElementById('Subject')
const firstNameField = document.getElementById('FirstName')
const lastNameField = document.getElementById('LastName')
const emailField = document.getElementById('Email')
const phoneNumberField = document.getElementById('Phonenumber')
const clearButton = document.querySelector('.clear-btn')
const sendButton = document.querySelector('.send-btn')

// Validation function for name fields (letters only)
function validateNameField (field) {
  const value = field.value.trim()
  const lettersOnlyRegex = /^[A-Öa-ö]+$/

  // Remove any existing error message
  const existingError = field.parentElement.querySelector('.error-message')
  if (existingError) {
    existingError.remove()
  }

  // Check if field has value and contains only letters
  if (value && !lettersOnlyRegex.test(value)) {
    // Create and display error message
    const errorMessage = document.createElement('span')
    errorMessage.className = 'error-message'
    errorMessage.textContent = 'Only letters are allowed'
    errorMessage.style.color = '#ff6b6b'
    errorMessage.style.fontSize = '0.75rem'
    errorMessage.style.marginTop = '4px'
    errorMessage.style.display = 'block'
    errorMessage.style.position = 'absolute'

    // Add red border to input
    field.style.border = '2px solid #ff6b6b'

    // Insert error message after input
    field.parentElement.appendChild(errorMessage)
    return false
  } else if (value && lettersOnlyRegex.test(value)) {
    // Add green border if valid
    field.style.border = '2px solid #4caf50'
    return true
  } else {
    // Reset border if empty
    field.style.border = ''
    return true
  }
}

// Add event listeners for name validation
if (firstNameField) {
  firstNameField.addEventListener('input', function () {
    validateNameField(firstNameField)
  })
}

if (lastNameField) {
  lastNameField.addEventListener('input', function () {
    validateNameField(lastNameField)
  })
}
