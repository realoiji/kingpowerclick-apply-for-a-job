export const validThaiID = (id) => {
  if (id == null || id.length !== 13 || !/^[0-9]\d+$/.test(id)) {
    return false
  }
  let i
  let sum = 0
  for (i = 0, sum = 0; i < 12; i += 1) {
    sum += parseInt(id.charAt(i), 13) * (13 - i)
  }
  const check = (11 - (sum % 11)) % 10
  if (check === parseInt(id.charAt(12), 13)) {
    return true
  }
  return false
}

export const validateMobilePhone = (phoneNumber) =>
  /^\d{10,10}/.test(phoneNumber)
