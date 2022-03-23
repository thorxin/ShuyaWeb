import HtmlReactParser from 'html-react-parser'

export const tagToText = (Description) => {
  if (Description) {
    let myHTML = HtmlReactParser(Description)
    let strippedHtml = myHTML.replace(/<[^>]+>/g, '')
    return strippedHtml
  } else {
    return
  }
}
