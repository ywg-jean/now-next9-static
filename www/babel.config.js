module.exports = function(api) {
  api.cache(true);

  const presets = ['next/babel', '@zeit/next-typescript/babel'];

  const plugins = [
    'inline-react-svg',
    ['styled-components', { ssr: true, displayName: true, preprocess: false }]
  ];

  return {
    presets,
    plugins
  };
};
