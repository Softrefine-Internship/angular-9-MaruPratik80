import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ObserverDirective } from './observer.directive';

@NgModule({
  declarations: [LoadingSpinnerComponent, ObserverDirective],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, ObserverDirective],
})
export class SharedModule {}
