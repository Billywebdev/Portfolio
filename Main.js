// ========== DOM Elements ==========
// DOM element references for contact form
const contactForm = document.querySelector('.contact-form')
const messageField = document.getElementById('Message')
const subjectField = document.getElementById('Subject')
const firstNameField = document.getElementById('FirstName')
const lastNameField = document.getElementById('LastName')
const emailField = document.getElementById('Email')
const phoneNumberField = document.getElementById('Phonenumber')
const clearButton = document.querySelector('.clear-btn')
const menuToggle = document.getElementById('menuToggle')
const siteMenu = document.getElementById('site-menu')

// ========== Helper Functions ==========
// Function that displays an error message below a form field
function showError (field, errorMsg, customClass) {
  // Remove any existing error first to prevent duplicates
  clearError(field)

  // Create error message element
  const msg = document.createElement('span')
  msg.className = customClass || 'error-message'
  msg.textContent = errorMsg

  // Mark field as invalid and append error message
  field.classList.add('input-error')
  field.parentElement.appendChild(msg)
}

// Function that removes error messages and validation styling from a form field
function clearError (field) {
  // Remove standard error message
  const error = field.parentElement.querySelector('.error-message')
  if (error) error.remove()

  // Remove message-specific error (styled differently)
  const messageError = field.parentElement.querySelector('.message-required')
  if (messageError) messageError.remove()

  // Reset validation classes
  field.classList.remove('input-error', 'input-valid')
}

// Validates a form field against a regex pattern
function validate (field, regex, errorMsg) {
  const value = field.value.trim()

  // Clear any previous error states
  clearError(field)

  // Empty fields are considered valid (handled separately on submit)
  if (!value) return true

  // Test value against regex pattern
  if (!regex.test(value)) {
    showError(field, errorMsg)
    return false
  }

  // Mark field as valid (green border)
  field.classList.add('input-valid')
  return true
}

// Function that clears all form fields and removes validation states
function clearForm () {
  // Array of all form fields
  const fields = [
    firstNameField,
    lastNameField,
    emailField,
    phoneNumberField,
    subjectField,
    messageField
  ]

  // Reset each field's value and clear any errors
  fields.forEach(field => {
    if (field) {
      field.value = ''
      clearError(field)
    }
  })
}

// Function that displays a success message after form submission
function showSuccessMessage (firstName) {
  // Create success message element
  const successMsg = document.createElement('div')
  successMsg.className = 'success-message'
  successMsg.innerHTML = `Tack <span class="name-highlight">${firstName}</span> för visat intresse! Jag kommer att svara dig inom kort!`

  // Insert message above the form
  contactForm.parentElement.insertBefore(successMsg, contactForm)

  // Auto-remove message after 3 seconds
  setTimeout(() => {
    successMsg.remove()
  }, 20000)
}

// Function that validates form on submission
function handleFormSubmit (e) {
  // Prevent default form submission
  e.preventDefault()

  // Define all required fields
  const fields = [
    { field: firstNameField, name: 'Förnamn' },
    { field: lastNameField, name: 'Efternamn' },
    { field: emailField, name: 'E-post' },
    { field: subjectField, name: 'Ämne' },
    { field: messageField, name: 'Meddelande' }
  ]

  let hasErrors = false

  // Check for empty required fields
  fields.forEach(({ field, name }) => {
    if (field && !field.value.trim()) {
      // Use special styling for message field error
      const customClass = field === messageField ? 'message-required' : null
      showError(field, `${name} krävs`, customClass)
      hasErrors = true
    }
  })

  // Stop here if any fields are empty
  if (hasErrors) return

  // Check if all fields passed their validation rules
  const isFirstNameValid = firstNameField.classList.contains('input-valid')
  const isLastNameValid = lastNameField.classList.contains('input-valid')
  const isEmailValid = emailField.classList.contains('input-valid')
  const isSubjectValid = subjectField.classList.contains('input-valid')
  const isMessageValid = messageField.classList.contains('input-valid')

  // If all validations passed, submit the form
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isSubjectValid &&
    isMessageValid
  ) {
    const firstName = firstNameField.value.trim()
    showSuccessMessage(firstName)
    clearForm()
  }
}

// ========== Event Listeners ==========
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!isOpen))
  siteMenu?.classList.toggle('is-open', !isOpen)
  menuToggle.querySelector('.sr-only').textContent = isOpen
    ? 'Öppna meny'
    : 'Stäng meny'
})

siteMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false')
    siteMenu.classList.remove('is-open')
  })
})

// Validate first name on input (letters only)
firstNameField?.addEventListener('input', () =>
  validate(firstNameField, /^[A-Öa-ö]+$/, 'Bara bokstäver är tillåtna')
)

