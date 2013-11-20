// Generated by CoffeeScript 1.6.3
(function() {
  var CustomDropdown,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CustomDropdown = (function() {
    CustomDropdown.prototype.elCustomDropdown = null;

    CustomDropdown.prototype.elCustomDropdownUl = null;

    function CustomDropdown() {
      this.customDropdownToggle = __bind(this.customDropdownToggle, this);
      this.escapeKeyHandler = __bind(this.escapeKeyHandler, this);
      this.elCustomDropdown = document.querySelector('.custom-dropdown');
      this.elCustomDropdownUl = this.elCustomDropdown.querySelector('ul');
      this.elCustomDropdown.addEventListener('click', this.customDropdownToggle);
      document.addEventListener('keydown', this.escapeKeyHandler);
    }

    CustomDropdown.prototype.escapeKeyHandler = function(event) {
      if (event.keyCode === 27) {
        return customDropdownToggle(event);
      }
    };

    CustomDropdown.prototype.customDropdownToggle = function(event) {
      var ddClasslist;
      ddClasslist = this.elCustomDropdown.classList;
      if (ddClasslist.contains('active')) {
        ddClasslist.remove('active');
        return this.elCustomDropdownUl.setAttribute('aria-hidden', true);
      } else {
        ddClasslist.add('active');
        return this.elCustomDropdownUl.setAttribute('aria-hidden', false);
      }
    };

    return CustomDropdown;

  })();

  window.CustomDropdown = CustomDropdown;

}).call(this);
