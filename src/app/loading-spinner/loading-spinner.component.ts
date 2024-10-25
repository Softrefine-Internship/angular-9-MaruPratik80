import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="spinner">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`,
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {}
