import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf, DatePipe, TitleCasePipe } from '@angular/common';
import { UserResult } from '../interfaces/users';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Incluye NgIf, pipes comunes, etc.
    DatePipe,
    TitleCasePipe
  ]
})
export class CardModalComponent {
  @Input() user!: UserResult;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
