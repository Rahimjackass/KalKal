// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceFeed.sol";
import "./Hub.sol";

//0-btc
//1-eth
//2-link
//3-matic
//4-sand
//5-sol

contract Game {
    PriceFeed internal priceFeed;
    Hub public hub;

    address public adminAddress;
    string public adminName;

    // uint public players;

    uint public index;
    uint public ticketPrice;

    uint public counter;

    uint public period;
    uint public start;

    bool public paused = true;
    bool public started;

    uint public winners = 0;
    uint public winnerChoice;

    constructor(
        address _priceFeed,
        address _admin,
        string memory _name,
        // uint _players,
        uint _ticketPrice,
        uint _period
    ) {
        priceFeed = PriceFeed(_priceFeed);
        adminAddress = _admin;
        // players = _players;
        ticketPrice = _ticketPrice;
        period = _period;
        adminName = _name;
    }

    struct Player {
        string name;
        address wallet;
        uint choice;
        int open;
        int close;
        int range;
        bool winner;
    }

    struct Coin {
        uint symbol;
        int open;
        int close;
        int range;
    }

    mapping(uint => Player) public counterToPlayer;
    mapping(uint => Coin) public choiceToCoin;

    function getPlayersInformation(
        uint _counter
    ) public view returns (string memory, uint, int, int, int, bool) {
        string memory name = counterToPlayer[_counter].name;
        uint choice = counterToPlayer[_counter].choice;
        int open = counterToPlayer[_counter].open;
        int close = counterToPlayer[_counter].close;
        int range = counterToPlayer[_counter].range;
        bool winner = counterToPlayer[_counter].winner;
        return (name, choice, open, close, range, winner);
    }

    function takePart(
        string calldata _name,
        uint _choice
    ) public payable returns (Player memory) {
        require(msg.value >= ticketPrice, "Not enough funds provided");

        Player memory user = Player(_name, msg.sender, _choice, 0, 0, 0, false);

        counter += 1;
        counterToPlayer[counter] = user;

        return user;
    }

    function startGame() public {
        require(
            msg.sender == adminAddress,
            "msg.sender is not admin! only admin can start the game"
        );
        require(
            counter > 1,
            "There should be more than one registered players to start"
        );
        uint choice;
        for (uint i = 1; i < counter + 1; i++) {
            choice = counterToPlayer[i].choice;
            if (choiceToCoin[choice].open != 0) {
                counterToPlayer[i].open = choiceToCoin[choice].open;
            } else {
                choiceToCoin[choice].open = choiceToPrice(choice);
                counterToPlayer[i].open = choiceToCoin[choice].open;
            }
        }
        start = block.timestamp;
        paused = false;
        started = true;
    }

    function choiceToPrice(uint _option) public view returns (int) {
        int response;
        if (_option == 0) {
            response = priceFeed.getBTCLatestPrice();
        } else if (_option == 1) {
            response = priceFeed.getETHLatestPrice();
        } else if (_option == 2) {
            response = priceFeed.getLINKLatestPrice();
        } else if (_option == 3) {
            response = priceFeed.getMATICLatestPrice();
        } else if (_option == 4) {
            response = priceFeed.getSANDLatestPrice();
        } else if (_option == 5) {
            response = priceFeed.getSOLLatestPrice();
        }
        return response;
    }

    function endGame() public {
        uint choice;
        for (uint i = 1; i < counter + 1; i++) {
            choice = counterToPlayer[i].choice;
            if (choiceToCoin[choice].close != 0) {
                counterToPlayer[i].close = choiceToCoin[choice].close;
            } else {
                choiceToCoin[choice].close = choiceToPrice(choice);
                counterToPlayer[i].close = choiceToCoin[choice].close;
            }
        }
        calculateRange();
    }

    function calculateRange() public {
        uint choice;
        int first;
        int second;
        int helperRanger;
        for (uint i = 1; i < counter + 1; i++) {
            choice = counterToPlayer[i].choice;
            if (choiceToCoin[choice].range != 0) {
                counterToPlayer[i].range = choiceToCoin[choice].range;
            } else {
                first = choiceToCoin[choice].open;
                second = choiceToCoin[choice].close;
                helperRanger = (((second - first) * 1e18) / first);
                choiceToCoin[choice].range = helperRanger;
                counterToPlayer[i].range = choiceToCoin[choice].range;
            }
        }
        pickWinnerChoice();
    }

    // I am going to leave this function like this
    // But I know this is not the best efficient implementation
    function pickWinnerChoice() public {
        int firstRange;
        int secondRange;
        uint winner = 0;
        for (uint i = 1; i < 6; i++) {
            firstRange = choiceToCoin[winner].range;
            secondRange = choiceToCoin[i].range;
            if (secondRange > firstRange) {
                winner = i;
            }
        }
        winnerChoice = winner;
        countWinners();
    }

    function countWinners() public {
        for (uint i = 1; i < counter + 1; i++) {
            if (counterToPlayer[i].choice == winnerChoice) {
                counterToPlayer[i].winner = true;
                winners += 1;
            }
        }
        splitMoney();
    }

    function splitMoney() public {
        uint share = address(this).balance / winners;
        for (uint i = 1; i < counter + 1; i++) {
            if (counterToPlayer[i].winner == true) {
                payable(counterToPlayer[i].wallet).transfer(share);
            }
        }
        paused = true;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTimestamp() public view returns (uint) {
        return block.timestamp;
    }

    function executionRequired() public view returns (bool) {
        return (paused == false) && ((block.timestamp - start) > period);
    }
}
