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
var SidenavComponent = (function () {
    function SidenavComponent() {
    }
    SidenavComponent.prototype.ngOnInit = function () {
        console.log("Porra");
        jQuery('.collapsible').collapsible();
    };
    return SidenavComponent;
}());
SidenavComponent = __decorate([
    core_1.Component({
        selector: "side-nav",
        template: "\n    <ul class=\"side-nav fixed collapsible\" data-collapsible=\"accordion\">\n        <li>\n          <div class=\"waves-effect waves-blue collapsible-header\">Pr\u00E9dio da El\u00E9trica</div>\n          <div class=\"collapsible-body\">\n            <div class=\"collection\">\n              <a class=\"room\" href=\"#!\">B2-04</a>\n              <a class=\"room\" href=\"#!\">B2-05</a>\n              <a class=\"room\" href=\"#!\">B2-08</a>\n              <a class=\"room\" href=\"#!\">C1-49</a>\n            </div>\n          </div>\n        </li>\n        <li>\n          <div class=\"waves-effect waves-blue collapsible-header\">Pr\u00E9dio da Bi\u00EAnio</div>\n          <div class=\"collapsible-body\">\n            <div class=\"collection\">\n              <a href=\"#!\">B1-04</a>\n              <a href=\"#!\">B1-05</a>\n              <a href=\"#!\">B1-01</a>\n              <a href=\"#!\">A1-04</a>\n            </div>\n          </div>\n        </li>\n        <li>\n          <div class=\"waves-effect waves-blue collapsible-header\">Pr\u00E9dio da Bi\u00EAnio</div>\n          <div class=\"collapsible-body\">\n            <div class=\"collection\">\n              <a href=\"#!\">S11</a>\n              <a href=\"#!\">S17</a>\n            </div>\n          </div>\n        </li>\n      </ul>\n    "
    }),
    __metadata("design:paramtypes", [])
], SidenavComponent);
exports.SidenavComponent = SidenavComponent;
//# sourceMappingURL=side-nav.component.js.map