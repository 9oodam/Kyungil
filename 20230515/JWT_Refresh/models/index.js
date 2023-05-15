const {userInit, userList, userSelect, userInsert, userPwUpdate, userRefresh, userDelete} = require("./usersModel");

// userInit();

// async function test() {
//     userDelete("456");
// }
// test();

module.exports = {userList, userSelect, userInsert, userPwUpdate, userRefresh, userDelete};