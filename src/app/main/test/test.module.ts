import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { RouterModule } from '@angular/router';




const routes = [
  {
      path     : 'test',
      component: TestComponent
  }
];


@NgModule({
  declarations: [TestComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    TestComponent
  ]
})
export class TestModule { }
