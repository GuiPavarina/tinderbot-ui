import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() schema;
  @Input() layout;
  @Output() executeAction = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  submitEmitter(data: any) {
    this.executeAction.emit(data);
  }

}
