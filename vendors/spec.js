const {readdirSync, statSync} = require('fs');
const {join} = require('path');

const dirs = (p) => {
  return readdirSync(p)
      .filter((f) => statSync(join(p, f)).isDirectory());
};

const dirList = dirs(__dirname);

const specs = dirList.map( (dir) => {
  const r = join(__dirname, dir, '/spec');
  return require(r);
});

module.exports = specs;
