const bcrypt = require('bcryptjs');

const pwd = 't54255951';

const hash = bcrypt.hashSync(pwd, 10);

console.log(hash);
