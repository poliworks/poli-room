import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
      <navbar></navbar>
      <div class="site-space" style="position: relative; top: 64px;">
        <router-outlet></router-outlet>
      </div>
              
     `
})

export class AppComponent  { name = 'Angular'; }
