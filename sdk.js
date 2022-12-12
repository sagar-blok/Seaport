const { Seaport } = require("opensea/seaport-js");
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://speedy-nodes-nyc.moralis.io/03befbc97dae6daa74bff4b4/polygon/mumbai"
);
const seaport = new Seaport(provider);

async function init() {
  const offerer = "0x1CC60e790B55fE7155db377E0A57052d7433DB31";
  const fulfiller = "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718";
  const { executeAllActions } = await seaport.createOrder(
    {
      offer: [
        {
          itemType: ItemType.ERC721,
          token: "0x5038603086b699D0DB16298aAE3a94e0e9331C11",
          identifier: "100000000022",
        },
      ],
      consideration: [
        {
          amount: ethers.utils.parseEther("10").toString(),
          recipient: offerer,
        },
      ],
    },
    offerer
  );

  const order = await executeAllActions();

  const { executeAllActions: executeAllFulfillActions } =
    await seaport.fulfillOrder({
      order,
      accountAddress: fulfiller,
    });

  const transaction = executeAllFulfillActions();
}

init();
