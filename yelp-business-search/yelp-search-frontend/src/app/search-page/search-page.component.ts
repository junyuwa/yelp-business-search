import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/service/search.service';
import {GEO_URL} from "../shared/constants/urls";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  myForm!: FormGroup;
  myFormData = {
    keyword: '',
    distance: '',
    category: 'default',
    location: ''
  };
  autocompleteText = '';
  term = '';
  latitude = 0;
  longitude = 0;
  distance!: number;
  toggleDisableInput = false;
  li: any
  autocompleteOptions = [];
  autoDetectLocation = false;


  constructor(private http: HttpClient,
    private searchService: SearchService,
    activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit() {
    let latitude: number, longitude: number;

    if (!this.autoDetectLocation) {
      this.http.get<[number, number]>(GEO_URL + '/' + this.myFormData.location)
        .subscribe(res => {
          latitude = res[0];
          longitude = res[1];
          this.searchService.getData(
            this.myFormData.keyword,
            Number(this.myFormData.distance),
            this.myFormData.category,
            latitude,
            longitude
          )
        })
    } else {
      this.searchService.getData(
        this.myFormData.keyword,
        Number(this.myFormData.distance),
        this.myFormData.category,
        this.latitude,
        this.longitude
      )
    }
  }

  onAutocomplete() {
    this.autocompleteText = this.myFormData.keyword;
    console.log(this.autocompleteText);
    this.searchService.getAutocomplete(this.autocompleteText)
      .subscribe((response: any) => {
        this.autocompleteOptions = response.map((res: any) => res.title);
      })
  }

  clearForm() {
    this.searchService.business = null;
    this.searchService.businesses = [];
  }

  autoLocation(e: any) {
    if (e.target.checked) {
      this.autoDetectLocation = true;
      fetch('https://ipinfo.io/json?token=663046f142469e')
        .then(res => res.json())
        .then(data => {
          let loc = data.loc;
          let x = loc.indexOf(',');
          let lat = loc.slice(0, x);
          let y = loc.indexOf(',') + 1;
          let z = loc.length;
          let lng = loc.slice(y, z);
          this.latitude = lat;
          this.longitude = lng;
        })

    } else {
      this.autoDetectLocation = false
    }
  }


}
