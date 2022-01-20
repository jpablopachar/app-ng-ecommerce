import { Component } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>Welcome to our portal</h1>
      </div>
      <div class="app-page__content">
        <p>This application is built with angular</p>
        <p>
          It can be integrated with any backend like Firebase, NET Core, Java,
          Python, Node, PHP
        </p>
      </div>
    </div>
  `,
})
export class WellcomeComponent {}
