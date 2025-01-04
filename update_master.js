import fs from 'fs'

const args = process.argv.slice(2)
const environment = args[0]

const dir = environment === 'dev' ? 'public/master' : 'dist/master'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

fetch('https://master.hbr.quest/styles.json')
  .then(res => res.json())
  .then(json => fs.writeFileSync(`${dir}/styles.json`, JSON.stringify(json, null, 2)))
