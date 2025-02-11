import fs from 'fs'

const args = process.argv.slice(2)
const environment = args[0]

const masterDir = environment === 'dev' ? 'public/master' : 'dist/master'
const imgDir = environment === 'dev' ? 'public/img' : 'dist/img'

if (!fs.existsSync(masterDir)) fs.mkdirSync(masterDir)
if (!fs.existsSync(`${masterDir}/masterSkills`)) fs.mkdirSync(`${masterDir}/masterSkills`)
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir)

const tableList = ['styles', 'events', 'accessories', 'characters', 'latest', ]
const getData = async () => {
  let latest = undefined
  let characters = undefined
  let styles = undefined
  // テーブル取得
  await Promise.all(tableList.map(table => fetch(`https://master.hbr.quest/${table}.json`)
    .then(res => res.json())
    .then(json => {
      fs.writeFileSync(`${masterDir}/${table}.json`, JSON.stringify(json, null, 2))
      switch (table) {
        case 'latest':
          latest = json
          break
        case 'characters':
          characters = json
          break
        case 'styles':
          styles = json
          break
      }
    })
  ))
  // master skill取得
  latest?.mSkills.ls.forEach(c => {
    fetch(`https://master.hbr.quest/masterSkills/${c.label}.json`)
      .then(res => res.json())
      .then(json => {
        fs.writeFileSync(`${masterDir}/masterSkills/${c.label}.json`, JSON.stringify(json, null, 2))
      })
  })
  // TODO 画像取得
  if (!fs.existsSync(`${imgDir}/b`)) fs.mkdirSync(`${imgDir}/b`)
  if (!fs.existsSync(`${imgDir}/ui`)) fs.mkdirSync(`${imgDir}/ui`)
  if (!fs.existsSync(`${imgDir}/hbr`)) fs.mkdirSync(`${imgDir}/hbr`)
  function imageFetch(path) {
    if (fs.existsSync(`${imgDir}${path}`)) return
    fetch(`https://hbr.quest${path}`)
      .then(res => res.blob())
      .then(blob => blob.arrayBuffer())
      .then(arrayBuffer => {
        fs.writeFileSync(`${imgDir}${path}`, Buffer.from(arrayBuffer))
      })
  }
  characters?.forEach(c => {
    // master icon
    imageFetch(`/b/${c.label}.webp`)

    // team icon
    const team = c.team.toLowerCase().replace(' ', '')
    imageFetch(`/ui/${team}.webp`)
  })
  styles?.forEach(s => {
    // select
    const select = s.bg.replace('.webp', '_Select.webp')
    imageFetch(`/hbr/${select}`)

    // thumbnail
    imageFetch(`/hbr/${s.image}`)
  })
}

getData().then()
