const { aliasWebpack, aliasJest } = require('react-app-alias');
const path = require('path');

const options = {};

const paths = (paths) => {
  return {
    ...paths,
    appIndexJs: path.resolve(__dirname, 'src/10-renderer/index.tsx'),
    appBuild: path.resolve(__dirname, 'build/10-renderer'),
  };
};

module.exports = aliasWebpack(options);
module.exports.paths = paths;
module.exports.jest = aliasJest(options);
