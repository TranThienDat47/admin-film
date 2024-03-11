const { override, useBabelRc } = require('customize-cra');

module.exports = override((config) => {
   useBabelRc()(config);

   return config;
});
