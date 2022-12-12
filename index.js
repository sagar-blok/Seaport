const Web3 = require("web3");
const Buffer = require("Buffer");

ABI = [
  {
    inputs: [
      { internalType: "address", name: "conduitController", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "BadContractSignature", type: "error" },
  { inputs: [], name: "BadFraction", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "BadReturnValueFromERC20OnTransfer",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint8", name: "v", type: "uint8" }],
    name: "BadSignatureV",
    type: "error",
  },
  {
    inputs: [],
    name: "ConsiderationCriteriaResolverOutOfRange",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "orderIndex", type: "uint256" },
      { internalType: "uint256", name: "considerationIndex", type: "uint256" },
      { internalType: "uint256", name: "shortfallAmount", type: "uint256" },
    ],
    name: "ConsiderationNotMet",
    type: "error",
  },
  { inputs: [], name: "CriteriaNotEnabledForItem", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256[]", name: "identifiers", type: "uint256[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    name: "ERC1155BatchTransferGenericFailure",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "EtherTransferGenericFailure",
    type: "error",
  },
  { inputs: [], name: "InexactFraction", type: "error" },
  { inputs: [], name: "InsufficientEtherSupplied", type: "error" },
  { inputs: [], name: "Invalid1155BatchTransferEncoding", type: "error" },
  { inputs: [], name: "InvalidBasicOrderParameterEncoding", type: "error" },
  {
    inputs: [{ internalType: "address", name: "conduit", type: "address" }],
    name: "InvalidCallToConduit",
    type: "error",
  },
  { inputs: [], name: "InvalidCanceller", type: "error" },
  {
    inputs: [
      { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
      { internalType: "address", name: "conduit", type: "address" },
    ],
    name: "InvalidConduit",
    type: "error",
  },
  { inputs: [], name: "InvalidERC721TransferAmount", type: "error" },
  { inputs: [], name: "InvalidFulfillmentComponentData", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "InvalidMsgValue",
    type: "error",
  },
  { inputs: [], name: "InvalidNativeOfferItem", type: "error" },
  { inputs: [], name: "InvalidProof", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "orderHash", type: "bytes32" }],
    name: "InvalidRestrictedOrder",
    type: "error",
  },
  { inputs: [], name: "InvalidSignature", type: "error" },
  { inputs: [], name: "InvalidSigner", type: "error" },
  { inputs: [], name: "InvalidTime", type: "error" },
  {
    inputs: [],
    name: "MismatchedFulfillmentOfferAndConsiderationComponents",
    type: "error",
  },
  {
    inputs: [{ internalType: "enum Side", name: "side", type: "uint8" }],
    name: "MissingFulfillmentComponentOnAggregation",
    type: "error",
  },
  { inputs: [], name: "MissingItemAmount", type: "error" },
  { inputs: [], name: "MissingOriginalConsiderationItems", type: "error" },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "NoContract",
    type: "error",
  },
  { inputs: [], name: "NoReentrantCalls", type: "error" },
  { inputs: [], name: "NoSpecifiedOrdersAvailable", type: "error" },
  {
    inputs: [],
    name: "OfferAndConsiderationRequiredOnFulfillment",
    type: "error",
  },
  { inputs: [], name: "OfferCriteriaResolverOutOfRange", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "orderHash", type: "bytes32" }],
    name: "OrderAlreadyFilled",
    type: "error",
  },
  { inputs: [], name: "OrderCriteriaResolverOutOfRange", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "orderHash", type: "bytes32" }],
    name: "OrderIsCancelled",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "orderHash", type: "bytes32" }],
    name: "OrderPartiallyFilled",
    type: "error",
  },
  { inputs: [], name: "PartialFillsNotEnabledForOrder", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "identifier", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "TokenTransferGenericFailure",
    type: "error",
  },
  { inputs: [], name: "UnresolvedConsiderationCriteria", type: "error" },
  { inputs: [], name: "UnresolvedOfferCriteria", type: "error" },
  { inputs: [], name: "UnusedItemParameters", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCounter",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address",
      },
    ],
    name: "CounterIncremented",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "zone", type: "address" },
    ],
    name: "OrderCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "zone", type: "address" },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        components: [
          { internalType: "enum ItemType", name: "itemType", type: "uint8" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "identifier", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct SpentItem[]",
        name: "offer",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "enum ItemType", name: "itemType", type: "uint8" },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "identifier", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct ReceivedItem[]",
        name: "consideration",
        type: "tuple[]",
      },
    ],
    name: "OrderFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "zone", type: "address" },
    ],
    name: "OrderValidated",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "address", name: "zone", type: "address" },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256",
              },
              { internalType: "uint256", name: "startAmount", type: "uint256" },
              { internalType: "uint256", name: "endAmount", type: "uint256" },
            ],
            internalType: "struct OfferItem[]",
            name: "offer",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256",
              },
              { internalType: "uint256", name: "startAmount", type: "uint256" },
              { internalType: "uint256", name: "endAmount", type: "uint256" },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct ConsiderationItem[]",
            name: "consideration",
            type: "tuple[]",
          },
          { internalType: "enum OrderType", name: "orderType", type: "uint8" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
          { internalType: "uint256", name: "counter", type: "uint256" },
        ],
        internalType: "struct OrderComponents[]",
        name: "orders",
        type: "tuple[]",
      },
    ],
    name: "cancel",
    outputs: [{ internalType: "bool", name: "cancelled", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct AdvancedOrder",
        name: "advancedOrder",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "enum Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          { internalType: "uint256", name: "identifier", type: "uint256" },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]",
          },
        ],
        internalType: "struct CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]",
      },
      { internalType: "bytes32", name: "fulfillerConduitKey", type: "bytes32" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "fulfillAdvancedOrder",
    outputs: [{ internalType: "bool", name: "fulfilled", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct AdvancedOrder[]",
        name: "advancedOrders",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "enum Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          { internalType: "uint256", name: "identifier", type: "uint256" },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]",
          },
        ],
        internalType: "struct CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "uint256", name: "itemIndex", type: "uint256" },
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "offerFulfillments",
        type: "tuple[][]",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "uint256", name: "itemIndex", type: "uint256" },
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "considerationFulfillments",
        type: "tuple[][]",
      },
      { internalType: "bytes32", name: "fulfillerConduitKey", type: "bytes32" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "maximumFulfilled", type: "uint256" },
    ],
    name: "fulfillAvailableAdvancedOrders",
    outputs: [
      { internalType: "bool[]", name: "availableOrders", type: "bool[]" },
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "identifier", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple",
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "uint256", name: "itemIndex", type: "uint256" },
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "offerFulfillments",
        type: "tuple[][]",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "uint256", name: "itemIndex", type: "uint256" },
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "considerationFulfillments",
        type: "tuple[][]",
      },
      { internalType: "bytes32", name: "fulfillerConduitKey", type: "bytes32" },
      { internalType: "uint256", name: "maximumFulfilled", type: "uint256" },
    ],
    name: "fulfillAvailableOrders",
    outputs: [
      { internalType: "bool[]", name: "availableOrders", type: "bool[]" },
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "identifier", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple",
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "considerationToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "considerationIdentifier",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "considerationAmount",
            type: "uint256",
          },
          { internalType: "address payable", name: "offerer", type: "address" },
          { internalType: "address", name: "zone", type: "address" },
          { internalType: "address", name: "offerToken", type: "address" },
          { internalType: "uint256", name: "offerIdentifier", type: "uint256" },
          { internalType: "uint256", name: "offerAmount", type: "uint256" },
          {
            internalType: "enum BasicOrderType",
            name: "basicOrderType",
            type: "uint8",
          },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          {
            internalType: "bytes32",
            name: "offererConduitKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "fulfillerConduitKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "totalOriginalAdditionalRecipients",
            type: "uint256",
          },
          {
            components: [
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct AdditionalRecipient[]",
            name: "additionalRecipients",
            type: "tuple[]",
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct BasicOrderParameters",
        name: "parameters",
        type: "tuple",
      },
    ],
    name: "fulfillBasicOrder",
    outputs: [{ internalType: "bool", name: "fulfilled", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct Order",
        name: "order",
        type: "tuple",
      },
      { internalType: "bytes32", name: "fulfillerConduitKey", type: "bytes32" },
    ],
    name: "fulfillOrder",
    outputs: [{ internalType: "bool", name: "fulfilled", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "offerer", type: "address" }],
    name: "getCounter",
    outputs: [{ internalType: "uint256", name: "counter", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "address", name: "zone", type: "address" },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256",
              },
              { internalType: "uint256", name: "startAmount", type: "uint256" },
              { internalType: "uint256", name: "endAmount", type: "uint256" },
            ],
            internalType: "struct OfferItem[]",
            name: "offer",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256",
              },
              { internalType: "uint256", name: "startAmount", type: "uint256" },
              { internalType: "uint256", name: "endAmount", type: "uint256" },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct ConsiderationItem[]",
            name: "consideration",
            type: "tuple[]",
          },
          { internalType: "enum OrderType", name: "orderType", type: "uint8" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
          { internalType: "uint256", name: "counter", type: "uint256" },
        ],
        internalType: "struct OrderComponents",
        name: "order",
        type: "tuple",
      },
    ],
    name: "getOrderHash",
    outputs: [{ internalType: "bytes32", name: "orderHash", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "orderHash", type: "bytes32" }],
    name: "getOrderStatus",
    outputs: [
      { internalType: "bool", name: "isValidated", type: "bool" },
      { internalType: "bool", name: "isCancelled", type: "bool" },
      { internalType: "uint256", name: "totalFilled", type: "uint256" },
      { internalType: "uint256", name: "totalSize", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "incrementCounter",
    outputs: [{ internalType: "uint256", name: "newCounter", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "information",
    outputs: [
      { internalType: "string", name: "version", type: "string" },
      { internalType: "bytes32", name: "domainSeparator", type: "bytes32" },
      { internalType: "address", name: "conduitController", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct AdvancedOrder[]",
        name: "advancedOrders",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "enum Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          { internalType: "uint256", name: "identifier", type: "uint256" },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]",
          },
        ],
        internalType: "struct CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "orderIndex", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "offerComponents",
            type: "tuple[]",
          },
          {
            components: [
              { internalType: "uint256", name: "orderIndex", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "considerationComponents",
            type: "tuple[]",
          },
        ],
        internalType: "struct Fulfillment[]",
        name: "fulfillments",
        type: "tuple[]",
      },
    ],
    name: "matchAdvancedOrders",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "identifier", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple",
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "orderIndex", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "offerComponents",
            type: "tuple[]",
          },
          {
            components: [
              { internalType: "uint256", name: "orderIndex", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "considerationComponents",
            type: "tuple[]",
          },
        ],
        internalType: "struct Fulfillment[]",
        name: "fulfillments",
        type: "tuple[]",
      },
    ],
    name: "matchOrders",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "identifier", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple",
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "contractName", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct Order[]",
        name: "orders",
        type: "tuple[]",
      },
    ],
    name: "validate",
    outputs: [{ internalType: "bool", name: "validated", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://polygon-mumbai.g.alchemy.com/v2/rD_JwCKe0fvtJx0IzH4mWihTGLwbm10K`
  )
);

