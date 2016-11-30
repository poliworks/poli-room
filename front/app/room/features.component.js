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
var FeaturesComponent = (function () {
    function FeaturesComponent() {
        this.features = [
            {
                "name": "quadro branco",
                "img": "whiteboard.png",
                "id": 1
            },
            {
                "name": "quadro negro",
                "img": "blackboard.png",
                "id": 2
            },
            {
                "name": "ar condicionado",
                "img": "ac.png",
                "id": 3
            },
            {
                "name": "caixa de som",
                "img": "sound.png",
                "id": 6
            }
        ];
    }
    return FeaturesComponent;
}());
FeaturesComponent = __decorate([
    core_1.Component({
        selector: "room-features",
        template: "\n              <div *ngFor=\"let feature of features\" class=\"col s6 m2\">\n                <div class=\"card\">\n                  <div class=\"card-image\">\n                    <img src=\"assets/img/{{feature.img}}\" class=\"feature\">\n                    <div class=\"card-content feature-text\">\n                      <p>{{feature.name}}</p>\n                    </div>\n                  </div>\n                </div>\n              </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], FeaturesComponent);
exports.FeaturesComponent = FeaturesComponent;
//# sourceMappingURL=features.component.js.map