import moment from 'moment'

export function needsUpdate({ updatedAt }, seconds = 30) {
  if (!updatedAt) return true
  const secondsAgo = moment().subtract(seconds, 'seconds')
  return moment(updatedAt).isBefore(secondsAgo)
}
