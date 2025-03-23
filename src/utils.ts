import type {RoleType} from '@/types/general.ts'
import type {Character} from '@/types/character.ts'

export async function api(url: string, init?: RequestInit) {
  return fetch(`https://ham-proxy.vercel.app/api/proxy/${url.replace('https://', '')}`, init)
}

export function throwText(msg: string): never {
  throw msg
}

export function toType<T>(value: unknown): T {
  const checkType = (v: unknown): v is T => !!value
  return checkType(value) ? value : throwText('Not a type')
}
export const roleColor: {[key in RoleType]: string} = {
  Attacker: '#92207f',
  Breaker: '#922024',
  Debuffer: '#682092',
  Buffer: '#20922c',
  Blaster: '#928d20',
  Healer: '#209281',
  Defender: '#205292',
  Admiral: '#1c1bd2',
}
export function getCharacterName(label: string, list: Character[]): string {
  const temp = list.find(it => it.label === label)?.name ?? ''
  return temp.split(' —')[0]
}
export const HAM_DOMAIN = '/ham-heaven-burns-red/img'
export const HBR_DOMAIN = 'https://hbr.quest'
export const HBR_ASSETS_DOMAIN = 'https://assets.hbr.quest/v1'
export const HBR_ASSETS_DOMAIN_OLD = 'https://assets.hbr.quest'
/*
export const images = {
    charSmallIcon(label: string) {
        return `https://hbr.quest/hbr/${label}SmallIcon.webp`
    },
    elementIcon(element: string) {
        return `https://hbr.quest/ui/${element}.webp`
    },
    styleHexagonIcon(background: string) {
        return `https://hbr.quest/hbr/${background.replace('.webp', '_StylePiece.webp')}`
    },
    // ノルドシュトロム結晶
    materialLv7() {
        return 'https://hbr.quest/hbr/ThumbnailMaterial_Lv7_Light.webp'
    },
    // ダイヤモンド
    diamond() {
        return 'https://hbr.quest/hbr/ThumbnailDiamond.webp'
    },
    // 悠久のダフネ
    daphne() {
        return 'https://hbr.quest/hbr/EternalDaphne.webp'
    },
    orbIcon(orb: string) {
        return `https://hbr.quest/hbr/${orb}.webp`
    },
    teamIcon(team: string) {
        return `https://hbr.quest/ui/${team.toLowerCase().replace(' ', '')}.webp`
    },
    image(webp: string) {
        return `https://hbr.quest/hbr/${webp}`
    },
    eventBg(logo: string) {
        // 有効パスが少なめ
        return `https://hbr.quest/hbr/${logo.replace('Logo', 'Bg')}`
    },
    eventBanner(logo: string) {
        // 有効パスが少なめ
        return `https://hbr.quest/hbr/${logo.replace('Logo', 'Banner')}`
    },
    // https://hbr.quest/g/RKayamoriProfile.webp?34
}
* */
