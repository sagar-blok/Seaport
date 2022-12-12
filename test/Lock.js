const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { fromRpcSig, ethUtil } = require("ethereumjs-util");
const ethSigUtil = require("eth-sig-util");

let example, domainData, typedData;
let admin, user1, user2, user3, user4;

async function getAddresses() {
  [admin, user1, user2, user3, user4] = await ethers.getSigners();
}

async function deploy() {
  try {
    const Example = await ethers.getContractFactory("EIP");
    example = await Example.deploy();
    await example.deployed();
    console.log("LNQ deployed to:", example.address);
    domainData = {
      name: "Ether Mail",
      version: "1",
      chainId: 1,
      verifyingContract: example.address,
    };
  } catch (err) {
    throw err;
  }
}

describe("Deploying Contracts", async () => {
  it("Contracts Deployed", async () => {
    await getAddresses();
    await deploy();
  }).timeout("150s");
});

describe("permit", async () => {
  it("verifies signature", async () => {
    typedData = {
      types: {
        OfferItem: [
          { name: "itemType", type: "uint8" },
          { name: "token", type: "address" },
          { name: "identifierOrCriteria", type: "uint256" },
          { name: "startAmount", type: "uint256" },
          { name: "endAmount", type: "uint256" },
        ],
        ConsiderationItem: [
          { name: "itemType", type: "uint8" },
          { name: "token", type: "address" },
          { name: "identifierOrCriteria", type: "uint256" },
          { name: "startAmount", type: "uint256" },
          { name: "endAmount", type: "uint256" },
          { name: "recipient", type: "address" },
        ],
        OrderComponents: [
          { name: "offerer", type: "address" },
          { name: "zone", type: "address" },
          { name: "offer", type: "OfferItem[]" },
          { name: "consideration", type: "ConsiderationItem[]" },
          { name: "orderType", type: "uint8" },
          { name: "startTime", type: "uint256" },
          { name: "endTime", type: "uint256" },
          { name: "zoneHash", type: "bytes32" },
          { name: "salt", type: "uint256" },
          { name: "conduitKey", type: "bytes32" },
          { name: "counter", type: "uint256" },
        ],
      },
      domain: domainData,
      primaryType: "OrderComponents",
      message: {
        offerer: "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
        offer: [
          {
            itemType: 3,
            token: "0x5038603086b699D0DB16298aAE3a94e0e9331C11",
            identifierOrCriteria: 100000000022,
            startAmount: 1,
            endAmount: 1,
          },
        ],
        consideration: [
          {
            itemType: 1,
            token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            identifierOrCriteria: 0,
            startAmount: 75000000000000,
            endAmount: 75000000000000,
            recipient: "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
          },
          {
            itemType: 1,
            token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            identifierOrCriteria: 0,
            startAmount: 3000000000000000,
            endAmount: 3000000000000000,
            recipient: "0x0000a26b00c1F0DF003000390027140000fAa719",
          },
        ],
        startTime: 1670837073,
        endTime: 1671096264,
        orderType: 1,
        zone: "0x0000000000000000000000000000000000000000",
        zoneHash:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        salt: BigInt(
          "24446860302761739304752683030156737591518664810215442929802999963711950954420"
        ),
        conduitKey:
          "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
        counter: 0,
      },
    };
    const signature = await admin._signTypedData(
      typedData.domain,
      typedData.types,
      typedData.message
    );

    console.log(signature);
    const { v, r, s } = fromRpcSig(signature);

    let m = {
      offerer: "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
      offer: [
        {
          itemType: 3,
          token: "0x5038603086b699D0DB16298aAE3a94e0e9331C11",
          identifierOrCriteria: 100000000022,
          startAmount: 1,
          endAmount: 1,
        },
      ],
      consideration: [
        {
          itemType: 1,
          token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
          identifierOrCriteria: 0,
          startAmount: 975000000000000,
          endAmount: 975000000000000,
          recipient: "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
        },
        {
          itemType: 1,
          token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
          identifierOrCriteria: 0,
          startAmount: 25000000000000,
          endAmount: 25000000000000,
          recipient: "0x0000a26b00c1F0DF003000390027140000fAa719",
        },
      ],
      startTime: Date.now(),
      endTime: Date.now() + 2678400,
      orderType: 1,
      zone: "0x0000000000000000000000000000000000000000",
      zoneHash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      salt: BigInt(
        "24446860302761739304752683030156737591518664810215442929815742308926497628605"
      ),
      conduitKey:
        "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      counter: 0,
    };

    await expect(await example.connect(user1).verify(m, v, r, s)).to.equal(
      true
    );
  }).timeout("150s");
});

