import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

  @Input() title: string = 'Untitle';
  @Input('labels') doughnutChartLabels: Label[] = ['label1','label2','label3'];
  @Input('data') doughnutChartData: MultiDataSet = [[50,50,50]];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public colors: Color[] = [
    {backgroundColor: ['#6857E6','#009FEE','#F02059']}
  ]

}
