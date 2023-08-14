import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network-basic-info',
  templateUrl: './network-basic-info.component.html',
  styleUrls: ['./network-basic-info.component.scss']
})
export class NetworkBasicInfoComponent implements OnInit {

  youtube = {
    subs: 88756,
    videos: 106,
    visits: 165590,
    likes: 14454
  }

  data : any = {};

  ngOnInit() {
    this.data.subs = this.transformNumbers(this.youtube.subs);
    this.data.videos = this.transformNumbers(this.youtube.videos);
    this.data.visits = this.transformNumbers(this.youtube.visits);
    this.data.likes = this.transformNumbers(this.youtube.likes);
  }

  transformNumbers(number: number): string {
    return number > 1000 ? Math.floor(number / 1000) + 'K' : number + '';
  }
}
