import fs from 'fs'

const args = process.argv.slice(2)
const environment = args[0]

const dir = environment === 'dev' ? 'public/master' : 'dist/master'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)
if (!fs.existsSync(`${dir}/masterSkills`)) fs.mkdirSync(`${dir}/masterSkills`)

const tableList = ['styles', 'events', 'accessories', 'characters', 'latest', ]
const getData = async () => {
  let latest = undefined
  // テーブル取得
  await Promise.all(tableList.map(table => fetch(`https://master.hbr.quest/${table}.json`)
    .then(res => res.json())
    .then(json => {
      fs.writeFileSync(`${dir}/${table}.json`, JSON.stringify(json, null, 2))
      switch (table) {
        case 'latest':
          latest = json
          break
      }
    })
  ))
  // master skill取得
  latest?.mSkills.ls.forEach(c => {
    fetch(`https://master.hbr.quest/masterSkills/${c.label}.json`)
      .then(res => res.json())
      .then(json => {
        fs.writeFileSync(`${dir}/masterSkills/${c.label}.json`, JSON.stringify(json, null, 2))
      })
  })
  // TODO 画像取得
}

getData().then()
