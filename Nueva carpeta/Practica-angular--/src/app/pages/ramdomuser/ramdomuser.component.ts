import { Component, OnInit } from '@angular/core';
import { RamdomuserService } from './services/ramdomuser.service';
import { UserResult } from './interfaces/users';
import { CardsComponent } from './cards/cards.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "./search/search.component";

@Component({
  selector: 'app-ramdomuser',
  standalone: true,
  imports: [CommonModule, CardsComponent, CardModalComponent, SearchComponent],
  templateUrl: './ramdomuser.component.html',
  styleUrls: ['./ramdomuser.component.css']
})
export class RamdomuserComponent implements OnInit {
  users: UserResult[] = [];
  filteredUsers: UserResult[] = [];
  selectedUser!: UserResult;
    showModal = false;

  constructor(private _service: RamdomuserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this._service.getUsers().subscribe(data => {
      this.users = data.results;
      this.filteredUsers = [...this.users];
    });
  }

  selectUser(user: UserResult): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  onSearch(term: string): void {
    const t = term.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      `${u.name.first} ${u.name.last}`.toLowerCase().includes(t)
    );
  }

  onRefresh(): void {
    this.loadUsers(); 
  }
}
