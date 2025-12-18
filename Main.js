// DOM element references for contact form
const contactForm = document.querySelector('.contact-form')
const messageField = document.getElementById('Message')
const subjectField = document.getElementById('Subject')
const firstNameField = document.getElementById('FirstName')
const lastNameField = document.getElementById('LastName')
const emailField = document.getElementById('Email')
const phoneNumberField = document.getElementById('Phonenumber')
const clearButton = document.querySelector('.clear-btn')
const sendButton = document.querySelector('.send-btn')

// Function that displays error message for a form field
function showError (field, errorMsg) {
  const msg = document.createElement('span')
  msg.className = 'error-message'
  msg.textContent = errorMsg
  field.classList.add('input-error')
  field.parentElement.appendChild(msg)
}

// Function that remove error message and styling from a form field
function clearError (field) {
  const error = field.parentElement.querySelector('.error-message')
  if (error) error.remove()
  const counter = field.parentElement.querySelector('.char-counter')
  if (counter) counter.remove()
  field.classList.remove('input-error', 'input-valid')
}

// Function that validates form fields
function validate (field, regex, errorMsg) {
  const value = field.value.trim()

  clearError(field)

  if (!value) return true

  if (!regex.test(value)) {
    showError(field, errorMsg)
    return false
  }

  field.classList.add('input-valid')
  return true
}

// Character counter for message field
function updateCharCounter (field, minLength) {
  const value = field.value
  const length = value.length

  // Remove existing counter
  const existingCounter = field.parentElement.querySelector('.char-counter')
  if (existingCounter) existingCounter.remove()

  // Clear error and validation states
  clearError(field)

  // Don't show counter if field is empty
  if (length === 0) return

  // Create and display counter
  const counter = document.createElement('span')
  counter.className = 'char-counter'
  counter.textContent = `${length} / ${minLength} characters`

  if (length < minLength) {
    counter.classList.add('counter-invalid')
    field.classList.add('input-error')
  } else {
    counter.classList.add('counter-valid')
    field.classList.add('input-valid')
  }

  field.parentElement.appendChild(counter)
}

// Function that clears all form fields
function clearForm () {
  const fields = [
    firstNameField,
    lastNameField,
    emailField,
    phoneNumberField,
    subjectField,
    messageField
  ]
  fields.forEach(field => {
    if (field) {
      field.value = ''
      clearError(field)
    }
  })
}

// Eventlisteners for form fields
firstNameField?.addEventListener('input', () =>
  validate(firstNameField, /^[A-Öa-ö]+$/, 'Only letters are allowed')
)
lastNameField?.addEventListener('input', () =>
  validate(lastNameField, /^[A-Öa-ö]+$/, 'Only letters are allowed')
)
emailField?.addEventListener('input', () =>
  validate(
    emailField,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    'Must include @ and domain'
  )
)
messageField?.addEventListener('input', () =>
  updateCharCounter(messageField, 20)
)
subjectField?.addEventListener('change', () => {
  clearError(subjectField)
  if (subjectField.value) {
    subjectField.classList.add('input-valid')
  }
})
clearButton?.addEventListener('click', e => {
  e.preventDefault()
  clearForm()
})
