// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceFeed {
    AggregatorV3Interface internal BTCpriceFeed;
    AggregatorV3Interface internal ETHpriceFeed;
    AggregatorV3Interface internal LINKpriceFeed;
    AggregatorV3Interface internal MATICpriceFeed;
    AggregatorV3Interface internal SANDpriceFeed;
    AggregatorV3Interface internal SOLpriceFeed;

    constructor() {
        BTCpriceFeed = AggregatorV3Interface(
            0x007A22900a3B98143368Bd5906f8E17e9867581b
        );
        ETHpriceFeed = AggregatorV3Interface(
            0x0715A7794a1dc8e42615F059dD6e406A6594651A
        );
        LINKpriceFeed = AggregatorV3Interface(
            0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408
        );
        MATICpriceFeed = AggregatorV3Interface(
            0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
        );
        SANDpriceFeed = AggregatorV3Interface(
            0x9dd18534b8f456557d11B9DDB14dA89b2e52e308
        );
        SOLpriceFeed = AggregatorV3Interface(
            0xEB0fb293f368cE65595BeD03af3D3f27B7f0BD36
        );
    }

    function getBTCLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = BTCpriceFeed.latestRoundData();
        return price;
    }

    function getETHLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = ETHpriceFeed.latestRoundData();
        return price;
    }

    function getLINKLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = LINKpriceFeed.latestRoundData();
        return price;
    }

    function getMATICLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = MATICpriceFeed.latestRoundData();
        return price;
    }

    function getSANDLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = SANDpriceFeed.latestRoundData();
        return price;
    }

    function getSOLLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = SOLpriceFeed.latestRoundData();
        return price;
    }
}
