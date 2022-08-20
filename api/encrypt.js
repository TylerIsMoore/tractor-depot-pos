const bcrypt = require('bcryptjs');

const pwd = '2234';

const hash = bcrypt.hashSync(pwd, 10);

console.log(hash);
