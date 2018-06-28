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

    $("#new").click(function() {
        location.reload();

    });

    $("#pause").click(function() {
        clearInterval(action);
        reading = false;

        $("#pause").hide();
        $("#resume").show();
    });

    $("#resume").click(function() {
        action = setInterval(read, frequency);
        reading = true;

        $("#resume").hide();
        $("#pause").show();
    });

    $("#fontsizeslider").on("slidestop", function(event,ui) {
        $("#fontsizeslider").slider("refresh");
        let slidervalue = parseInt($("#fontsizeslider").val());
        $("#result").css("fontSize", slidervalue);
        $("#fontsize").text(slidervalue);

    });

    $("#speedslider").on("slidestop", function(event,ui) {
        $("#speedslider").slider("refresh");
        let slidervalue = parseInt($("#speedslider").val());
        $("#speed").text(slidervalue);
        clearInterval(action);
        frequency = 60000 / slidervalue;

        if(reading) {
            action = setInterval(read, frequency);
        }
    });

    $("#progressslider").on("slidestop", function(event,ui) {
        $("#progressslider").slider("refresh");
        let slidervalue = parseInt($("#progressslider").val());
        clearInterval(action);
        counter = slidervalue;
        $("#result").html(words[counter]);
        $("#percentage").html(Math.floor(counter/(inputLength-1)*100));


        if(reading) {
            action = setInterval(read, frequency);
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
            $("#percentage").html(Math.floor(counter/(inputLength-1)*100));
        }
    };
})

