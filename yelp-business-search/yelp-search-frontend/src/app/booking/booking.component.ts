import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  reservations: Array<{
    businessName: string;
    date: string;
    hours: string;
    minutes: string;
    email: string;
  }> = [];
  constructor() { }

  onCancel(name: string) {
    let datas: any = localStorage.getItem('reservations');
    if (!datas) {
      datas = [];
    } else {
      datas = JSON.parse(datas);
    }
    datas = datas.filter((data: any) => data.businessName !== name);
    localStorage.setItem('reservations', JSON.stringify(datas));
    alert("Reservation cancelled!");
    this.getDatas()
  }

  getDatas() {
    let data: any = localStorage.getItem('reservations');
    if (data) {
      data = JSON.parse(data);
      this.reservations = data as Array<{
        businessName: string;
        date: string;
        hours: string;
        minutes: string;
        email: string;
      }>;
    }
  }

  ngOnInit(): void {
    this.getDatas()
  }

}
