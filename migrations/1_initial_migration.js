const PixelCoin = artifacts.require("PixelCoin");

module.exports = function (deployer) {
  deployer.deploy(PixelCoin);
};
