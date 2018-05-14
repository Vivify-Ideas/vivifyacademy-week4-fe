const RULES = {
  REQUIRED: 'required',
  NUMBER: 'number',
  EMAIL: 'email'
}
const MESSAGES_CLASSNAME = 'validator-messages'

const removeMessageErrorElement = (element) => {
  // remove old message element
  let oldMessageElement =
  element.querySelector(`#${MESSAGES_CLASSNAME}`)

  if (oldMessageElement) {
    oldMessageElement.remove()
  }
}

const MyDirectives = {
  install: function(Vue) {
    Vue.directive('focusOn', {
      inserted: function(element) {
        element.focus()
      }
    })

    Vue.directive('validate', {
      inserted: function(element, binding) {
        let validationRules = binding.value

        element.addEventListener('submit', (event) => {
          event.preventDefault()
          Object.keys(validationRules).forEach(key => {
            let input = element.querySelector(`#${key}`)
            if (!input) {
              throw new Error(
                `Element for validation rule ${key} not found!`
              )
            }

            if (
              validationRules[key].indexOf(RULES.REQUIRED) > -1 &&
              !input.value.length
            ) {
              let messageElement = document.createElement('div')
              messageElement.id = MESSAGES_CLASSNAME

              // remove old message element
              removeMessageErrorElement(element)

              messageElement.innerHTML = `${key.toUpperCase()} field is required`
              element.appendChild(messageElement)
            } else {
              removeMessageErrorElement(element)
            }
          });
        })
      }
    })
  }
}

export default MyDirectives