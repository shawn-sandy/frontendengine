'use strict'

const date = new Date()

const currentYear = () => date.getFullYear()

const formatDate = (date) => new Date(date).toDateString()

const stripHtml = (content = null) => {
  if (content === null || content === undefined) return
  return content.replace(/(<([^>]+)>)/ig, '')
}

module.exports = {
  year: currentYear,
  strip: stripHtml,
  noHtml: stripHtml,
  formatDate: formatDate
}