// Validate last name on input (letters only)
lastNameField?.addEventListener('input', () =>
  validate(lastNameField, /^[A-Öa-ö]+$/, 'Bara bokstäver är tillåtna')
)

// Validate email on input (must have @ and domain)
emailField?.addEventListener('input', () =>
  validate(
    emailField,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    'Måste innehålla @ och domän'
  )
)

// Validate message field (any characters makes it valid)
messageField?.addEventListener('input', () => {
  clearError(messageField)
  if (messageField.value.trim()) {
    messageField.classList.add('input-valid')
  }
})

// Validate subject dropdown when changed
subjectField?.addEventListener('change', () => {
  clearError(subjectField)
  if (subjectField.value) {
    subjectField.classList.add('input-valid')
  }
})

// Clear all form fields when Clear button is clicked
clearButton?.addEventListener('click', e => {
  e.preventDefault()
  clearForm()
})

// Validate form on submission
contactForm?.addEventListener('submit', handleFormSubmit)

// ========== THEME TOGGLE ==========
// Initialize theme on page load
function initializeTheme () {
  // Check for saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark'
  setTheme(savedTheme)
}

// Set the theme and update all UI elements
function setTheme (theme) {
  // Update HTML data-theme attribute
  document.documentElement.setAttribute('data-theme', theme)

  // Save preference to localStorage
  localStorage.setItem('theme', theme)

  // Update theme toggle button icons
  const sunIcon = document.querySelector('.sun-icon')
  const moonIcon = document.querySelector('.moon-icon')

  if (sunIcon && moonIcon) {
    if (theme === 'light') {
      sunIcon.style.display = 'none'
      moonIcon.style.display = 'block'
    } else {
      sunIcon.style.display = 'block'
      moonIcon.style.display = 'none'
    }
  }

  // Update video background
  const video = document.querySelector('.video-background')
  if (video) {
    video.src =
      theme === 'light'
        ? 'videos/Motion-graphics-light.mp4.mov'
        : 'videos/Motion-graphics.mp4'
  }

  // Update portrait image
  const portraitImg = document.querySelector('.nav-center img')
  if (portraitImg) {
    portraitImg.src =
      theme === 'light'
        ? 'images/Porträtt-svartvit2-lightmode.png'
        : 'images/Porträtt-svartvit2.png'
  }

  // Update hero title image
  const heroImg = document.getElementById('heroImage')
  if (heroImg) {
    heroImg.src =
      theme === 'light'
        ? 'images/Hero-title-light-mode.png'
        : 'images/Hero-title-green-light-reversed.png'
  }

  // Update designmanifest images
  const designmanifestCover = document.getElementById('designmanifest-cover')
  if (designmanifestCover) {
    const baseName = designmanifestCover.src.includes('lightmode')
      ? designmanifestCover.src.replace('-lightmode', '')
      : designmanifestCover.src
    designmanifestCover.src =
      theme === 'light' ? baseName.replace('.jpg', '-lightmode.jpg') : baseName
  }

  const designmanifestUppslag1 = document.getElementById(
    'designmanifest-uppslag1'
  )
  if (designmanifestUppslag1) {
    const baseName = designmanifestUppslag1.src.includes('lightmode')
      ? designmanifestUppslag1.src.replace('-lightmode', '')
      : designmanifestUppslag1.src
    designmanifestUppslag1.src =
      theme === 'light' ? baseName.replace('.jpg', '-lightmode.jpg') : baseName
  }

  const designmanifestUppslag2 = document.getElementById(
    'designmanifest-uppslag2'
  )
  if (designmanifestUppslag2) {
    const baseName = designmanifestUppslag2.src.includes('lightmode')
      ? designmanifestUppslag2.src.replace('-lightmode', '')
      : designmanifestUppslag2.src
    designmanifestUppslag2.src =
      theme === 'light' ? baseName.replace('.jpg', '-lightmode.jpg') : baseName
  }

  const designmanifestUppslag3 = document.getElementById(
    'designmanifest-uppslag3'
  )
  if (designmanifestUppslag3) {
    const baseName = designmanifestUppslag3.src.includes('lightmode')
      ? designmanifestUppslag3.src.replace('-lightmode', '')
      : designmanifestUppslag3.src
    designmanifestUppslag3.src =
      theme === 'light' ? baseName.replace('.jpg', '-lightmode.jpg') : baseName
  }
}

// Toggle between dark and light modes
function toggleTheme () {
  const currentTheme = localStorage.getItem('theme') || 'dark'
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
}

// Add event listener to theme toggle button
const themeToggle = document.getElementById('themeToggle')
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme)
}

// Initialize theme on page load
initializeTheme()
