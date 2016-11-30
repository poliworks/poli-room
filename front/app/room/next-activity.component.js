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
var NextActivityComponent = (function () {
    function NextActivityComponent() {
        this.events = [
            {
                "name": "Evento 1",
                "description": "Um evento qualquer",
                "recurrence": "weekly",
                "startTime": "2016-11-30T13:36:12.000-0200",
                "endTime": "2016-11-30T14:36:15.721-0200",
                "scheduledBy": 1,
                "roomId": 1,
                "id": 3
            },
            {
                "name": "Evento 1",
                "description": "Um evento qualquer",
                "recurrence": "weekly",
                "startTime": "2016-11-30T13:36:12.000-0200",
                "endTime": "2016-11-30T14:36:15.721-0200",
                "scheduledBy": 1,
                "roomId": 3,
                "id": 2
            }
        ];
    }
    NextActivityComponent.prototype.getFormattedTime = function (utc) {
        return moment(utc).format("hh:mm");
    };
    NextActivityComponent.prototype.getFormattedDate = function (utc) {
        return moment(utc).format("DD/MM");
    };
    return NextActivityComponent;
}());
NextActivityComponent = __decorate([
    core_1.Component({
        selector: "room-next-activity",
        template: "\n    <!-- PROXIMAS ATIVIDADES -->\n    <div class=\"col s12s m6\">\n        <div class=\"card\">\n          <div class=\"card-content\">\n            <span class=\"card-title\">Pr\u00F3ximas Atitivades</span>\n            <ul class=\"collection\">\n              <li *ngFor=\"let event of this.events;\" class=\"collection-item\">\n                <span class=\"title\">{{event.name}} - {{getFormattedDate(event.startTime)}}</span>\n                <p>\n                  {{getFormattedTime(event.startTime)}} - {{getFormattedTime(event.endTime)}}<br/>\n                  {{event.description}}\n                </p>\n              </li>\n            </ul>\n          </div>\n        </div>\n     </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], NextActivityComponent);
exports.NextActivityComponent = NextActivityComponent;
//# sourceMappingURL=next-activity.component.js.map