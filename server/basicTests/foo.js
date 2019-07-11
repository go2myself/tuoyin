const foo = ({ list = 10, name = 'liming' } = {}) => {
  console.log(`list = ${list}, name = ${name}`);
};
// foo({list:100,name:'liming'});
foo({ list: 93 });
