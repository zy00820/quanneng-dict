/*
 * 全能词典 - 在线词典 API 封装
 * 使用免费的 dictionaryapi.dev 接口
 */

import $fetch from '@system.fetch'

/**
 * 查询英文单词
 * @param {string} word 要查询的单词
 * @returns {Promise} 查询结果
 */
function lookupWord(word) {
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word)

  return new Promise((resolve, reject) => {
    $fetch
      .fetch({
        url: url,
        method: 'GET'
      })
      .then((response) => {
        const result = response.data
        if (result.code === 200) {
          try {
            const data = JSON.parse(result.data)
            resolve(parseResult(data))
          } catch (e) {
            reject({ message: '数据解析失败' })
          }
        } else if (result.code === 404) {
          reject({ message: '未找到该单词，请检查拼写' })
        } else {
          reject({ message: '查询失败，错误码：' + result.code })
        }
      })
      .catch((error) => {
        reject({ message: '网络请求失败，请检查网络连接' })
      })
  })
}

/**
 * 解析词典接口返回的数据，提取有用信息
 */
function parseResult(data) {
  if (!data || !data.length) {
    return null
  }

  const entry = data[0]
  const result = {
    word: entry.word,
    phonetic: entry.phonetic || '',
    phonetics: [],
    meanings: []
  }

  // 提取音标
  if (entry.phonetics && entry.phonetics.length) {
    entry.phonetics.forEach((p) => {
      if (p.text) {
        result.phonetics.push(p.text)
      }
    })
  }

  // 提取释义
  if (entry.meanings && entry.meanings.length) {
    entry.meanings.forEach((m) => {
      const meaning = {
        partOfSpeech: m.partOfSpeech,
        definitions: []
      }
      if (m.definitions && m.definitions.length) {
        m.definitions.forEach((d) => {
          meaning.definitions.push({
            definition: d.definition,
            example: d.example || ''
          })
        })
      }
      result.meanings.push(meaning)
    })
  }

  return result
}

export default {
  lookupWord
}
