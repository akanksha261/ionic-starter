import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  selectedDate: string = "";
  minDate: string = "";
  maxDate: string = "";
  selectedDatePast10: string = "";
  selectedDatePast365: string = "";
  currentDate: string = "";
  yestDate: string = "";
  showList: boolean = false;
  systemTimeZone: string = "America/Chicago";
  @ViewChild('datePopOver') datePopOver: IonDatetime | undefined;
  constructor() {}

  ngOnInit(){
    this.systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.currentDate = moment.tz(this.systemTimeZone).format('MM/DD/yyyy');
    this.yestDate = moment.tz(this.systemTimeZone).subtract(1, 'day').format('MM/DD/yyyy');
    this.minDate = moment.tz(this.systemTimeZone).add(1, 'day').format();
    this.maxDate = moment.tz(this.systemTimeZone).add((365*5), 'day').format();
  }

  isFutureDate = (dateStr: string) => {
    const dateVal = moment.tz(dateStr, this.systemTimeZone).format('yyyy-MM-DD');
    const todayVal = moment.tz(this.systemTimeZone).format('yyyy-MM-DD');
    return (dateVal > todayVal);
  }

  showListData(){
    this.selectedDatePast10 = moment(this.selectedDate).subtract(10, 'day').format('MM/DD/yyyy');
    this.selectedDatePast365 = moment(this.selectedDate).subtract(365, 'day').format('MM/DD/yyyy');
    this.showList = true;
  }

  handleDateChange(event: any){
    this.showList = false;
    this.datePopOver?.confirm(true);
  }
}
