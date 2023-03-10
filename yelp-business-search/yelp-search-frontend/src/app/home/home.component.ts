import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { SearchPageComponent } from '../search-page/search-page.component';
import { ResultTableComponent } from '../result-table/result-table.component';
import {SearchService} from "../../service/search.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {
  }

}
