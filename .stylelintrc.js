module.exports = {
  extends: require.resolve('@umijs/max/stylelint'),
  rules: {
    // 修复 tailwindcss 过不了 stylelint
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'layer',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
  },
};
