import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['BigMac', 'Whopper', 'Double Cheddar'];
  public data1 = [
    [70, 20, 10]
  ];

  public labels2: string[] = ['Gasolina', 'Electricos', 'Hibridos'];
  public data2 = [
    [60, 30, 10]
  ];

  public labels3: string[] = ['Paris Francia', 'Colonia Alemania', 'Roma Italia'];
  public data3 = [
    [30, 20, 60]
  ];

  public labels4: string[] = ['Coca-Cola', 'Pepsi', 'Sprite'];
  public data4 = [
    [80, 15, 5]
  ];

}
