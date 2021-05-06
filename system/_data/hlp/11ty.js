// @ts-check
'use strict'
const dayjs = require("dayjs")
const date = new Date()
const relativeTime = require('dayjs/plugin/relativeTime')


const currentYear = () => date.getFullYear()

const formatDate = (date) => new Date(date).toDateString()

// @ts-ignore
const timeAgo = (date) => {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow()
}

const stripHtml = (content = null) => {
  if (content === null || content === undefined) return
  return content.replace(/(<([^>]+)>)/ig, '')
}

module.exports = {
  year: currentYear,
  strip: stripHtml,
  noHtml: stripHtml,
  timePosted: timeAgo,
  formatDate: formatDate
}
