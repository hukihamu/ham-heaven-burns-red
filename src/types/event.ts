export interface Event {
  id: number
  notice_id: number
  label: string
  name: string
  desc: string
  logo: string
  image: string
  condition: string
  missions: unknown[]
  exchange: unknown[]
  prism: unknown[]
  dungeon: unknown[]
  in_date: string
  out_date: string
}