const Account = web3.eth.accounts.privateKeyToAccount(
  "4a4fc42185344eed9b3650af6effc497728878acdff5fd77ec9b9f9307fca055"
);

web3.eth.accounts.wallet.add(Account);

let Contract = "0x00000000006c3852cbEf3e08E8dF289169EdE581";
contract = new web3.eth.Contract(ABI, Contract);

const init = async () => {
  // let tx_hash = await contract.methods
  //   .cancel([
  //     [
  //       "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
  //       "0x0000000000000000000000000000000000000000",
  //       [[3, "0x5038603086b699D0DB16298aAE3a94e0e9331C11", 1, 1, 1]],
  //       [
  //         [
  //           1,
  //           "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
  //           0,
  //           975000000000000,
  //           975000000000000,
  //           "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
  //         ],
  //       ],
  //       1,
  //       1670416360,
  //       1673094760,
  //       "0x0000000000000000000000000000000000000000000000000000000000000000",
  //       2444686030,
  //       "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  //       0,
  //     ],
  //   ])
  //   .send({ from: Account.address, gas: web3.utils.toHex(250000) });

  // let tx_hash = await contract.methods
  //   .getOrderHash([
  //     "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
  //     "0x0000000000000000000000000000000000000000",
  //     [[3, "0x5038603086b699D0DB16298aAE3a94e0e9331C11", 100000000022, 1, 1]],
  //     [
  //       [
  //         1,
  //         "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
  //         0,
  //         975000000000000,
  //         975000000000000,
  //         "0xb11f09290AaeD4aEe4e98aecBF986Bd2262D2718",
  //       ],
  //     ],
  //     1,
  //     1670416360,
  //     1673094760,
  //     "0x0000000000000000000000000000000000000000000000000000000000000000",
  //     2444686030,
  //     "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  //     0,
  //   ])
  //   .call();

  //   struct BasicOrderParameters {
  //     // calldata offset
  //     address considerationToken; // 0x24
  //     uint256 considerationIdentifier; // 0x44
  //     uint256 considerationAmount; // 0x64
  //     address payable offerer; // 0x84
  //     address zone; // 0xa4
  //     address offerToken; // 0xc4
  //     uint256 offerIdentifier; // 0xe4
  //     uint256 offerAmount; // 0x104
  //     BasicOrderType basicOrderType; // 0x124
  //     uint256 startTime; // 0x144
  //     uint256 endTime; // 0x164
  //     bytes32 zoneHash; // 0x184
  //     uint256 salt; // 0x1a4
  //     bytes32 offererConduitKey; // 0x1c4
  //     bytes32 fulfillerConduitKey; // 0x1e4
  //     uint256 totalOriginalAdditionalRecipients; // 0x204
  //     AdditionalRecipient[] additionalRecipients; // 0x224
  //     bytes signature; // 0x244
  //     // Total length, excluding dynamic array data: 0x264 (580)
  // }

  let tx_hash = await contract.methods
    .fulfillBasicOrder([
      "0x5038603086b699D0DB16298aAE3a94e0e9331C11",
      100000000022,
      1,
      "0x1CC60e790B55fE7155db377E0A57052d7433DB31",
      "0x0000000000000000000000000000000000000000",
      "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
      0,
      5000000000000000,
      21,
      1670849808,
      1671109001,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      BigInt(
        "24446860302761739304752683030156737591518664810215442929816912443351809404399"
      ),
      "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      1,
      [[125000000000000, "0x0000a26b00c1F0DF003000390027140000fAa719"]],
      "0xb12a85f70caba16b441cead8c9d40c3899c7ecf7520810c06752f0bfb92761772d280c4ddb700424a1e1150c4069c5a787df8db6f62c92696cece54020f646a21c",
    ])
    .send({ from: Account.address, gas: web3.utils.toHex(250000) });
  console.log(tx_hash);
};
init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
