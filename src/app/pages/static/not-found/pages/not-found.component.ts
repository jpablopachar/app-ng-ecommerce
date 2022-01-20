import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <p>404 - Pagina no encontrada</p>
    </div>
  `,
  styles: [
    `
      .not-found {
        text-align: center;
        padding: 100px;
        font-size: 40px;
        font-weight: 500;
      }
    `,
  ],
})
export class NotFoundComponent {}
