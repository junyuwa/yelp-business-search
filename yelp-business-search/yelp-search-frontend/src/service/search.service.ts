import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Businesses, Review} from 'src/app/shared/models/Businesses';
import {AUTO_COMPLETE_URL, DETAIL_URL, REVIEWS_URL, SEARCH_URL} from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  reviews: Review[] = [];
  businesses: Businesses[] = [];
  business: Businesses | null = null;
  constructor(private http: HttpClient) { }

  public UserInput!: String;

  getAutocomplete(text: string) {
    return this.http.get(`${AUTO_COMPLETE_URL}${text}`);
  }


  getSingleData(id: string) {
    this.http.get<Businesses>(`${DETAIL_URL}${id}`)
      .subscribe(business => {
        this.business = business;
      })
  }

  getData(term: string, distance: number, categories: string, latitude: number, longitude: number){
    this.http.get<Businesses[]>(`${SEARCH_URL}${term}/${latitude}/${longitude}/${distance}/${categories}`)
      .subscribe(businesses => {
        this.businesses = businesses;
      })
  }

  getReview(id: string) {
    this.http.get<Review[]>(`${REVIEWS_URL}${id}`)
      .subscribe(reviews => {
        this.reviews = reviews;
      })
  }
}
