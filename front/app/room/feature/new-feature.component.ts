import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from "../../shared/http.service";
declare var jQuery: any;

@Component({
    selector: `new-feature-modal`,
    styleUrls: ['assets/css/new-feature.css'],
    template: `
    <div id="new-feature-modal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Novo Recurso</h4>
            <div class="row">
                <form id="new-feature-form" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="feature_name" type="text" class="validate" [(ngModel)]="feature.name" name="name">
                          <label for="feature_name">Nome do Recurso</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                          <textarea id="feature_description" class="materialize-textarea" [(ngModel)]="feature.description" name="description"></textarea>
                          <label for="feature_description">Descrição</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                          <textarea id="feature_quantity" class="materialize-textarea" [(ngModel)]="feature.quantity" name="quantity"></textarea>
                          <label for="feature_quantity">Quantidade</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                          <textarea id="feature_image" class="materialize-textarea" [(ngModel)]="feature.img" name="quantity"></textarea>
                          <label for="feature_image">Imagem</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
          <a (click)="createFeature()" class="modal-action modal-close waves-effect waves-green btn-flat ">Criar Recurso</a>
        </div>
    </div>
    `
})

export class NewFeatureComponent implements OnInit {

    @Output() onNewFeatureCreation = new EventEmitter<Event>();
    @Input() roomId: number;

    feature: Feature = new Feature();

    constructor(private http: HttpService) {}

    ngOnInit() {
        jQuery('.modal-trigger').leanModal();
    }

    createFeature() {
        this.registerFeature(this.event);
    }

    emitNewFeatureCreation(activity: any) {
        this.onNewFeatureCreation.emit(this.event);
    }

    registerFeature(activity: Event) {
        let r = {
            "name": feature.name,
            "description": feature.description,
            "quantity": feature.quantity,
            "img": feature.img};

        this.http.req({url: "register_features",
                       body: r,
                       replaceMap: {id: this.roomId},
                       handler: this.emitNewFeatureCreation.bind(this)});
    }

}

export class Feature {
    name: string;
    description: string;
    img: string;
    quantity: number;
}
