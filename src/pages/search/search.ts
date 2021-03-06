import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';
import {RoomsProvider} from "../../providers/rooms/rooms";


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public roomType: any;
  public guests: any;
  public beds: any;
  public priceRange: any;
  public from: any;
  public to: any;


  constructor(
    public nav: NavController,
    public roomsService: RoomsProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.priceRange = {
      lower: 0,
      upper: 500
    };

    this.roomType = 'standard';
    this.guests = 1;
    this.beds = 1;
    this.from = today.toISOString();
    this.to = tomorrow.toISOString();

  }


  public findRooms() {

    let loading = this.loadingCtrl.create({
      content: "Finding Available rooms...",
      duration:30000
    });

    loading.present();

    let options = {
      roomType: this.roomType,
      guests: this.guests,
      beds: this.beds,
      priceRange: this.priceRange,
      from: this.from,
      to: this.to
    };

    this.roomsService.getRooms(options).then((data) => {

      loading.dismiss();

      if (typeof(data[0]) === "undefined") {
        let alert = this.alertCtrl.create({
          title: 'SORRY',
          subTitle: 'No Rooms Available For Your Search',
          buttons: ['Ok']
        });

        alert.present();
      }
      else {
        this.nav.push('AvailableRoomsPage', {
          rooms: data,
          details: options
        });
      }
    }, (err) => {
      console.log(err);
    });

  }

}
