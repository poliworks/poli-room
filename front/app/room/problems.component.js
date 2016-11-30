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
var ProblemsComponent = (function () {
    function ProblemsComponent() {
        this.problems = [
            {
                "id": 1,
                "name": "Projetor sumiu!!",
                "description": " O curioso caso do projetor desaparecido!"
            },
            {
                "id": 2,
                "name": "O Ar Condicionado precisa de terapia",
                "description": "Temperamental, o ar funciona quando está de bom humor. No entanto, os alunos não estão de bom humor."
            },
            {
                "id": 3,
                "name": "Limpar a lousa",
                "description": "Há contos antigos que dizem que a lousa uma vez foi branca. Mas nunca foi vista assim faz alguns séculos."
            }
        ];
    }
    return ProblemsComponent;
}());
ProblemsComponent = __decorate([
    core_1.Component({
        selector: "room-problems",
        template: "\n\n      <div class=\"col s12s m6\">\n        <!-- MANUTEN\u00C7\u00C3O -->\n        <div class=\"card\">\n          <div class=\"card-content\">\n            <span class=\"card-title\">Manuten\u00E7\u00F5es Cadastradas</span>\n            <ul class=\"collection\">\n              <li *ngFor=\"let problem of problems;\" class=\"collection-item\">\n                <span class=\"title\">{{problem.name}}</span>\n                <p>{{problem.description}}</p>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div> <!-- ends col MANUTEN\u00C7\u00C3O -->\n    "
    }),
    __metadata("design:paramtypes", [])
], ProblemsComponent);
exports.ProblemsComponent = ProblemsComponent;
//# sourceMappingURL=problems.component.js.map