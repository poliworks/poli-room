import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

@Component({
    template: `
    <side-nav></side-nav>
    <room-content></room-content>
    <new-room-modal></new-room-modal>
    `
})
export class RoomComponent { }
