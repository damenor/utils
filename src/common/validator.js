const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g

const isEmpty = value => value === undefined || value === null || value === ''

const validation = ({value, rule}) => {
  const keyRule = Object.keys(rule)[0]
  const valueRule = rule[keyRule]
  switch (keyRule){
    case 'isEmpty': return isEmpty(value)
    case 'isEmail': return !isEmpty(value) && regexEmail.test(value)
    case 'isPhone': return !isEmpty(value) && regexPhone.test(value)
    case 'isRequired': return isEmpty(value)
    case 'isInteger': return !Number.isInteger(Number(value))
    case 'isMatch': return value === valueRule
    case 'min': return !isEmpty(value) && value.length < valueRule
    case 'max': return !isEmpty(value) && value.length > valueRule
  }
}

export const validator = ({value, rules}) => {
  let errors = {}
  Object.keys(rules).map(key => {
    const rule = {}
    rule[key] = rules[key]
    errors[key] = validation({value, rule})
  })
  return errors
}