import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from "../../service/search.service";
import {Businesses} from "../shared/models/Businesses";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css'],
  providers: [NgbCarouselConfig]
})
export class DetailModalComponent implements OnInit {
  now = new Date();
  reserved = false;
  myForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    date: new FormControl('', [Validators.required]),
    hours: new FormControl('', [Validators.required]),
    minutes: new FormControl('', [Validators.required])
  })
  myFormData = {
    email: '',
    date: '',
    hours: '',
    minutes: ''
  }
  get email() {
    return this.myForm.get('email');
  }
  get date() {
    return this.myForm.get('date');
  }
  get hours() {
    return this.myForm.get('hours');
  }
  get minutes() {
    return this.myForm.get('minutes');
  }

  getIfReserve() {
    let datas: any = localStorage.getItem('reservations');
    if (!datas) {
      datas = [];
    } else {
      datas = JSON.parse(datas);
    }
    let data = datas.find((data: any) => data.businessName === this.searchService.business?.name);

    if (data) {
      this.reserved = true;
    } else {
      this.reserved = false;
    }
  }

  onCancel() {
    let datas: any = localStorage.getItem('reservations');
    if (!datas) {
      datas = [];
    } else {
      datas = JSON.parse(datas);
    }
    datas = datas.filter((data: any) => data.businessName !== this.searchService.business?.name);
    localStorage.setItem('reservations', JSON.stringify(datas));
    alert("Reservation cancelled!");
    this.getIfReserve();
  }

  onSubmit() {
    let datas: any = localStorage.getItem('reservations');
    if (!datas) {
      datas = [];
    } else {
      datas = JSON.parse(datas);
    }
    datas.push(Object.assign(this.myFormData, {
      businessName: this.searchService.business?.name,
    }));
    localStorage.setItem('reservations', JSON.stringify(datas));
    alert("Reservation created!");
    this.mS.dismissAll()
    this.getIfReserve();
  }
  mapOptions: google.maps.MapOptions = {
    // later replace with business lat lng
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom: 16
  }
  marker = {
    position: { lat: 38.9987208, lng: -77.2538699 },
  }


  constructor(config: NgbCarouselConfig, public searchService: SearchService, private mS: NgbModal) {
    config.interval = 3000;
    config.keyboard = true;
    if (this.searchService.business) {
      this.getIfReserve();
      this.searchService.getReview(this.searchService.business.id);
      let lat = this.searchService.business.coordinates.latitude;
      let lng = this.searchService.business.coordinates.longitude;
      console.log(this.searchService.business)
      this.mapOptions = {
        // later replace with business lat lng
        center: { lat: lat, lng: lng },
        zoom: 16
      }
      this.marker = {
        position: { lat: lat, lng: lng },
      }
    }
  }

  ngOnInit(): void {
  }


  formatCategories(business: Businesses) {
    return business.categories.map(c => c.title).join(" | ");
  }

  openModal(content: any) {
    this.mS.open(content)
  }
  onCloseHandled() {
    this.mS.dismissAll();
  }

}
