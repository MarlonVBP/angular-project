import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  ChartData,
  ChartOptions,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

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
    // Retrieve categoriasPreferidas from localStorage and parse it
    const categoriasPreferidas = JSON.parse(
      localStorage.getItem('categoriasPreferidas') || '[]'
    );

    // If there's no data in localStorage, use default values
    if (!categoriasPreferidas || categoriasPreferidas.length === 0) {
      console.warn(
        'No categoriasPreferidas found in localStorage. Using default values.'
      );
      categoriasPreferidas.push(
        { categoria: 'Doces', frequencia: 20 },
        { categoria: 'Salgados', frequencia: 30 }
      );
    }

    // Extract categories and frequencies from the categoriasPreferidas array
    const labels = categoriasPreferidas.map((item: any) => item.categoria);
    const data = categoriasPreferidas.map((item: any) => item.frequencia);

    const chartData: ChartData<'doughnut'> = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };

    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: chartData,
      options: options,
    });
  }
}
