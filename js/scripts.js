/*globals $, console*/

var validator;

function Validator() {
    'use strict';

    return true;
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
        $('input[name="' + name + '"]').hide();
        $('#value' + name).html($('input[name="' + name + '"]').val()).show();
        $('#' + name).removeClass('error').addClass('ok');
    } else {
        if ($('input[name="' + name + '"]').val()) {
            $('#' + name).removeClass('ok').addClass('error');
        } else {
            $('#' + name).removeClass('ok error');
        }
    }
};

Validator.prototype.hideTextarea = function (name) {
    'use strict';
    if (this.checkField(name)) {
        $('textarea[name="' + name + '"]').hide();
        $('#value' + name).html($('textarea[name="' + name + '"]').val().replace(/\n/g, "<br>")).show();
        if (name === 'q5') {
            return;
        }
        $('#' + name).removeClass('error').addClass('ok');
    } else {
        if (name === 'q5') {
            return;
        }
        if ($('textarea[name="' + name + '"]').val()) {
            $('#' + name).removeClass('ok').addClass('error');
        } else {
            $('#' + name).removeClass('ok error');
        }
    }
};

Validator.prototype.checkEmpty = function (value) {
    'use strict';
    console.log(value);
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
        if (id === 'q5') {
            $('#q5radiobuttons').show();
        }
    });
    $('input[type="text"]').focusout(function () {
        validator.hideInput(this.name);
    });
    $('textarea').focusout(function () {
        validator.hideTextarea(this.name);
    });
    $('input:radio').change(function () {
        if (validator.checkRadio(this.name)) {
            $('#' + this.name.substr(0, 2)).removeClass('error').addClass('ok');
        } else {
            $('#' + this.name.substr(0, 2)).removeClass('ok').addClass('error');
        }
    });
    console.log("Document ready");
});
