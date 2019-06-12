var html;
var selectedYes = false;
window.onload = function() {
    html = document.getElementById('darg-drop-container').innerHTML;
};

var container = document.getElementById("darg-drop-container");
var content = container.innerHTML;
dragDrop();


$("#phone").intlTelInput({
    // allowDropdown: false,
    autoHideDialCode: false,
    separateDialCode: true,
    /*autoPlaceholder: "off",
    dropdownContainer: "body",
    excludeCountries: ["us"],
    formatOnDisplay: false,
    geoIpLookup: function(callback) {
      $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
      });
    },
    hiddenInput: "full_number",
    initialCountry: "auto",
    localizedCountries: { 'de': 'Deutschland' },
    nationalMode: false,
    onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    placeholderNumberType: "MOBILE",
    preferredCountries: ['cn', 'jp'], */
});


// Slide Change Functionality
var slideIndex = 1;
//showSlides(slideIndex);
displaySlide(slideIndex);

//array for complexity calculation
var selectedWorkFlow = [];
var selectedWorkFlowObj = {};

var complexityWorkFlowMap = {
    "send_receive_mail" : "M",
    "open_browser_login" : "L",
    "extract_content_from_page" : "M",
    "build_excel_CSV_file"	: "M",
    "advance_formating_excel" : "H",
    "log_event" : "L",
    "append_line" : "L",
    "copy_file" : "L",
    "upload_file" : "L",
    "connect_DB_maintain":"H",
    "open_url_browser" : "L",
    "access_local_file" : "M",
    "post_data_SAP" : "M",
    "download_file" : "L",
    "scrap_web_data": "H"
};

var complexity = {
    "Low" : "L",
    "Medium" : "M",
    "High" : "H"
}

var manDaysMap = {
    "L" : 0.5,
    "M" : 1,
    "H" : 1.5
};

var roboTypeWithCost = {
    "attended" : {
        "min" : "1200",
        "max" : "5000"
    },
    "unattended" : {
        "min" : "8000",
        "max" : "10000"
    },
    "robotmanager" : {
        "min" : "20000",
        "max" : "20000"
    }
};

var roboTypes = {
    "attended" : "Attended Robot",
    "unattended" : "Unattended Robot",
    "robotmanager" : "Robot Manager"
};

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function clickYes() {
    selectedYes = true;
    setToLocalstorage('selectedYes', selectedYes);
    $("#minMaxLabel").show();
    displaySlide(4);
}

function clickNo() {
    selectedYes = false;
    setToLocalstorage('selectedYes', selectedYes);
    $("#minMaxLabel").hide();
    displaySlide(5);
}

function displaySlide(n) {
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        if(i == (n-1)) {
            slides[i].style.display = "block";
        } else {
            slides[i].style.display = "none";
        }
    }
}

function backFromContact() {
    if(selectedYes) {
        displaySlide(4);
    } else {
        displaySlide(3);
    }
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    } else if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

$("#robotype, #robotno").change(selectChangeFunction);
function selectChangeFunction() {
    var x = $("#robotype").val();
    var y = $("#robotno").val();
    if (x !== '' && y !== '') {
        $('#robotButtonContinue').addClass('active').css('background', '#8ca407').css('cursor', 'pointer');
        $('#robotButtonNext').addClass('active').css('background', '#e17b3f').css('cursor', 'pointer');
        $('#robotButtonContinue, #robotButtonNext').css('pointer-events', 'auto');
    } else if (x === '' || y === '') {
        $('#robotButtonContinue').removeClass('active').css('background', '#cacbd0').css('cursor', 'no-drop');
        $('#robotButtonNext').removeClass('active').css('background', '#cacbd0').css('cursor', 'no-drop');
        $('#robotButtonContinue, #robotButtonNext').css('pointer-events', 'none');
    }
}

$(".info-tooltip i").click(function() {
    event.preventDefault();
    $(this).next().fadeToggle();
})
$(document).mousedown(function (e){
    if($(e.target).closest('.info-tooltip i, .info-content').length == 0){
        $(".info-content").stop(true,true).fadeOut();
    }
});

