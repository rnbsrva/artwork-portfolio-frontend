import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';
import { debounceTime } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss'],
})
export class PopulationComponent implements OnInit {
  navigate(url: string) {
    this._router.navigate([url]);
  }

  isAdmin: boolean = false;

  isLoaded: boolean = false;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  rangeForm: FormGroup;

  constructor(
    private readonly _http: HttpClient,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
  ) {
    this.rangeForm = this._fb.group({
      yearFrom: [2013],
      yearTo: [2021],
    });
  }

  ngOnInit(): void {
    let data = this.rangeForm.value;
    this.load(data.yearFrom, data.yearTo);

    this.rangeForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      console.log(value);
      this.load(value.yearFrom, value.yearTo);
    });

    let user = JSON.parse(localStorage.getItem('user') as any);
    this.isAdmin = user.role === 'admin';
  }

  load(yearFrom: number, yearTo: number) {
    this.isLoaded = false;
    this._http
      .post<{ Year: number; Population: number }[]>('/api/population', {
        yearFrom,
        yearTo,
      })
      .subscribe((data) => {
        data.reverse();
        this.chartOptions = {
          series: [
            {
              name: 'Population',
              data: data.map((f) => f.Population),
            },
          ],
          chart: {
            height: 650,
            width: 1000,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },
          title: {
            text: 'Population charts',
            align: 'left',
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.8,
            },
          },
          xaxis: {
            categories: data.map((d) => d.Year),
          },
        };

        this.isLoaded = true;
      });
  }

  
}
