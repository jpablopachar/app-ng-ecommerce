import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  template: `
    <p>
      employee works!
    </p>
  `,
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
