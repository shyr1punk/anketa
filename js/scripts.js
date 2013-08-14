/*globals $, console*/

var validator;

function Validator() {
    'use strict';

    return true;
}

Validator.prototype.selectField = function (name) {
    'use strict';
    switch (name) {
    case 'q1':
        return this.checkBirthYear($('input[name="' + name + '"]').val());
    case 'q2':
    case 'q3':
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
        return this.checkClear($('input[name="' + name + '"]').val());
    }
};

Validator.prototype.hideField = function (name) {
    'use strict';
    if (this.selectField(name)) {
        $('input[name="' + name + '"]').hide();
        $('#value' + name).html($('input[name="' + name + '"]').val()).show();
    }
};

Validator.prototype.checkClear = function (value) {
    'use strict';
    console.log(value);
    if (value === '') {
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

$(function () {
    'use strict';
    validator = new Validator();
    $('.value').click(function () {
        $(this).hide();
        $('input[name="' + this.id.substr(5) + '"]').show().focus();
    });
    $('input[type="text"]').blur(function () {
        validator.hideField(this.name);
    });
    console.log("Document ready");
});
