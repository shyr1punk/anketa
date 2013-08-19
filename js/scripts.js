/*globals $, console*/

var validator;

function Validator() {
    'use strict';
    var i;
    this.answers = {};
    for (i = 1; i <= 4; i += 1) {
        this.hideInput('q' + i);
    }
    if (this.checkRadio('q5radio')) {
        $('#q5').removeClass('error').addClass('ok');
        $('#q5radiobuttons').removeClass('field_error');
        this.answers.q5 = 1;
    }
    this.writeAnswer();
    for (i = 6; i <= 15; i += 1) {
        this.hideTextarea('q' + i);
    }
    this.about = 0;
}

Validator.prototype.checkField = function (name) {
    'use strict';
    switch (name) {
    case 'q1':
        return this.checkBirthYear($('input[name="' + name + '"]').val());
    case 'q4':
        return this.checkGraduateYear($('input[name="' + name + '"]').val());
    case 'q2':
    case 'q3':
        return this.checkEmpty($('input[name="' + name + '"]').val());
    case 'q5':
    case 'q6':
    case 'q7':
    case 'q8':
    case 'q9':
    case 'q10':
    case 'q11':
    case 'q12':
    case 'q13':
    case 'q14':
    case 'q15':
        return this.checkEmpty($('textarea[name="' + name + '"]').val());
    }
};

Validator.prototype.hideInput = function (name) {
    'use strict';
    if (this.checkField(name)) {
        $('input[name="' + name + '"]').removeClass('field_error').hide();
        $('#value' + name).html($('input[name="' + name + '"]').val()).show();
        $('#' + name).removeClass('error').addClass('ok');
        this.answers[name] = 1;
    } else {
        if ($('input[name="' + name + '"]').val()) {
            $('#' + name).removeClass('ok').addClass('error');
        } else {
            $('#' + name).removeClass('ok error');
        }
        this.answers[name] = 0;
    }
    this.writeAnswer();
};

Validator.prototype.hideTextarea = function (name) {
    'use strict';
    if (this.checkField(name)) {
        $('textarea[name="' + name + '"]').removeClass('field_error').hide();
        $('#value' + name).html($('textarea[name="' + name + '"]').val().replace(/\n/g, "<br>")).show();
        if (name === 'q5') {
            return;
        }
        $('#' + name).removeClass('error').addClass('ok');
        this.answers[name] = 1;
    } else {
        if (name === 'q5') {
            return;
        }
        if ($('textarea[name="' + name + '"]').val()) {
            $('#' + name).removeClass('ok').addClass('error');
        } else {
            $('#' + name).removeClass('ok error');
        }
        this.answers[name] = 0;
    }
    this.writeAnswer();
};

Validator.prototype.checkEmpty = function (value) {
    'use strict';
    if (!value) {
        return false;
    }
    return true;
};

Validator.prototype.checkBirthYear = function (value) {
    'use strict';
    if (value > 0 && value < 2013) {
        return true;
    }
    return false;
};

Validator.prototype.checkGraduateYear = function (value) {
    'use strict';
    if (value > 0 && value < 2050) {
        return true;
    }
    return false;
};

Validator.prototype.checkRadio = function (name) {
    'use strict';
    if ($('input[name="' + name + '"]:checked').val()) {
        return true;
    }
    return false;
};

$(function () {
    'use strict';
    validator = new Validator();
    $('.value').click(function () {
        var id = this.id.substr(5);
        $(this).hide();
        $('input[name="' + id + '"], textarea[name="' + this.id.substr(5) + '"]').show().focus();
    });
    $('.question input[type="text"]').focusout(function () {
        validator.hideInput(this.name);
    });
    $('textarea').focusout(function () {
        validator.hideTextarea(this.name);
    });
    $('.required input').change(function () {
        $('input[name="' + this.name + '"]').removeClass('field_error');
        validator.checkAbout();
    });
    $('input:radio').change(function () {
        if (validator.checkRadio(this.name)) {
            $('#' + this.name.substr(0, 2)).removeClass('error').addClass('ok');
            $('#q5radiobuttons').removeClass('field_error');
            validator.answers[this.name.substr(0, 2)] = 1;
        }
        validator.writeAnswer();
    });
});

Validator.prototype.writeAnswer = function () {
    'use strict';
    var counter = 0,
        field;
    for (field in this.answers) {
        if (this.answers.hasOwnProperty(field)) {
            if (this.answers[field] === 1) {
                counter += 1;
            }
        }
    }
    $('#answer').html(counter + ' вопросов');
    if (counter === 15) {
        $('#answer').addClass('complite');
    } else {
        $('#answer').removeClass('complite');
    }
};

Validator.prototype.checkAbout = function () {
    'use strict';
    if ($('input[name="nameSurname"]').val() && $('input[name="phone"]').val() && $('input[name="e-mail"]').val()) {
        $('#about').addClass('ok');
        return true;
    }
    $('#about').removeClass('ok');
    return false;
};

Validator.prototype.check = function () {
    'use strict';
    var field, status = true;
    for (field in this.answers) {
        if (this.answers.hasOwnProperty(field)) {
            if (this.answers[field] === 0) {
                if (field === 'q5') {
                    $('#q5radiobuttons').addClass('field_error');
                } else {
                    $('input[name="' + field + '"], textarea[name="' + field + '"]').addClass('field_error');
                }
                if (status) {
                    $('html, body').animate({
                        scrollTop: $("#" + field).offset().top - 80
                    }, 1000);
                    status = false;
                }
            }
        }
    }
    if (!$('input[name="nameSurname"]').val()) {
        $('input[name="nameSurname"]').addClass('field_error');
    }
    if (!$('input[name="phone"]').val()) {
        $('input[name="phone"]').addClass('field_error');
    }
    if (!$('input[name="e-mail"]').val()) {
        $('input[name="e-mail"]').addClass('field_error');
    }
    return status;
};