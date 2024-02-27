import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartsRoutingModule } from './charts-routing.module';
import { PopulationComponent } from './components/population/population.component';
import { TuiBarChartModule } from '@taiga-ui/addon-charts';
import { TuiAxesModule } from '@taiga-ui/addon-charts';
import { TuiRootModule } from '@taiga-ui/core';
import { TuiLineChartModule } from '@taiga-ui/addon-charts';
import { TuiInputDateRangeModule } from '@taiga-ui/kit';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ALL_TAIGA_UI_MODULES } from 'src/app/shared/all-taiga-modules';
import { HospitalizedCountComponent } from './components/hospitalized-count/hospitalized-count.component';
@NgModule({
  declarations: [PopulationComponent, HospitalizedCountComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    TuiAxesModule,
    ALL_TAIGA_UI_MODULES,
    TuiInputDateRangeModule,
    HttpClientModule,
    TuiBarChartModule,
    ChartsRoutingModule,
    TuiRootModule,
    TuiLineChartModule,
  ],
  providers: [DatePipe],
})
export class ChartsModule {}
