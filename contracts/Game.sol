// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Bitcoin.sol";
import "./Ethereum.sol";
import "./Solana.sol";

contract Game {
    uint public players;
    uint public counter = 1;
    uint public ticketPrice;

    Player public winner;
    string public winnerName;
    address public winnerAddress;
    int public winnerRange;

    address public _Btc = 0x007A22900a3B98143368Bd5906f8E17e9867581b;
    address public _Eth = 0x0715A7794a1dc8e42615F059dD6e406A6594651A;
    address public _Sol = 0xEB0fb293f368cE65595BeD03af3D3f27B7f0BD36;

    Bitcoin btcContract;
    Ethereum ethContract;
    Solana solContract;

    struct Player {
        string name;
        address wallet;
        uint choice;
        int startPrice;
        int closePrice;
        int range;
    }

    mapping(uint => Player) public counterToPlayer;

    constructor(uint _players, uint _ticketPrice) {
        players = _players;
        ticketPrice = _ticketPrice * 1 ether;
        // btcContract = Bitcoin(_Btc);
        // ethContract = Ethereum(_Eth);
        // solContract = Solana(_Sol);
    }

    function takePart(
        string calldata _name,
        uint _option,
        int _start,
        int _close
    ) public payable returns (Player memory) {
        // Making sure no more than specified players are participating
        require(
            counter < players + 1,
            "You are not on the guest list! ( counter more than specified players )"
        );
        // Making sure every player buy ticket before entering the game
        require(
            msg.value == ticketPrice,
            "You are not allowed to enter the game unless you pay for the ticket!"
        );

        Player memory user = Player(
            _name,
            msg.sender,
            _option,
            _start,
            _close,
            0
        );

        counterToPlayer[counter] = user;

        counter = counter + 1;
        return user;
    }

    // function start() public {
    //     for (uint i = 1; i < players + 1; i++) {
    //         int response;
    //         uint choice = counterToPlayer[i].choice;
    //         if (choice == 1) {
    //             response = getBTCPrice();
    //         } else if (choice == 2) {
    //             response = getETHPrice();
    //         } else if (choice == 3) {
    //             response = getSOLPrice();
    //         }

    //         counterToPlayer[i].startPrice = response;
    //     }
    // }

    // function close() public {
    //     for (uint i = 1; i < players + 1; i++) {
    //         int response;
    //         uint choice = counterToPlayer[i].choice;
    //         if (choice == 1) {
    //             response = getBTCPrice();
    //         } else if (choice == 2) {
    //             response = getETHPrice();
    //         } else if (choice == 3) {
    //             response = getSOLPrice();
    //         }
    //         counterToPlayer[i].closePrice = response;
    //     }
    //     pickWinner();
    // }

    function calculateRange() public {
        int firstPrice;
        int secondPrice;
        for (uint i = 1; i < players + 1; i++) {
            firstPrice = counterToPlayer[i].startPrice;
            secondPrice = counterToPlayer[i].closePrice;
            counterToPlayer[i].range = (((secondPrice - firstPrice) * 1e18) /
                firstPrice);
        }
        // pickWinner();
    }

    function pickWinner() public returns (Player memory) {
        int bestRange;
        int secondRange;
        Player memory potentialWinner = counterToPlayer[1];
        for (uint i = 1; i < players; i++) {
            bestRange = potentialWinner.range;
            secondRange = counterToPlayer[i + 1].range;
            if (secondRange > bestRange) {
                potentialWinner = counterToPlayer[i + 1];
            }
        }
        winner = potentialWinner;
        winnerName = potentialWinner.name;
        winnerRange = potentialWinner.range;
        winnerAddress = potentialWinner.wallet;

        return winner;
    }

    // function getBTCPrice() public view returns (int) {
    //     return btcContract.getLatestPrice();
    // }

    // function getETHPrice() public view returns (int) {
    //     return ethContract.getLatestPrice();
    // }

    // function getSOLPrice() public view returns (int) {
    //     return solContract.getLatestPrice();
    // }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
