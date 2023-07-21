const {BabyConnect} = require('./src/baby_connect');

const un = process.env.BABYCONNECTUSER
const pw = process.env.BABYCONNECTPW

const bc = new BabyConnect(un, pw, 'device-id')
bc.getUser()
  .then(user => {
    // console.log('got a user')
    // console.log(JSON.stringify(user, null, 2))
    return user.kidByName('Drew')
  })
  .then(kid => {
    // console.log('got a kid')
    // console.log(JSON.stringify(kid, null, 2))
    return bc.request.getKidSummary(kid.id)
  })
  .then(data => {
    console.log('got a summary')
    console.log(JSON.stringify(data, null, 2))
    console.log('returning')
    console.log(JSON.stringify({
      summary: data.summary,
      list: data.list.map((item) => {
        const date = new Date()
        date.setHours(Math.floor(item.Utm / 100))
        date.setMinutes(item.Utm % 100)
        const listItem = {
          text: item.Txt,
          date
        }
        return listItem
      })
    }, null, 2))
  })
  .catch(e => console.error('Error!', e))