import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../pokemones/card/card.component';
import { Dbzs } from './interfaces/dbzs';
import { DbzService } from './services/dbz.service';

@Component({
  selector: 'app-Dbz',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnInit {
  dbz: Dbzs | undefined;

  constructor(
    private _srvdbz:DbzService
  ){ }

  ngOnInit(): void {
    this._srvdbz.getdbzs().subscribe((dbzsAll) =>{
    
        dbzsAll.results.forEach((dbz) => {
         this._srvdbz.getdbz(dbz.name).subscribe((dbzData) => {
            dbz.data = dbzData;
          });
        });
        this.dbz = dbzsAll;
        console.log(this.dbz);
      }
    );
  }


}