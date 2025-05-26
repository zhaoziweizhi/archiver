import { antfu } from '@antfu/eslint-config'

export default antfu({
  rules: {
    'curly': ['error', 'all'],
    'style/brace-style': ['error', '1tbs'],
    'antfu/consistent-list-newline': 'off',
    'no-console': 'off',
  },
})
