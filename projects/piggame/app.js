var activePlayer, scores, score, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        var dice1 = Math.floor((Math.random() * 6) + 1);
        var dice2 = Math.floor((Math.random() * 6) + 1);

        var dice1DOM = document.querySelector('.dice1');
        var dice2DOM = document.querySelector('.dice2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        if(dice1 === 1 || dice2 === 1) {
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice1 === 6 && dice2 === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if ((dice1 !== 1 && dice2 !== 1) || (dice1 !== 6 && dice2 !== 6)) {;
            score += dice1 + dice2
            document.querySelector('#current-' + activePlayer).textContent = score;
        } else {
            console.log("trzeci else");
            document.querySelector('#current-' + activePlayer).textContent = 0;
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    score = 0;

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += score;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('#current-' + activePlayer).textContent = 0;
    var input = document.querySelector('.final-score').value;
    var winPoints;

    if (input) {
        winPoints = input;
    } else {
        winPoints = 100;
    }

    if (scores[activePlayer] >= winPoints) {
        document.getElementById('name-' + activePlayer).innerText = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        gamePlaying = false;
    } else {
        nextPlayer();
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function showRules() {
    document.querySelector(".show-rules").addEventListener('click', function() {
        document.querySelector(".popup").style.visibility = 'visible';
    });
}

function hideRules() {
    document.querySelector(".close").addEventListener('click', function() {
        document.querySelector(".popup").style.visibility = 'hidden';
    });
}

function toggleRulesPopup() {
    showRules();
    hideRules();
}

function init() {
    //winPoints = prompt('wybierz przy ilu punktach zakonczysz gre: ');
    gamePlaying = true;
    activePlayer = 0;
    scores = [0,0];
    score = 0;
    compare = []
    
    document.getElementById('score-1').innerText = 0;
    document.getElementById('score-0').innerText = 0;
    
    document.getElementById('current-0').innerText = 0;
    document.getElementById('current-1').innerText = 0;
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.getElementById('name-0').innerText = 'Player 1';
    document.getElementById('name-1').innerText = 'Player 2';

    toggleRulesPopup();
}