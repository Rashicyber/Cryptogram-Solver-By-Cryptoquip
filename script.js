jQuery(document).ready(function($) {
    var timerInterval;
    var startTime;

    $("form").submit(function(event) {
        event.preventDefault();

        // Start the timer
        startTime = new Date().getTime(); // Get start time in milliseconds
        timerInterval = setInterval(updateTimer, 100);

        var puzzle = $("#puzzle").val();
        var clue = $("#clue").val();

        $.ajax({
            type: "POST",
            url: "https://solver.cryptoquip.net/",
            data: { puzzle: puzzle, clue: clue },
            success: function(result) {
                // Stop the timer and reset the button text
                clearInterval(timerInterval);
                $("#submit").text('Solve');

                var lines = result;
                var html = "";
                for (var i = lines.length - 4; i >= 0; i--) {
                    html += "<div>" + lines[i] + "</div>";
                }
                $("#result").html(html);
            }
        });
    });

    function updateTimer() {
        var currentTime = new Date().getTime();
        var elapsed = currentTime - startTime;
        var seconds = Math.floor(elapsed / 1000);
        var milliseconds = parseInt((elapsed % 1000) / 100); // Get the first digit of the milliseconds
        $("#submit").text(`${seconds}.${milliseconds}`);
    }
});
