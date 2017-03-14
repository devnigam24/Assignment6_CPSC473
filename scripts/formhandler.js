var achivers = [];
(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;


    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            if(data.size == "Coffee-zilla" && data.strength >= 66 || achivers.includes(data.emailAddress)){
                achivers.push(data.emailAddress);
                window.emailtoRetain = data.emailAddress;
                $('#myModal').modal('show');
            }else{
              console.log(data);
              fn(data);
              this.reset();
              this.elements[0].focus();
            }
        });
    };

    FormHandler.prototype.addRangeHndler = function(labelSelector) {
        console.log('Setting range handler for form');
        this.$formElement.on('change', function(event) {
            this.$labelElement = $(labelSelector);
            this.$labelElement.text(this.value);
            if (this.value >= 0 && this.value <= 33) {
                this.$labelElement.attr('class','greenLabel');
            } else if (this.value >= 34 && this.value <= 66) {
                this.$labelElement.attr('class','yellowLabel');
            } else {
                this.$labelElement.attr('class','redLabel');
            }
        });
    };


    FormHandler.prototype.addPowerUpOptions = function(checkBoxSelector) {
        console.log('Adding power up options in form');
        this.$formElement.on('click', function(event) {
          if(achivers.includes(emailtoRetain)){
            this.$powerUpOptions = $(checkBoxSelector);
            this.$powerUpOptions.removeClass('hide');
          }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
