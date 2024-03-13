$(document).ready(function () {
    var isUnfoldedCard1 = false;
    var isUnfoldedCard2 = false;
    var backgroundMusic = document.getElementById("backgroundMusic");

    backgroundMusic.play();
    
    $(".container").click(function () {
        if (isUnfoldedCard1 || isUnfoldedCard2) {
          
        } else {
            // No card is unfolded, unfold both cards
            unfoldCard1();
            unfoldCard2();
        }
    });

    function unfoldCard1() {
        $(".card1").stop().animate(
            {
                top: "-170px", // Adjust the top position for the card to move out entirely
                zIndex: 50,    // Set a higher z-index for the card
            },
            "slow",
            function () {
                // Animation complete, unfold the card
                $(".card1").animate(
                    {
                        top: "-80px",      // Center the card vertically
                        height: "350px",   // Set the unfolded height
                        zIndex: 50,
                    },
                    "slow",
                    function () {
                        isUnfoldedCard1 = true;
                        // Play background music when card1 is unfolded
                        backgroundMusic.play();
                    }
                );
            }
        );
    }

    function unfoldCard2() {
        $(".card2").stop().animate(
            {
                top: "-170px", // Adjust the top position for the card to move out entirely
                zIndex: 40,    // Set a higher z-index for the card
            },
            "slow",
            function () {
                // Animation complete, unfold the card
                $(".card2").animate(
                    {
                        top: "-80px",      // Center the card vertically
                       
                        zIndex: 40,
                    },
                    "slow",
                    function () {
                        isUnfoldedCard2 = true;
                        // Play background music when card2 is unfolded
                        
                    }
                );
            }
        );
    }

    function putBackCards() {
        // Raise the cards to the top before putting them back
       

        $(".card1, .card2").animate(
            {
              
                top: "-170px", // Adjust the top position for the raise animation
                         
            },
            "slow",
            function () {
                // Animation complete, set the z-index for card1

                $(".card1").css("height",160);
            $(".card1").css("z-index", 2);
            // Set the z-index for card2
            $(".card2").css("z-index", 1);
                // Animation complete, put the cards back inside the envelope
                $(".card1, .card2").animate(
                    {
                        top: 1,
                        width: 270,
                        height: 160,
                    },
                    "slow",
                    function () {
                        isUnfoldedCard1 = false;
                        isUnfoldedCard2 = false;
                        // Pause background music when cards are folded back
                        backgroundMusic.pause();

                         // After putting both cards back, set the z-index of card2 lower
                       
                 
                    }
                );
            }
        );
    }

    // Click events for unfolding and folding each card
    $(".card1").click(function () {
        bringCard2ToFront()
    });

    $(".card2").click(function () {
        bringCard2Toback();      
    });

    function bringCard2ToFront() {
        $(".card2 .text2").hide();
        // Move card2 to the left
        $(".card2").animate(
            {
                left: "-260px", // Adjust the left position for the shuffle effect
                zIndex: 50,
            },
            "slow",
            function () {
                // Animation complete, bring card2 back to its original position
                $(".card2").animate(
                    {
                        left: "15px", // Adjust the original left position
                        opacity: 1,   // Restore the opacity
                        zIndex: 50,
                    },
                    "slow",
                    function () {
                        // Adjust the z-index after the animation
                        $(".card2").css("z-index", 100);
                        $(".card1").css("z-index", 50);

                        unfoldCard2ToLeftAndDown();
                    }
                );
            }
        );
    }
    
function unfoldCard2Upward() {
    // Cache the elements for better performance
    var $card2 = $(".card2");
    var $text2 = $(".card2 .text2");

    // Hide text2 initially
    $text2.hide();

    // Move the existing content into the original-content container
    $(".card2 .text1, .card2 .text2").appendTo(".card2 .original-content");

    // Set transform-origin to bottom
    $card2.css("transform-origin", "bottom");

    // Unfold upward
    $card2.animate(
        {
            top: "-500px",    // Set top position to move upward
            height: "500px",  // Adjust the height for upward unfolding
            rotateY: "0deg",  // Set rotation to 0 degrees
            scaleX: 1,        // Set scale to 1
            opacity: 1,       // Set opacity to 1
            zIndex: 50,
        },
        {
            duration: "slow",
            step: function (now, fx) {
                // During the upward animation, adjust rotation, scale, and opacity
                if (fx.prop === "rotateY") {
                    $card2.css("transform", "rotateY(" + now + "deg)");
                } else if (fx.prop === "scaleX") {
                    $card2.css("transform", "scaleX(" + now + ")");
                }

                // Smoothly reveal text2 as the card unfolds
                var revealProgress = Math.abs(now) / 48; // Assuming 500px is the final height
                $text2.show().css({
                    opacity: revealProgress,
                    height: Math.abs(now),
                });
            },
            complete: function () {
                // Reset transform-origin after the upward animation
                $card2.css("transform-origin", "");

                // Remove the flap after unfolding is complete
                $card2.find(".flap").remove();

                // Adjust the z-index after the animation
                $card2.css("z-index", 100);
                $(".card1").css("z-index", 50);
            },
        }
    );
}


    function unfoldCard2ToLeftAndDown() {
        // Double the original width
        var newWidth = $(".card2").width() * 2;
    
        // Set transform-origin to left
        $(".card2").css("transform-origin", "left");
    
        // Add a container for the flap
        $(".card2").prepend("<div class='flap'></div>");
    
        // Rotate and scale for leftward unfolding effect (simulating a book page turn)
        $(".card2").animate(
            {
                left: "0",          // Set left position to 0 to open to the left
                width: newWidth + "px", // Double the width
                rotateY: "10deg",    // Set initial rotation to 10 degrees
                scaleX: 1,           // Set initial scale to 1
                zIndex: 50,
            },
            {
                duration: "slow",
                step: function (now, fx) {
                    // During the leftward animation, adjust rotation, scale, and opacity
                    if (fx.prop === "rotateY") {
                        $(this).css("transform", "rotateY(" + now + "deg)");
                    } else if (fx.prop === "scaleX") {
                        $(this).css("transform", "scaleX(" + now + ")");
                    } else if (fx.prop === "opacity") {
                        $(this).css("opacity", now);
                    }
                },
                complete: function () {
                    // Reset transform-origin after the leftward animation
                    $(".card2").css("transform-origin", "");
    
                    // Animation complete for leftward unfolding, initiate downward unfolding
                    unfoldCard2Downward();

                    // Center the card
                    centerCard2();
                },
            }
        );
    }
    function centerCard2() {        
        // Animate to the center
        $(".card2").animate(
            {           
                top: "-180px", 
                left: "-130px"
            },
            "slow"
        );
    }

    function unfoldCard2Downward() {
        // Cache the elements for better performance
        var $card2 = $(".card2");
        var $text2 = $(".card2 .text2");
    
        // Hide text2 initially
        $text2.hide();
    
        // Move the existing content into the original-content container
        $(".card2 .text1, .card2 .text2").appendTo(".card2 .original-content");
    
        // Set transform-origin to top
        $card2.css("transform-origin", "top");
    
        // Unfold downward
        $card2.animate(
            {
                top: "0",         // Set top position to 0 to open downward
                height: "500px",  // Adjust the height for downward unfolding
                rotateY: "0deg",  // Set rotation to 0 degrees
                scaleX: 1,        // Set scale to 1
                opacity: 1,       // Set opacity to 1
                zIndex: 50,
            },
            {
                duration: "slow",
                step: function (now, fx) {
                    // During the downward animation, adjust rotation, scale, and opacity
                    if (fx.prop === "rotateY") {
                        $card2.css("transform", "rotateY(" + now + "deg)");
                    } else if (fx.prop === "scaleX") {
                        $card2.css("transform", "scaleX(" + now + ")");
                    }
    
                    // Smoothly reveal text2 as the card unfolds
                    var revealProgress = now / 48; // Assuming 500px is the final height
                    $text2.show().css({
                        opacity: revealProgress,
                        height: now,
                    });
                },
                complete: function () {
                    // Reset transform-origin after the downward animation
                    $card2.css("transform-origin", "");
    
                    // Remove the flap after unfolding is complete
                    $card2.find(".flap").remove();
    
                    // Adjust the z-index after the animation
                    $card2.css("z-index", 100);
                    $(".card1").css("z-index", 50);
                },
            }
        );
    }
    function foldCard2Upward() {
        // Cache the elements for better performance
        var $card2 = $(".card2");
        var $text2 = $(".card2 .text2");
    
        // Hide text2 initially
        $text2.hide();
    
        // Move the existing content into the original-content container
        $(".card2 .text1, .card2 .text2").appendTo(".card2 .original-content");
    
        // Set transform-origin to bottom
        $card2.css("transform-origin", "bottom");
    
        // Unfold upward
        $card2.animate(
            {
               
                height: "160px",  // Adjust the height for upward unfolding
                rotateY: "500deg",  // Set rotation to 0 degrees
                scaleX: 1,        // Set scale to 1
                opacity: 1,       // Set opacity to 1
                zIndex: 50,
            },
            {
                duration: "slow",
                step: function (now, fx) {
                    // During the upward animation, adjust rotation, scale, and opacity
                    if (fx.prop === "rotateY") {
                        $card2.css("transform", "rotateY(" + now + "deg)");
                    } else if (fx.prop === "scaleX") {
                        $card2.css("transform", "scaleX(" + now + ")");
                    }
    
                    
                },
                complete: function () {
                    // Reset transform-origin after the upward animation
                    $card2.css("transform-origin", "");
    
                    // Remove the flap after unfolding is complete
                    $card2.find(".flap").remove();
                    height: "160px",
                    // Adjust the z-index after the animation
                    $card2.css("z-index", 100);
                    $(".card1").css("z-index", 50);
                     // Hide text2 initially

                     foldCard2ToLeft();
        $text2.hide();
                },
            }
        );
    }
    function foldCard2ToLeft() {
        // Double the original width
        var newWidth = 270;
    
        // Set transform-origin to left
        $(".card2").css("transform-origin", "right");
    
        // Add a container for the flap
        $(".card2").prepend("<div class='flap'></div>");
    
        // Rotate and scale for leftward unfolding effect
        $(".card2").animate(
            {
               
                width: newWidth + "px", // Double the width
                rotateY: "10deg",    // Set initial rotation to 10 degrees for leftward unfolding
                scaleX: 1,           // Set initial scale to 1
                zIndex: 100,
            },
            {
                duration: "slow",
                step: function (now, fx) {
                    // During the leftward animation, adjust rotation, scale, and opacity
                    if (fx.prop === "rotateY") {
                        $(this).css("transform", "rotateY(" + now + "deg)");
                    } else if (fx.prop === "scaleX") {
                        $(this).css("transform", "scaleX(" + now + ")");
                    } else if (fx.prop === "opacity") {
                        $(this).css("opacity", now);
                    }
                },
                complete: function () {
                    // Reset transform-origin after the leftward animation
                    $(".card2").css("transform-origin", "");
    
                    // Animation complete for leftward unfolding, initiate additional actions if needed
                    // (e.g., unfolding in another direction or centering the card)
                    // ...
    
                    // Remove the flap after unfolding is complete
                    $(".card2").find(".flap").remove();
    
                    // Adjust the z-index after the animation
                    $(".card2").css("z-index", 50);
                    $(".card1").css("z-index", 100);
                },
            }
        );
    }
    
    function bringCard2Toback() {
       
        foldCard2Upward();
        // Move card2 to the left
        $(".card2").animate(
            {
                top: "-80px", 
                left: "-260px", // Adjust the left position for the shuffle effect                           
                zIndex: 105,
                
            },
            "slow",
            function () {
               
                // Animation complete, bring card2 back to its original position
                $(".card2").animate(
                    {
                        left: "15px", // Adjust the original left position
                        opacity: 1,   // Restore the opacity
                        zIndex: 3,
                    },
                    "slow",
                    function () {
                        // Adjust the z-index after the animation
                        $(".card2").css("z-index", 50);
                        $(".card1").css("z-index", 100);
    
                        // After bringing card2 back, put both cards back inside the envelope
                        putBackCards();
                    }
                );
            }
        );
    }
    
});
