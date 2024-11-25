import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-category-grafic',
  standalone: true,
  imports: [],
  templateUrl: './category-grafic.component.html',
  styleUrl: './category-grafic.component.scss',
})
export class CategoryGraficComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: any;

  ngAfterViewInit(): void {
    this.initChart();
  }

  private initChart(): void {
    const data: ChartData<'doughnut'> = {
      labels: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'],
      datasets: [
        {
          data: [25, 30, 20, 25], // Substitua por dados dinâmicos ou externos
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };

    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
}
