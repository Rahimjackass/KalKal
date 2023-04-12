// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Link {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai
     * Aggregator: SAND/USD
     * Address: 0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408
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
