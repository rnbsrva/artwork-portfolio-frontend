import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  selector: 'app-hospitalized-count',
  templateUrl: './hospitalized-count.component.html',
  styleUrls: ['./hospitalized-count.component.scss'],
})
export class HospitalizedCountComponent implements OnInit {
  control: FormControl = new FormControl(new Date('2020-04-08'));
  private _ahahha: any;

  set ahahha(value: any) {
    console.log(value);
    this.control.setValue(value);
  }

  constructor(
    private readonly _http: HttpClient,
    private readonly datePipe: DatePipe,
    private readonly _router: Router,
  ) {}

  isLoaded: boolean = false;
  isAdmin: boolean = false;


  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.load('2020-04-08');

    this.control.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.load(this.datePipe.transform(value, 'yyyy-MM-dd')!);
    });
    let user = JSON.parse(localStorage.getItem('user') as any);
    this.isAdmin = user.role === 'admin';
  }

  load(date: string) {
    this.isLoaded = false;
    console.log(date);
    this._http
      .get<{ date: string; hospitalized: number }[]>(
        '/api/getHospitalizedCounts?date=' + date
      )
      .subscribe((data) => {
        data.reverse();
        this.chartOptions = {
          series: [
            {
              name: 'Covid',
              data: data.map((f) => f.hospitalized),
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
            text: 'Covid charts',
            align: 'left',
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.8,
            },
          },
          xaxis: {
            categories: data.map((d) => this.parseDateString(d.date)),
          },
        };

        this.isLoaded = true;
      });
  }

  parseDateString(dateString: string): string | null {
    if (!dateString || dateString.length !== 8) {
      return null; // Return null if the input value is invalid
    }

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return year + '-' + month + '-' + day;
  }

  navigate(url: string) {
    this._router.navigate([url]);
  }
}
