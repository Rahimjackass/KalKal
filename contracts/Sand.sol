// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Sand {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai
     * Aggregator: SAND/USD
     * Address: 0x9dd18534b8f456557d11B9DDB14dA89b2e52e308
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x9dd18534b8f456557d11B9DDB14dA89b2e52e308
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
