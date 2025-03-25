import { antfu } from '@antfu/eslint-config'

export default antfu({
  unocss: false,
}).overrideRules({
  // 控制语句强制使用大括号
  'curly': ['error', 'all'],
  'style/brace-style': ['error', '1tbs'],
  'antfu/consistent-list-newline': 'off',
})
