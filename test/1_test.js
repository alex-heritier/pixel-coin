const PixelCoin = artifacts.require("PixelCoin");

contract("PixelCoin", async function(accounts) {

  it("should make sure the response is not null", async function() {
    let instance = await PixelCoin.deployed();
    let response = await instance.info();
    console.log("PixelCoin.info() - ", response);
    assert.notEqual(response, null);
  });

  it("should make sure the max pixel count is 1024^2", async function() {
    let instance = await PixelCoin.deployed();
    let theNum = 1024*1024;
    let response = await instance.getMaxPixelCount().then((bn)=>bn.toNumber());
    console.log("PixelCoin.getMaxPixelCount() - ", response);
    assert.equal(response, theNum);
  });

  it("should make sure the pixel color returned is correct", async function() {
    let instance = await PixelCoin.deployed();

    let theColor = 0xb9cc59;
    let response1 = await instance.setPixel(100, theColor, {value: web3.utils.toWei('0.001', 'ether')});
    console.log("PixelCoin.setPixel(uint, uint32) - ", response1);

    let response2 = await instance.getPixel(100);
    console.log("PixelCoin.getPixel(uint) - ", response2);

    assert.equal(response2, theColor);
  });

  it("should make sure the pixel can be found in allPixels", async function() {
    let instance = await PixelCoin.deployed();

    let theColor = 0xb9cc59;
    let response = await instance.getRow(0);
    let thePixelInQuestion = response[100];
    console.log("PixelCoin.getRow(uint32)[100] - ", thePixelInQuestion);

    assert.equal(thePixelInQuestion, theColor);
  });

});