// $(document).click(function(event) {
//     console.log("click");
//   if($(".info-content").is(":visible")){
//     $(".info-content").next().fadeToggle();  
//   };
// });
// Drag Drop Functionality
function dragDrop() {
    $('.drag').draggable({
        revert: 'invalid',
        stop: function() {
            $(this).draggable('option', 'revert', 'invalid');
            $('.right-side').find('.select-content').show();
            $('.left-side').find('.select-content').hide();
        }
    });

    $('.drop').droppable({
        
        drop: function(event, ui) {
            var $this = $(this);
            $this.find('.select-content').show();

            //get drag id and push in array
            var selectedId = $(ui.draggable).attr("id");
            selectedWorkFlow.push(selectedId);
            setToLocalstorage('selectedWorkflow', selectedWorkFlow);

            $('.drag-event-sec').hide();
            $('#dragdropcontentReset').addClass('active').css('background','#888489').css('cursor', 'pointer');
            // Check number of elements already in
            if ($this.find('.drag').length >= 7) {
                // Cancel drag operation (make it always revert)
                ui.draggable.draggable('option', 'revert', true);
                return;
            } else if ($this.find('.drag').length >= 1) {
                // Add active class.
                $('#dragdropcontentContinue').addClass('active').css('cursor', 'pointer');
                $('#dragdropButtonNext').addClass('active').css('background', '#e17b3f').css('cursor', 'pointer');
                $('#dragdropcontentContinue, #dragdropButtonNext').css('pointer-events', 'auto').css('cursor', 'pointer');
            } else {
                // Remove active class
                $('#dragdropcontentContinue').removeClass('active').css('cursor', 'no-drop');
                $('#dragdropButtonNext').removeClass('active').css('background', '#cacbd0').css('cursor', 'no-drop');
                $('#dragdropcontentContinue, #dragdropButtonNext').css('pointer-events', 'none').css('cursor', 'no-drop');
            }

            // Put dragged item into container
            ui.draggable.appendTo($this).css({
                top: '0px',
                left: '0px'
            });

            $('.drop').each(function() {
                var $this = $(this);
            });
        }
    });

    $('.left-side').droppable({
        drop: function(event, ui) {
            var $this = $(this);

            //get drag id and push in array
            var selectedId = $(ui.draggable).attr("id");
            var index = selectedWorkFlow.indexOf(selectedId);
            if (index > -1) {
                selectedWorkFlow.splice(index, 1);
            }
            setToLocalstorage('selectedWorkflow', selectedWorkFlow);

            // Put dragged item into container
            ui.draggable.appendTo($this).css({
                top: '0px',
                left: '0px'
            });

            $('.drop').each(function() {
                var $this = $(this);
            });
            if ($('.drop').find('.drag').length < 2) {
                // Remove active class
                $('#dragdropcontentContinue').removeClass('active').css('cursor', 'no-drop');
                $('#dragdropButtonNext').removeClass('active').css('background', '#cacbd0').css('cursor', 'no-drop');
                $('#dragdropcontentContinue, #dragdropButtonNext').css('pointer-events', 'none').css('cursor', 'no-drop');
                if ($('.drop').find('.drag').length < 1) {
                    $('.drag-event-sec').show();
                    $('#dragdropcontentReset').removeClass('active').css('background', '#cacbd0').css('cursor', 'no-drop');
                }
            }
        }
    });
}

$('#robotButtonContinue, #robotButtonNext').click(function() {
    calculateAnnualCost();
    displaySlide(5);
})

$('#dragdropcontentContinue, #dragdropButtonNext').click(function() {
    calculateManDays();
    displaySlide(3);
})

$('#dragdropcontentReset').click(function() {
    reset();
});

function setToLocalstorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function getLocalstorage(name) {
    var retrieveObject = localStorage.getItem(name);
    return JSON.parse(retrieveObject);
}

function calculateManDays() {
    var data = getLocalstorage('selectedWorkflow');
    var manDaysEfforts = 0;
    for(let i = 0; i < data.length; i++) {
        var selectedValue = $('#select_' + data[i]).val();
        selectedWorkFlowObj[data[i]] = selectedValue;
        manDaysEfforts += manDaysMap[complexityWorkFlowMap[data[i]]];
    }
    setToLocalstorage('manDaysEfforts', manDaysEfforts);
    setToLocalstorage('selectedWorkFlowObj', selectedWorkFlowObj);
    setManDaysEfforts();
}

function calculateAnnualCost() {
    var type = $('#robotype').val();
    var noOfRobots = $('#robotno').val();
    var minCost = noOfRobots * roboTypeWithCost[type].min;
    var maxCost = noOfRobots * roboTypeWithCost[type].max;
    setToLocalstorage('minMaxAnnualCost', { 'min' : minCost, 'max' : maxCost });
    setToLocalstorage('typeAndNumberRobots', { 'type' : type, 'number' : noOfRobots });
    setMinMaxAnnualCost(minCost, maxCost);
}

function setMinMaxAnnualCost(minCost, maxCost) {
    $("#minCost").text(minCost);
    $("#maxCost").text(maxCost);
}

function setManDaysEfforts() {
    $("#man-days-efforts").text(getLocalstorage('manDaysEfforts'));
}

// Reset Functionality
function reset() {
    var container = document.getElementById("darg-drop-container");
    container.innerHTML = html;
    $('#dragdropcontentContinue').removeClass('active').css('cursor', 'no-drop');
    $('#dragdropButtonNext').removeClass('active').css('background', '#cacbd0').css('cursor', 'no-drop');
    $('#dragdropcontentReset').removeClass('active').css('background', '#cacbd0').css('cursor', 'no-drop');
    $('#dragdropcontentContinue, #dragdropButtonNext').css('pointer-events', 'none').css('cursor', 'no-drop');
    selectedWorkFlow.length = 0;
    selectedWorkFlowObj = {};
    setToLocalstorage('selectedWorkflow', selectedWorkFlow);
    setToLocalstorage('selectedWorkFlowObj', selectedWorkFlowObj);
    dragDrop();
}

$(function() {
    var commonrules = {
        name: "required",
        designation: "required",
        organization: "required",
        phone: {
            required: true,
           /*  minlength: 10,
            maxlength: 10 */
        },
        email: {
          required: true,
          email: true
        },
      };

    var msgs = {
        name: "Please enter your name",
        designation: "Please enter your designation",
        organization: "Please enter your organization",
        email: "Please enter a valid email address",
        phone: "Please enter valid phone",
      };
    
    $("form[name='contactusyes']").validate({
      // Specify validation rules
      rules: commonrules,
      messages: msgs,
      submitHandler: function(form) {
        var post_data = $(form).serialize();
        
        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: post_data,
            dataType: 'json'
        });

        displaySlide(6);
      }
    });
  });



