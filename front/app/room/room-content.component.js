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
var RoomContentComponent = (function () {
    function RoomContentComponent() {
    }
    return RoomContentComponent;
}());
RoomContentComponent = __decorate([
    core_1.Component({
        selector: "room-content",
        template: "\n    <div class=\"main-space\">\n        <div class=\"main-container\">\n          <div class=\"row\">\n            <h1 class=\"title\"> Sala B2-04 </h1>\n            <h5 class=\"subtitle\"> Pr\u00E9dio da El\u00E9trica </h5>\n            <br/>\n\n            <div class=\"row\">\n              <room-next-activity></room-next-activity>\n              <room-problems></room-problems>\n            </div> <!-- end row of MANUTEN\u00C7\u00C3O and PROXIMAS ATIVIDADES -->\n            <div class=\"row\">\n              <room-features></room-features>\n            </div> <!-- FEATURES ROW -->\n          </div> <!-- end main row -->\n\n        </div>\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], RoomContentComponent);
exports.RoomContentComponent = RoomContentComponent;
//# sourceMappingURL=room-content.component.js.map