import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

@Component({
    template: `
    <side-nav></side-nav>
    <room-content></room-content>
    `
})
export class RoomComponent { }
