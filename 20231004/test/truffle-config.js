module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none) ganache 포트
     network_id: "*",       // Any network (default: none) 전체를 다 열었지만 기본 아이디는 1337
    },
  },
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
}