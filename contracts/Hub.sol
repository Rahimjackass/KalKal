// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Game.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

contract Hub is AutomationCompatibleInterface {
    uint public games;

    address public priceFeed;

    mapping(uint => address) public counterToAddress;

    constructor(address _priceFeed) {
        priceFeed = _priceFeed;
    }

    event gameCreated(
        uint _players,
        uint _ticketPrice,
        address _newGame,
        uint _period,
        address _deployer
    );

    function createGame(
        uint _players,
        uint _ticketPrice,
        uint _period
    ) public returns (Game _newGame) {
        Game newGame = new Game(priceFeed, _players, _ticketPrice, _period);
        emit gameCreated(
            _players,
            _ticketPrice,
            address(newGame),
            _period,
            msg.sender
        );

        games += 1;
        counterToAddress[games] = address(newGame);

        return newGame;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        bytes memory performData;

        upkeepNeeded = false;

        for (uint256 i = 1; i < games + 1; i++) {
            Game target = Game(counterToAddress[i]);
            bool response = target.executionRequired();
            if (response) {
                upkeepNeeded = true;
                performData = abi.encode(i);
                return (upkeepNeeded, performData);
            }
        }
        return (upkeepNeeded, performData);
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 index = abi.decode(performData, (uint256));
        Game target = Game(counterToAddress[index]);
        bool response = target.executionRequired();
        if (response) {
            target.endGame();
        }
    }
}
