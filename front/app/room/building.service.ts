import { Injectable } from '@angular/core';

import { Building } from './building';
import { ROOMSBYBUILDINGS } from './mock-sidenav';
import Map = ts.Map;

@Injectable()
export class BuildingService {
    getHeroes(): Map {
        return HEROES;
    }
}
