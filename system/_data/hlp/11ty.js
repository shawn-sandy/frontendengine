// @ts-check
'use strict'
const take = require('lodash.take')

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

const limit = ($arr = [], $limit = 3) => {
  if ($arr.length >= 1) { return take($arr, $limit) }
  return []
}

module.exports = {
  currentYear,
  strip: stripHtml,
  noHtml: stripHtml,
  timeAgo,
  stripHtml,
  formatDate,
  limit
}
