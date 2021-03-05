// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract PixelCoin {
  uint32 constant size = 1024;
  uint32 constant maxPixelCount = size ** 2;

  mapping (uint32 => uint32) pixels;

  uint private writeFee = 0.001 ether;


  modifier withinBounds(uint32 _index) {
    require(_index >= 0 && _index < maxPixelCount);
    _;
  }

  modifier onlyOwner() {
    require(true);
    _;
  }

  // READ ONLY
  function info() public pure returns (string memory) {
    return ("PixelCoin by Alex Heritier");
  }

  function getMaxPixelCount() public pure returns (uint32) {
    return maxPixelCount;
  }

  function getPixel(uint32 _index) public view withinBounds(_index) returns (uint32) {
    return pixels[_index];
  }

  function getRow(uint32 _row) public view returns (uint32[] memory) {
    uint32[] memory rowPixels = new uint32[](size);
    for (uint32 i = 0; i < size; i++) {
      rowPixels[i] = pixels[_row * size + i];
    }
    return rowPixels;
  }

  function getAllPixels() public view returns (uint32[] memory) {
    uint32[] memory allPixels = new uint32[](maxPixelCount);
    for (uint32 i = 0; i < maxPixelCount; i++) {
      allPixels[i] = pixels[i];
    }
    return allPixels;
  }


  // MUTABLE
  function setPixel(uint32 _index, uint32 _color) withinBounds(_index) public payable {
    require(msg.value == writeFee);
    pixels[_index] = _color;
  }

  function setWriteFee(uint _newWriteFee) public onlyOwner {
    writeFee = _newWriteFee;
  }
}