describe("permit", async () => {
  it("verifies signature", async () => {
    typedData = {
      types: {
        OfferItem: [
          { name: "itemType", type: "uint8" },
          { name: "token", type: "address" },
          { name: "identifierOrCriteria", type: "uint256" },
          { name: "startAmount", type: "uint256" },
          { name: "endAmount", type: "uint256" },
        ],
        ConsiderationItem: [
          { name: "itemType", type: "uint8" },
          { name: "token", type: "address" },
          { name: "identifierOrCriteria", type: "uint256" },
          { name: "startAmount", type: "uint256" },
          { name: "endAmount", type: "uint256" },
          { name: "recipient", type: "address" },
        ],
        OrderComponents: [
          { name: "offerer", type: "address" },
          { name: "zone", type: "address" },
          { name: "offer", type: "OfferItem[]" },
          { name: "consideration", type: "ConsiderationItem[]" },
          { name: "orderType", type: "uint8" },
          { name: "startTime", type: "uint256" },
          { name: "endTime", type: "uint256" },
          { name: "zoneHash", type: "bytes32" },
          { name: "salt", type: "uint256" },
          { name: "conduitKey", type: "bytes32" },
          { name: "counter", type: "uint256" },
        ],
      },
      domain: domainData,
      primaryType: "OrderComponents",
      message: {
        offerer: "0x1CC60e790B55fE7155db377E0A57052d7433DB31",
        offer: [
          {
            itemType: 1,
            token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            identifierOrCriteria: 0,
            startAmount: 5000000000000000,
            endAmount: 5000000000000000,
          },
        ],
        consideration: [
          {
            itemType: 3,
            token: "0x5038603086b699D0DB16298aAE3a94e0e9331C11",
            identifierOrCriteria: 100000000022,
            startAmount: 1,
            endAmount: 1,
            recipient: "0x1CC60e790B55fE7155db377E0A57052d7433DB31",
          },
          {
            itemType: 1,
            token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            identifierOrCriteria: 0,
            startAmount: 125000000000000,
            endAmount: 125000000000000,
            recipient: "0x0000a26b00c1F0DF003000390027140000fAa719",
          },
        ],
        startTime: 1670849808,
        endTime: 1671109001,
        orderType: 1,
        zone: "0x0000000000000000000000000000000000000000",
        zoneHash:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        salt: BigInt(
          "24446860302761739304752683030156737591518664810215442929816912443351809404399"
        ),
        conduitKey:
          "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
        counter: 0,
      },
    };
    const signature = await admin._signTypedData(
      typedData.domain,
      typedData.types,
      typedData.message
    );

    console.log(signature);
    const { v, r, s } = fromRpcSig(signature);

    let m = {
      offerer: "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
      offer: [
        {
          itemType: 3,
          token: "0x5038603086b699D0DB16298aAE3a94e0e9331C11",
          identifierOrCriteria: 100000000022,
          startAmount: 1,
          endAmount: 1,
        },
      ],
      consideration: [
        {
          itemType: 1,
          token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
          identifierOrCriteria: 0,
          startAmount: 975000000000000,
          endAmount: 975000000000000,
          recipient: "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
        },
        {
          itemType: 1,
          token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
          identifierOrCriteria: 0,
          startAmount: 25000000000000,
          endAmount: 25000000000000,
          recipient: "0x0000a26b00c1F0DF003000390027140000fAa719",
        },
      ],
      startTime: Date.now(),
      endTime: Date.now() + 2678400,
      orderType: 1,
      zone: "0x0000000000000000000000000000000000000000",
      zoneHash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      salt: BigInt(
        "24446860302761739304752683030156737591518664810215442929815742308926497628605"
      ),
      conduitKey:
        "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      counter: 0,
    };

    await expect(await example.connect(user1).verify(m, v, r, s)).to.equal(
      true
    );
  }).timeout("150s");
});

function signHash() {
  return ethUtil.keccak256(
    Buffer.concat([
      Buffer.from("1901", "hex"),
      structHash("EIP712Domain", typedData.domain),
      structHash(typedData.primaryType, typedData.message),
    ])
  );
}
