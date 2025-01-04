import fs from 'fs'

const args = process.argv.slice(2)
const environment = args[0]

const dir = environment === 'dev' ? 'public/master' : 'dist/master'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const tableList = ['styles', 'events', 'accessories', 'characters']
for (const table of tableList) {
  fetch(`https://master.hbr.quest/${table}.json`)
    .then(res => res.json())
    .then(json => fs.writeFileSync(`${dir}/${table}.json`, JSON.stringify(json, null, 2)))
}
