document.addEventListener("DOMContentLoaded", function (event) {

    var choice = [
        "stone",
        "paper",
        "scisors"
    ]

    var userChoice;
    var computerChoice;

    var userPoints = 0;
    var computerPoints = 0;

    $("#user-won").hide();
    $("#computer-won").hide();

    function computerClick() {
        computerChoice = choice[Math.floor(Math.random() * 3)];
        $("#computer-choice").attr("src", "img/" + computerChoice + "2.png");
    }

    function userClick() {

        $(".user-choice").click(function () {

            if ($( window ).width() <= 576) {
                $(".user-choice").removeClass('active');
                $(this).addClass('active');
            }

            userChoice = $(this).attr("value");  
            $("#user-choice").attr("src", "img/" + userChoice + ".png");  
            computerClick();
            compare(userChoice, computerChoice);

        });
    }

    function compare(userChoice, computerChoice) {

        if (userChoice === computerChoice) {
        } else if ((userChoice === choice[0] && computerChoice === choice[2]) || (userChoice === choice[1] && computerChoice === choice[0]) || (userChoice === choice[2] && computerChoice === choice[1])) {
            userPoints = userPoints + 1;
            $("#user-points").text(userPoints);
        } else {
            computerPoints = computerPoints + 1;
            $("#computer-points").text(computerPoints);
        }

        if (userPoints === 3) {
            $(".popup, #user-won").show();
        } else if (computerPoints === 3) {
            $(".popup, #computer-won").show();
        }
    }

    function reset () {
        $('.popup').hide();
        $('#user-won').hide();
        $('#computer-won').hide();
        computerPoints = 0;
        userPoints = 0;
        $("#computer-points").text(computerPoints);
        $("#user-points").text(userPoints);
        $("#computer-choice").attr("src", "img/stone2.png");
        $("#user-choice").attr("src", "img/stone.png");
    }

    function newGame () {
        $(".newGame").click(function () {
            reset();
        })
    }

    const input = document.querySelector('#userName');
    const button = document.querySelector('#startGame');

    function buttonPlay() {   
        button.addEventListener('click', function() {
            getUsername();
        });
    }

    function enterPlay() {
        input.addEventListener('keydown', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                event.preventDefault();
                getUsername();
            }
        });
    }

    function getUsername() {
        var username = input.value.toUpperCase();
        const reg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/g;

        if (!reg.test(username) || username.length === 0) {
            console.log("jestem tu");
            $(".login--alert").css("display", "block");
        } else {
            $("#userLogin").text(username);
            $(".popup, #popup-login").hide();
        }
    }

    function init() {
        buttonPlay();
        enterPlay(); 
        userClick();  
        newGame();
    }

    init();
    
});