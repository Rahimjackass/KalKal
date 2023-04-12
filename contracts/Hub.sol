// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Game.sol";

contract Hub {
    uint public games;
    uint public totalGames;

    event gameCreated(
        uint _players,
        uint _ticketPrice,
        address _newGame,
        address _deployer
    );

    function createGame(
        uint _players,
        uint _ticketPrice
    ) public returns (address _newGame) {
        Game newGame = new Game(_ticketPrice, _players);
        emit gameCreated(_players, _ticketPrice, address(newGame), msg.sender);
        totalGames += 1;
        return address(newGame);
    }
}
