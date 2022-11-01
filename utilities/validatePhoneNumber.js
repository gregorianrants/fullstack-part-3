function validatePhoneNumber(phoneNumberString) {
  //tests whether phone number has 8 digits or more.
  //if has hyphen can start with 2 or 3 numbers followed by hyphen
  //alternatively it can have all numbers
  const numberOfDigits = phoneNumberString.match(/\d/g).length
  //pattern just checks if we have correct number of digits before hyphen or all numbers.
  const pattern = /^((\d{2}|\d{3})-)?\d{5,}$/.test(phoneNumberString)
  //the number of digits after hyphen depends on how many were before so we still need to check total count
  return numberOfDigits >= 8 && pattern
}

module.exports = validatePhoneNumber

// const pass = ["123-45678", "12-345678","12345678","123-456789", "12-3456789","123456789"];
// console.log('pass')
// pass.forEach(el=>console.log(validatePhoneNumber(el)))

// const fail =  ["1-2345678", "1234-5678","123-4567", "12-34567","1234567","b123-45678", "12-34b5678","12345678b",
// "123-4567-8", "12-34-5678","1234-5678"
// ]
// console.log('fail')
// fail.forEach(el=>{
//         console.log(validatePhoneNumber(el))
// })
