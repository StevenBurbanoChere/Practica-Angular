import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserResult } from '../interfaces/users';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
    <div *ngFor="let user of users" class="col-md-6 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="row g-0">
          <div class="col-4">
            <img [src]="user.picture.large" class="img-fluid rounded-start h-100 object-fit-cover"
                 [alt]="user.name.first + ' ' + user.name.last">
          </div>
          <div class="col-8">
            <div class="card-body d-flex flex-column justify-content-between h-100">
              <div>
                <h5 class="card-title">
                   {{ user.name.first }} {{ user.name.last }}
                </h5>
                <p class="card-text">
                  📧 {{ user.email }}<br>
                  📱 {{ user.cell }}<br>
                  📍 {{ user.location.city }}, {{ user.location.country }}
                </p>
                <p class="card-text">
                  <small class="text-muted">
                    👤 Usuario: {{ user.login.username }}<br>
                    🎂 Edad: {{ user.dob.age }} años
                  </small>
                </p>
              </div>
              <button class="btn btn-primary mt-2 w-100" (click)="onCardClick(user)">Ver más</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class CardsComponent {
  @Input() users: UserResult[] = [];
  @Output() cardClick = new EventEmitter<UserResult>();

  onCardClick(user: UserResult): void {
    this.cardClick.emit(user);
  }
}
