// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Bitcoin {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai
     * Aggregator: BTC/USD
     * Address: 0x007A22900a3B98143368Bd5906f8E17e9867581b
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x007A22900a3B98143368Bd5906f8E17e9867581b
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
