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
        this.buildingsRooms = {
            "Prédio da Elétrica": [
                { id: 1, name: "B2-04" },
                { id: 2, name: "B2-05" },
                { id: 3, name: "B2-08" },
                { id: 4, name: "C1-49" }
            ],
            "Prédio da Biênio": [
                { name: "B1-04" },
                { name: "B1-05" },
                { name: "B1-01" }
            ],
            "Prédio do Civil": [
                { name: "S11" },
                { name: "S17" }
            ]
        };
        this.buildings = ["Prédio da Administracão", "Prédio da Civil"]; //Object.keys(buildingRooms);
    }
    SidenavComponent.prototype.getBuildings = function () {
        var buildings = [];
        for (var k in this.buildingsRooms) {
            buildings.push(k);
        }
        return buildings;
    };
    SidenavComponent.prototype.ngOnInit = function () {
        jQuery('.collapsible').collapsible();
        //jQuery('.modal-trigger').leanModal();
    };
    return SidenavComponent;
}());
SidenavComponent = __decorate([
    core_1.Component({
        selector: "side-nav",
        template: "\n    <ul class=\"side-nav fixed collapsible\" data-collapsible=\"accordion\">\n        <li>\n            <a class=\"modal-trigger waves-effect waves-green collapsible-header\" href=\"#new-room-modal\">Nova Sala</a>\n        </li>\n        <li *ngFor=\"let building of getBuildings()\">\n          <div class=\"waves-effect waves-blue collapsible-header\">{{building}}</div>\n          <div class=\"collapsible-body\">\n            <div class=\"collection\">\n              <a *ngFor=\"let room of this.buildingsRooms[building]\" class=\"room\" routerLink=\"/room/{{room.id}}\" href=\"#\">{{room.name}}</a>\n            </div>\n          </div>\n        </li>\n      </ul>\n    "
    }),
    __metadata("design:paramtypes", [])
], SidenavComponent);
exports.SidenavComponent = SidenavComponent;
//# sourceMappingURL=side-nav.component.js.map