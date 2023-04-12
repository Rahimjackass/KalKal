// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Solana {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai
     * Aggregator: SOL/USD
     * Address: 0xEB0fb293f368cE65595BeD03af3D3f27B7f0BD36
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0xEB0fb293f368cE65595BeD03af3D3f27B7f0BD36
        );
    }

    /**
     * Returns the latest price.
     */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
}
