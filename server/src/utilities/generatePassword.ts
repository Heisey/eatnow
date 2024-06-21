const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const passwordLength = 12;
const password = "";

export const generatePassword = (length: number | undefined = 8) => {
  let result = ''
  for (var i = 0; i <= length; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    result += chars.substring(randomNumber, randomNumber +1);
   }
   return result
}