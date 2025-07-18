<script setup lang="ts">

import {useMasterStore} from '@/stores/master.ts'
import {computed, ref} from 'vue'
import SeraphDBImage from '@/components/SeraphDBImage.vue'
import {utils} from '@/utils.ts'
import type {Card} from '@/types/character.ts'
import {useUserStore} from '@/stores/user.ts'

const skillTypesJP  = [
  {'value': 'AttackNormal', 'title': '通常攻撃'},
  {'value': 'AttackSkill', 'title': 'ダメージスキル'},
  {'value': 'HealDp', 'title': 'DP回復'},
  {'value': 'DefenseDown', 'title': '防御力ダウン'},
  {'value': 'SkillSwitch', 'title': 'スキルスイッチ'},
  {'value': 'MindEye', 'title': '心眼'},
  {'value': 'SkillCondition', 'title': 'スキル効果変化'},
  {'value': 'CriticalRateUp', 'title': 'クリティカル率アップ'},
  {'value': 'CriticalDamageUp', 'title': 'クリティカルダメージアップ'},
  {'value': 'Diva', 'title': '歌姫の加護'},
  {'value': 'RecoilRandom', 'title': '反動'},
  {'value': 'AttackUp', 'title': '攻撃力アップ'},
  {'value': 'SuperBreak', 'title': '強ブレイク'},
  {'value': 'AttackDown', 'title': '攻撃力ダウン'},
  {'value': 'HealSkillUsedCount', 'title': 'スキル使用回数回復'},
  {'value': 'Zone', 'title': '属性強化フィールド'},
  {'value': 'RemoveBuff', 'title': 'バフ解除'},
  {'value': 'StunRandom', 'title': 'スタン'},
  {'value': 'Fragile', 'title': '脆弱'},
  {'value': 'Misfortune', 'title': '厄'},
  {'value': 'HealDown', 'title': '回復量ダウン'},
  {'value': 'HealSpRandom', 'title': 'SP上昇'},
  {'value': 'ResistDownOverwrite', 'title': '属性耐性打ち消し'},
  {'value': 'Funnel', 'title': '連撃数アップ'},
  {'value': 'ResistDown', 'title': '属性耐性ダウン'},
  {'value': 'GiveAttackBuffUp', 'title': '攻撃力アップスキル効果アップ'},
  {'value': 'DamageRateChangeAttackSkill', 'title': '破壊率変化'},
  {'value': 'DoubleActionExtraSkill', 'title': 'EXスキル連続発動'},
  {'value': 'ReviveDp', 'title': 'DP復活'},
  {'value': 'HealSp', 'title': 'SP回復'},
  {'value': 'RegenerationDp', 'title': '継続DP回復'},
  {'value': 'FightingSpirit', 'title': '闘志'},
  {'value': 'RemoveSpecialStatus', 'title': '状態変化解除'},
  {'value': 'Provoke', 'title': '挑発'},
  {'value': 'HealDpByDamage', 'title': 'DP吸収'},
  {'value': 'DefenseUp', 'title': '防御力アップ'},
  {'value': 'TokenSet', 'title': 'トークン上昇'},
  {'value': 'Invincible', 'title': 'ダメージ無効'},
  {'value': 'Cover', 'title': '注目'},
  {'value': 'TokenAttack', 'title': 'ダメージスキル(トークン比例)'},
  {'value': 'TokenChangeTimeline', 'title': 'TokenChangeTimeline'},
  {'value': 'DebuffGuard', 'title': 'デバフ無効'},
  {'value': 'OverDrivePointUp', 'title': 'オーバードライブゲージ上昇'},
  {'value': 'AttackUpIncludeNormal', 'title': '通常攻撃変化(攻撃力アップ)'},
  {'value': 'PenetrationCriticalAttack', 'title': '貫通クリティカル'},
  {'value': 'SkillRandom', 'title': 'ランダムスキル効果'},
  {'value': 'ImprisonRandom', 'title': '封印'},
  {'value': 'Morale', 'title': '士気'},
  {'value': 'GiveDebuffUp', 'title': 'デバフスキル効果アップ'},
  {'value': 'BreakGuard', 'title': 'ブレイクガード'},
  {'value': 'AttackByOwnDpRate', 'title': 'ダメージスキル(現在DP比例)'},
  {'value': 'AdditionalTurn', 'title': '追加ターン'},
  {'value': 'ConfusionRandom', 'title': '混乱'},
  {'value': 'ShadowClone', 'title': '影分身'},
  {'value': 'ArrowCherryBlossoms', 'title': '桜花の矢'},
  {'value': 'ToughnessUpValue', 'title': '体力アップ'},
  {'value': 'BuffCharge', 'title': 'チャージ'},
  {'value': 'RemoveDebuff', 'title': 'RemoveDebuff'},
  {'value': 'OverDrivePointDown', 'title': 'オーバードライブゲージ減少'},
  {'value': 'DamageRateUp', 'title': '破壊率上昇量アップ'},
  {'value': 'SelfDamage', 'title': 'DP犠牲'},
  {'value': 'FixedHpDamageRateAttack', 'title': '現在HP割合ダメージ'},
  {'value': 'SpecifySp', 'title': 'SP固定'},
  {'value': 'AttackBySp', 'title': 'ダメージスキル(SP全消費)'},
  {'value': 'EternalOath', 'title': '永遠なる誓い'},
  {'value': 'Dodge', 'title': '回避率アップ'},
  {'value': 'Shredding', 'title': '速弾き'},
  {'value': 'AdditionalHitOnBreaking', 'title': 'ハッキング'},
  {'value': 'BreakDownTurnUp', 'title': 'ダウンターン延長'},
  {'value': 'ZoneUpEternal', 'title': '属性強化フィールド強化'},
  {'value': 'AdditionalHitOnKill', 'title': 'スキル使用回数回復(スキル仕様で敵撃破時)'},
  {'value': 'ReplaceNormalSkill', 'title': '通常攻撃変化'},
  {'value': 'HealDpRate', 'title': 'DP回復(最大DP比例)'},
  {'value': 'GiveDefenseDebuffUp', 'title': 'GiveDefenseDebuffUp'},
]
const master = useMasterStore()
master.init('skills', 'masterSkills', 'characters', 'styles')
const user = useUserStore()
const selectSkillType = ref<string[]>([])
const openPanel = ref([0])
const isOwned = ref(false)

