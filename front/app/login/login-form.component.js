"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var LoginFormComponent = (function () {
    function LoginFormComponent() {
    }
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    core_1.Component({
        template: "\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col m6 offset-m3\">\n            <div class=\"card brand\">\n              <div class=\"card-content white-text\">\n                <span class=\"card-title\">Login</span>\n                <div class=\"row\">\n                  <div class=\"input-field col s12\">\n                    <input id=\"username\" type=\"text\" class=\"validate\">\n                    <label for=\"\" class=\"white-text\">Username</label>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12\">\n                    <input id=\"password\" type=\"password\" class=\"validate\">\n                    <label for=\"password\" class=\"white-text\">Password</label>\n                  </div>\n                </div>\n                <button id=\"loginSubmit\" class=\"btn waves-effect waves-light indigo lighten-1 submit-button\" type=\"submit\" name=\"action\">Submit\n                  <i class=\"material-icons right\">send</i>\n                </button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], LoginFormComponent);
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map