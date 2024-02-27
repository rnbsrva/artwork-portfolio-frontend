import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopulationComponent } from './components/population/population.component';
import { HospitalizedCountComponent } from './components/hospitalized-count/hospitalized-count.component';

const routes: Routes = [
  {
    component: PopulationComponent,
    path: 'charts/population',
  },
  {
    component: HospitalizedCountComponent,
    path: 'charts/hospitalized/counts',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
