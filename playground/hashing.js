// const {SHA256} = require('crypto-js');
const bcrypt = require('bcryptjs');

var password = 'Xandra88!'

// bcrypt.genSalt(100, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$gwIlgSSYbzJdUpukCL3NFexCQgwgUkvH6OrB.ZZC9eQsdadzZZp.S'

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});
// var message = 'vedran';
// var hash2 = SHA256(message).toString();
// console.log(hash2);


// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

// if (resultHash === token.hash) {
//     console.log('data was not changed')
// } else {
//     console.log('data was changed')
// }