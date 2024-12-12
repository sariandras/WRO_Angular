import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registration } from './models/registration.model';
import { DataService } from './services/data.service';
import { TeamComponent } from "./team/team.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'WRO';
  registrations: Registration[] = [];
  new: Registration | undefined;
  modify: Registration | undefined;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.GetRegistrations().subscribe({
      next: (response) => (this.registrations = response),
      error: (error) => console.log(error),
    });
  }

  newRegistration() {
    this.new = {
      id: undefined,
      teamLeader: '',
      teamName: '',
      teamLeaderBirthDate: '',
      teamLeaderEmail: '',
      category: '',
      memberCount: 0,
    };
  }
  save(reg: Registration) {
    if (!this.new) {
      this.dataService.AddNewRegistration(reg).subscribe({
        next: (response) => {
          this.registrations.push(response);
          this.new = undefined;
        },
        error: (error) => console.log(error),
      })
    }else{
      this.dataService.ModifyRegistration(reg).subscribe({
        next: (response) => {
          const index = this.registrations.findIndex(r=>r.id==response.id);
          this.registrations[index] = response;
          this.modify = undefined;
        },
        error: (error) => console.log(error),
      });
    }
  }

  doDelete(reg: Registration) {
    this.dataService.DeleteRegistration(reg.id!).subscribe({
      next: response => {
        this.registrations = this.registrations.filter(r=>r.id!=reg.id);
      },
      error: error => console.log(error)
    })
  }

  doModify(reg: Registration) {
    this.modify = JSON.parse(JSON.stringify(reg));
  }
}
