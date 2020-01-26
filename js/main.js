(function ($) {
  "use strict";

 


  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

 
  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
      }
    });
  });
  //Scroll to top
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
  
$(document).ready(function() {
  var participants;
  var paticipantJson="data/participants.json";
    
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

  $.getJSON(participantsJson, function(data) {
        participants = data.participants;
        console.log(participants);
        $.each(participants, function(i, participant) {
            if (/^ *$/.test(participant.imageurl) || participant.imageurl == "") {
                participant.imageurl =
                    "https://image.flaticon.com/icons/svg/1141/1141771.svg";
            } else {
                var url = participant.imageurl;
               

                try {
                    var http = new XMLHttpRequest();
                    http.open("HEAD", url, false);
                    http.send();

                    if (http.status == 404) {
                        participant.imageurl =
                            "https://image.flaticon.com/icons/svg/1141/1141771.svg";
                      //Icon made by Freepik from www.flaticon.com *credits*
                    }
                } catch (err) {}
            }
            var participantDiv =
                "<div class='col-lg-3 col-sm-6 text-center mb-4'>" +
                "<div class='card participant-card'>" +
                "<img class='card-img-top participant-img' src=" +
                participant.imageurl +
                " alt=''>" +
                "<div class='card-body'>" +
                "<h4 class='card-title'>" +
                participant.name +
                "</h4>" +
                "<p class='card-text'>" +
                participant.about +
                "</p>" +
                "</div>" +
                "<div class='social-media-links'>" +
                "<a href=" +
                participant.facebook +
                "><i class='fab fa-facebook-f'></i></a>" +
                "<a href=" +
                participant.github +
                "><i class='fab fa-github'></i></a>" +
                "<a href=" +
                participant.twitter +
                "><i class='fab fa-twitter'></i></a>" +
                "</div>" +
                "</div>" +
                "</div>";

            $("#participants").append(participantDiv);
        });
    });


});


})(jQuery);

