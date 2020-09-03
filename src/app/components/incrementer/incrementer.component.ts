import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('value') progress: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output('value') outputValue: EventEmitter<number> = new EventEmitter;

  changeValue(value: number){

    if(this.progress >= 100 && value >= 0){
      this.outputValue.emit(100);
      return this.progress = 100;
    }

    if(this.progress <= 0 && value <= 0){
      this.outputValue.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);

  }

  onChange(newValue: number){
   
    if(newValue >= 100){
      this.progress = 100;
    }else if(newValue <= 0){
      this.progress = 0;
    }else{
      this.progress = newValue;
    }

    this.outputValue.emit(this.progress);

  }

}
