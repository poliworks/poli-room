import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

@Component({
    selector: `room-problems`,
    template: `

      <div class="col s12s m6">
        <!-- MANUTENÇÃO -->
        <div class="card">
          <div class="card-content">
            <span class="card-title">Manutenções Cadastradas</span>
            <ul class="collection">
              <li *ngFor="let problem of problems;" class="collection-item">
                <span class="title">{{problem.name}}</span>
                <p>{{problem.description}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div> <!-- ends col MANUTENÇÃO -->
    `
})
export class ProblemsComponent {
    problems : Object[] = [
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
    ]
}
