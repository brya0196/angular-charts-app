import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chart = [];
  constructor(private _weather: WeatherService) {}

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe(res => {
        let temp_max = res['list'].map(response => response.main.temp_max)
        let temp_min = res['list'].map(response => response.main.temp_min)
        let allDates = res['list'].map(response => response.dt)

        let weatherDates = []
        allDates.forEach((res) => {
          let jsDate = new Date(res * 1000)
          weatherDates.push(jsDate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            label: weatherDates,
            datasets: [
              { data: temp_max, borderColor: '#3cba9f', fill: false },
              { data: temp_min, borderColor: '#ffcc00', fill: false }
            ]
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{ display: true }],
              yAxes: [{ display: true }],
            }
          }
        })
      })
  }
}
