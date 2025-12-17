// Contact form elements
const contactForm = document.querySelector('.contact-form')
const messageField = document.getElementById('Message')
const subjectField = document.getElementById('Subject')
const firstNameField = document.getElementById('FirstName')
const lastNameField = document.getElementById('LastName')
const emailField = document.getElementById('Email')
const phoneNumberField = document.getElementById('Phonenumber')
const clearButton = document.querySelector('.clear-btn')
const sendButton = document.querySelector('.send-btn')

// Validation function
function validate (field, regex, errorMsg) {
  const value = field.value.trim()
  const error = field.parentElement.querySelector('.error-message')

  if (error) error.remove()
  field.classList.remove('input-error', 'input-valid')

  if (!value) return true

  if (!regex.test(value)) {
    const msg = document.createElement('span')
    msg.className = 'error-message'
    msg.textContent = errorMsg
    field.classList.add('input-error')
    field.parentElement.appendChild(msg)
    return false
  }

  field.classList.add('input-valid')
  return true
}

// Add validation listeners
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
