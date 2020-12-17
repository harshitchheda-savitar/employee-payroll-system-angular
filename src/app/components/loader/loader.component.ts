import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global/global.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  showLoader: boolean;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getLoaderObserver().subscribe(status => {
      this.showLoader = (status == true);
    });
  }
}