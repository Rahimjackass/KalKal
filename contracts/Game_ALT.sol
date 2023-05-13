// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "./PriceFeed.sol";

contract Game is AutomationCompatibleInterface {
    Player public winner;
    string public winnerName;
    int public winnerRange;
    address public winnerAddress;

    PriceFeed internal priceFeed;

    uint public players;
    uint public ticketPrice;

    uint public counter;

    uint public period;
    uint public start;

    bool public paused = true;

    event playerAdded(string _name, uint _choice);

    struct Player {
        string name;
        address wallet;
        uint choice;
        int open;
        int close;
        int range;
    }

    struct Coin {
        int open;
        int close;
        int range;
    }

    mapping(uint => Player) public counterToPlayer;
    mapping(uint => Coin) public choiceToCoin;

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
    ) public view returns (string memory, uint, int, int, int) {
        string memory name = counterToPlayer[_counter].name;
        uint choice = counterToPlayer[_counter].choice;
        int open = counterToPlayer[_counter].open;
        int close = counterToPlayer[_counter].close;
        int range = counterToPlayer[_counter].range;
        return (name, choice, open, close, range);
    }

    function takePart(
        string calldata _name,
        uint _choice
    ) public returns (Player memory) {
        Player memory user = Player(_name, msg.sender, _choice, 0, 0, 0);

        counter += 1;
        counterToPlayer[counter] = user;

        emit playerAdded(_name, _choice);

        return user;
    }

    function startGame() public {
        uint option;
        int response;
        for (uint i = 1; i < counter + 1; i++) {
            option = counterToPlayer[i].choice;
            response = optionToOpenPrice(option);
            counterToPlayer[i].open = response;
        }
        start = block.timestamp;
        paused = false;
    }

    function optionToOpenPrice(uint _option) public returns (int) {
        int response;
        if (_option == 1) {
            if (choiceToCoin[1].open != 0) {
                response = choiceToCoin[1].open;
            } else {
                response = priceFeed.getBTCLatestPrice();
                choiceToCoin[1].open = response;
            }
        } else if (_option == 2) {
            if (choiceToCoin[2].open != 0) {
                response = choiceToCoin[2].open;
            } else {
                response = priceFeed.getETHLatestPrice();
                choiceToCoin[2].open = response;
            }
        } else if (_option == 3) {
            if (choiceToCoin[3].open != 0) {
                response = choiceToCoin[3].open;
            } else {
                response = priceFeed.getLINKLatestPrice();
                choiceToCoin[3].open = response;
            }
        } else if (_option == 4) {
            if (choiceToCoin[4].open != 0) {
                response = choiceToCoin[4].open;
            } else {
                response = priceFeed.getMATICLatestPrice();
                choiceToCoin[4].open = response;
            }
        } else if (_option == 5) {
            if (choiceToCoin[5].open != 0) {
                response = choiceToCoin[5].open;
            } else {
                response = priceFeed.getSANDLatestPrice();
                choiceToCoin[5].open = response;
            }
        } else if (_option == 6) {
            if (choiceToCoin[6].open != 0) {
                response = choiceToCoin[6].open;
            } else {
                response = priceFeed.getSOLLatestPrice();
                choiceToCoin[6].open = response;
            }
        }
        return response;
    }

    function optionToClosePrice(uint _option) public returns (int) {
        int response;
        if (_option == 1) {
            if (choiceToCoin[1].close != 0) {
                response = choiceToCoin[1].close;
            } else {
                response = priceFeed.getBTCLatestPrice();
                choiceToCoin[1].close = response;
            }
        } else if (_option == 2) {
            if (choiceToCoin[2].close != 0) {
                response = choiceToCoin[2].close;
            } else {
                response = priceFeed.getETHLatestPrice();
                choiceToCoin[2].close = response;
            }
        } else if (_option == 3) {
            if (choiceToCoin[3].close != 0) {
                response = choiceToCoin[3].close;
            } else {
                response = priceFeed.getLINKLatestPrice();
                choiceToCoin[3].close = response;
            }
        } else if (_option == 4) {
            if (choiceToCoin[4].close != 0) {
                response = choiceToCoin[4].close;
            } else {
                response = priceFeed.getMATICLatestPrice();
                choiceToCoin[4].close = response;
            }
        } else if (_option == 5) {
            if (choiceToCoin[5].close != 0) {
                response = choiceToCoin[5].close;
            } else {
                response = priceFeed.getSANDLatestPrice();
                choiceToCoin[5].close = response;
            }
        } else if (_option == 6) {
            if (choiceToCoin[6].close != 0) {
                response = choiceToCoin[6].close;
            } else {
                response = priceFeed.getSOLLatestPrice();
                choiceToCoin[6].close = response;
            }
        }
        return response;
    }

    function endGame() public {
        uint option;
        int response;
        for (uint i = 1; i < counter + 1; i++) {
            option = counterToPlayer[i].choice;
            response = optionToClosePrice(option);
            counterToPlayer[i].close = response;
        }
        paused = true;
        calculateRange();
    }

    function calculateRange() public {
        int first;
        int second;
        for (uint i = 1; i < counter + 1; i++) {
            first = counterToPlayer[i].open;
            second = counterToPlayer[i].close;
            counterToPlayer[i].range = (((second - first) * 1e18) / first);
        }
        pickWinner();
    }

    function pickWinner() public returns (Player memory) {
        int bestRange;
        int secondRange;
        Player memory potentialWinner = counterToPlayer[1];
        for (uint i = 1; i < counter; i++) {
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
