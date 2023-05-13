// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Game.sol";

contract Hub {
    uint public games;
    uint public totalGames;

    address public priceFeed;

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
    ) public returns (address _newGame) {
        Game newGame = new Game(priceFeed, _players, _ticketPrice, _period);
        emit gameCreated(
            _players,
            _ticketPrice,
            address(newGame),
            _period,
            msg.sender
        );
        totalGames += 1;
        return address(newGame);
    }
}
