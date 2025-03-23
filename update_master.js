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
  let characters = undefined
  let styles = undefined
  // テーブル取得
  await Promise.all(tableList.map(table => fetch(`https://master.hbr.quest/${table}.json`)
    .then(res => res.json())
    .then(json => {
      fs.writeFileSync(`${masterDir}/${table}.json`, JSON.stringify(json, null, 2))
      switch (table) {
        case 'characters':
          characters = json
          break
        case 'styles':
          styles = json
          break
      }
    })
  ))
  // TODO 画像取得
  if (!fs.existsSync(`${imgDir}/b`)) fs.mkdirSync(`${imgDir}/b`)
  if (!fs.existsSync(`${imgDir}/g`)) fs.mkdirSync(`${imgDir}/g`)
  if (!fs.existsSync(`${imgDir}/ui`)) fs.mkdirSync(`${imgDir}/ui`)
  if (!fs.existsSync(`${imgDir}/hbr`)) fs.mkdirSync(`${imgDir}/hbr`)
  if (!fs.existsSync(`${imgDir}/al`)) fs.mkdirSync(`${imgDir}/al`)
  if (!fs.existsSync(`${imgDir}/pf`)) fs.mkdirSync(`${imgDir}/pf`)
  function imageFetch(path) {
    if (fs.existsSync(`${imgDir}${path}`)) return
    fetch(`https://assets.hbr.quest/v1${path}`)
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

    // profile image
    imageFetch(`/g/${c.w_image}`)

    // full image
    if (!fs.existsSync(`${imgDir}/pf/${team}`)) fs.mkdirSync(`${imgDir}/pf/${team}`)
    imageFetch(`/pf/${team}/${c.label}.webp`)
  })
  characters = undefined
  styles?.forEach(s => {
    // select
    const select = s.bg.replace('.webp', '_Select.webp')
    imageFetch(`/hbr/${select}`)

    // thumbnail
    imageFetch(`/hbr/${s.image}`)
  })
  styles = undefined

  // ui icon
  imageFetch(`/al/IconUp.webp`)
  imageFetch(`/al/IconDown.webp`)
}

getData().then()
