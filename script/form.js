$(function () {
    function after_form_submitted(data) {
        
        $('#btnContactUs').prop('disabled', false);
        
        if (data.result == 'success') {
            $('form#reused_form').show();
            $('#success_message').show().fadeOut(5000);
            $('#error_message').hide();
            $('#reused_form').trigger("reset");
        } else {
            $('#error_message').append('<ul></ul>');
            jQuery.each(data.errors, function (key, val) {
                $('#error_message ul').append('<li>' + key + ':' + val + '</li>');
            });
            $('#success_message').hide();
            $('#error_message').show().fadeOut(5000);
            //reverse the response on the button
            $('button[type="button"]', $form).each(function () {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if (label) {
                    $btn.prop('type', 'submit');
                    $btn.text(label);
                    $btn.prop('orig_label', '');
                }
            });

        } //else
    }
    $('#reused_form').submit(function (e) {
        e.preventDefault();

        //$(".selected-dial-code")
        $form = $(this);
        var phoneno = 'phoneno=' + $(".selected-dial-code").text() + '-' + $("#phoneno").val();
        var post_data = $form.serialize() + '&' + phoneno;
        //console.log(post_data);
        //show some response on the button
        // $('button[type="submit"]', $form).each(function() {
        // 	debugger;
        //     $btn = $(this);
        //     //$btn.prop('type','button' );
        //     $btn.prop('orig_label', $btn.text());
        //     $btn.text('Submit');
        // });
        
        $('#btnContactUs').prop('disabled', true);
        
        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: post_data,
            dataType: 'json'
        });

        $('#btnContactUs').prop('disabled', false);
        
        $('form#reused_form').show();
        $('#success_message').show().fadeOut(8000);
        $('#error_message').hide();
        $('#reused_form').trigger("reset");
    });
});
$('form#reused_form').show();
$('.close').click(function () {
    $('#reused_form').trigger("reset");
});
