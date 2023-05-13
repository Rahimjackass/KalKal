// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "./PriceFeed.sol";

//0-btc
//1-eth
//2-link
//3-matic
//4-sand
//5-sol

contract Game is AutomationCompatibleInterface {
    // Player public winner;
    // string public winnerName;
    // int public winnerRange;
    // address public winnerAddress;

    PriceFeed internal priceFeed;

    uint public players;
    uint public ticketPrice;

    uint public counter;

    uint public period;
    uint public start;

    uint public winners = 0;
    uint public winnerChoice;

    bool public paused = true;

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

    // event playerAdded(string _name, uint _choice);

    constructor(
        address _priceFeed,
        uint _players,
        uint _ticketPrice,
        uint _period
    ) {
        priceFeed = PriceFeed(_priceFeed);
        players = _players;
        ticketPrice = _ticketPrice;
        period = _period;
    }

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
    ) public returns (Player memory) {
        Player memory user = Player(_name, msg.sender, _choice, 0, 0, 0, false);

        counter += 1;
        counterToPlayer[counter] = user;

        return user;
    }

    function startGame() public {
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
        paused = true;
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
        for (uint i = 0; i < counter + 1; i++) {
            if (counterToPlayer[i].choice == winnerChoice) {
                counterToPlayer[i].winner = true;
                winners += 1;
            }
        }
        // splitMoney()
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        upkeepNeeded =
            ((block.timestamp - start) > period) &&
            (paused == false);
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - start) > period) {
            // helper +=1;
            endGame();
        }
        // We don't use the performData in this example. The performData is generated by the Automation Node's call to your checkUpkeep function
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTimestamp() public view returns (uint) {
        return block.timestamp;
    }
}
