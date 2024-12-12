import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Registration } from '../models/registration.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  @Input() teamData: Registration | undefined = undefined;
  @Output() saved = new EventEmitter<Registration>();
  @Output() cancelled = new EventEmitter<void>();

  getValue(event: any) {
    console.log(this.teamData)
    return event.target.value;
  }

  cancel() {
    this.cancelled.emit();
  }

  save() {
    this.saved.emit(this.teamData);
  }
}
