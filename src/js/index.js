$(function(){

    let words;
    let inputLength;
    let reading = false;
    let action;
    let frequency = 200;

    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();


    $("#start").click(function() {
        words = $("#userInput").val().split(/\s+/);
        inputLength = words.length;

        if(inputLength > 1) {
            reading = true;
            $("#error").hide();
            $("#start").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();

            $("#progressslider").attr("max", inputLength - 1);

            counter = 0;
            $("#result").show();
            $("#result").html(words[counter]);

            action = setInterval(read, frequency);
        } else {
            $("#error").show();
        }
    });


    function read() {
        if(counter == inputLength-1) {
            clearInterval(action);
            reading = false;
            $("#pause").hide();
        } else {
            counter++;
            $("#result").html(words[counter]);
            $("#progressslider").val(counter).slider('refresh');
            $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
        }
    }
})

