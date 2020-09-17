/* eslint-disable prettier/prettier */
/* eslint-disable semi */
export default class InputScripts {
  allowOnlyNumber(text) {
    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let resultText = '';

    for (let i = 0; i < text.length; i++) {
      if (numbers.includes(text[i])) {
        resultText += text[i]
      }
    }
    return resultText
  }


  filterCharacters(chars, text) {
    for (let i = 0; i < chars.length; i++) {
      while (text.indexOf(chars[i]) > -1){
        text = text.substring(0, text.indexOf(chars[i])) + text.substring(text.indexOf(chars[i]) + chars[i].length, text.length)
      }
    }
    return text
  }

}