const styles = computed(() => isOwned.value ? master.mStyles.filter(it => user.styles[it.id]?.lb !== undefined || (it.tier !== 'SS' && it.tier !== 'SSR')) : master.mStyles)

const skills = computed(() => [...master.mSkills, ...master.mMasterSkills.map(it => ({...it.skill, chara: it.chara, style: undefined}))])
const skillEffects = computed(() => skills.value.reduce<{[skillType: string]: {[chara: string]: {styles: Set<string>, isMasterSkill: boolean}}}>((pre, cur) => {
  cur.parts.forEach(part => {
    if (!pre[part.skill_type]) pre[part.skill_type] = {}
    if (!pre[part.skill_type][cur.chara]) pre[part.skill_type][cur.chara] = {styles: new Set(), isMasterSkill: false}
    if (cur?.style) {
      if (styles.value.some(s => s.name === cur.style)) {
        pre[part.skill_type][cur.chara].styles.add(cur.style)
      } else if (!pre[part.skill_type][cur.chara].styles.size && !pre[part.skill_type][cur.chara].isMasterSkill) {
        // @ts-expect-error: Type 'undefined' is not assignable to type
        pre[part.skill_type][cur.chara] = undefined
      }
    } else {
      pre[part.skill_type][cur.chara].isMasterSkill = true
    }
  })
  return pre
}, {}))

const skillTypeItems = computed(() => Object.keys(skillEffects.value).map(key => skillTypesJP.find(it => it.value === key) ?? {value: key, title: key}))

const showCharacters = computed(() => master.mCharacters.filter(it => {
  if (selectSkillType.value.length === 0) return true
  return selectSkillType.value.some(skillType => !!skillEffects.value[skillType][it.name])
}).map(it => ({
  title: utils.getCharacterName(it.name),
  image: it.image,
  masterSkill: selectSkillType.value.some(skillType => !!skillEffects.value[skillType][it.name]?.isMasterSkill) ? master.mMasterSkills.find(ms => it.name === ms.chara)?.skill : undefined,
  styles: selectSkillType.value.length ? selectSkillType.value.reduce<Set<Card>>((acc, skillType) => {
    for (const style of it.cards.filter(card => skillEffects.value[skillType][it.name]?.styles.has(card.name))) {
      acc.add(style)
    }
    return acc
  }, new Set()) : it.cards.filter(card => styles.value.some(style => style.name === card.name)),
})))
</script>

<template>
  <v-card>
    <v-card-text>
      <v-expansion-panels v-model="openPanel">
        <v-expansion-panel title="検索条件">
          <v-expansion-panel-text>
            <v-checkbox v-model="isOwned" label="所持スタイルのみ" color="info" />
            <v-select v-model="selectSkillType" label="スキル効果" :items="skillTypeItems" multiple clearable>
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #prepend>
                    <SeraphDBImage type="skill-type" :skill-type="item.value" :width="32" />
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-list :items="showCharacters" variant="tonal">
        <template #title="{item}">
          <div class="d-flex">
            <div>
              <SeraphDBImage type="hbr" :hbr="item.image" :width="48" />
            </div>
            <div class="align-content-center">{{item.title}}</div>
          </div>
        </template>
        <template #subtitle="{item}">
          <v-list-item v-if="item.masterSkill && selectSkillType.length" :title="item.masterSkill.name">
          </v-list-item>
          <v-list-item v-for="(style, i) in item.styles" :key="i" :title="style.name">
            <template #prepend>
              <SeraphDBImage type="hbr" :hbr="style.image" :width="32" />
            </template>
            <template #subtitle>
              <div v-if="selectSkillType.length" class="d-flex flex-column">
                <div v-for="(skill, i) in style.skills.filter(skill => selectSkillType.some(skillType => skill.e.some(e => e.includes(skillType))))" :key="i">
                  {{skill.n}}
                </div>
              </div>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
