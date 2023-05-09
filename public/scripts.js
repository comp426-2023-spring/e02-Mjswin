// This function shows and hides the shot selection in the interface based 
// on whether or not the #opponent checkbox is checked
function showHideShots() {
    let rps = document.getElementById("rps").checked;
    let rpsls = document.getElementById("rpsls").checked;
    let opponent = document.getElementById("opponent").checked;
    if (opponent) {
        document.getElementById("rps-shots").className = "active"
    }
    if (rpsls && opponent) {
        document.getElementById("rpsls-shots").className = "active"
    }
    if (!opponent) {
        document.getElementById("rps-shots").className = "inactive"
    }
    if (!(rpsls && opponent)) {
        document.getElementById("rpsls-shots").className = "inactive"
    }
}

async function playGame () {
    let game = $('input[type=radio][name=game]:checked').val();
    let shot = $('input[type=radio][name=shot]:checked').val();

    baseURL = window.location.href + 'app/';

    url = baseURL + game + '/play/' + shot;

    console.log(url);
    opponent_checked = document.getElementById("opponent").checked;
    // This constructs a URL for the opponent option ONLY. To incorporate
    // the other option, you can use a conditional to change the URL based
    // on what is selected. You could also write separate functions, or use
    // a conditional somewhere above in this function to construct the 
    // correct URL
    // Log the full URL	
    await fetch(url)
    .then(function(response) {
        return response.json();
    })
        .then(function(result) {
            console.log(result);
            let result_element = document.getElementById("result");
            if (opponent_checked) {
                result_element.innerHTML = `<p>You: ${result.player}</p>
                <p>Your opponent: ${result.opponent}</p>
                <p>Result: You ${result.result.toUpperCase()}</p>`;
            } else {
                result_element.innerHTML = result.player.toUpperCase();
            }
        });
}