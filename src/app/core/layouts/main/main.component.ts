import { Component, OnInit } from '@angular/core';
import { LoadingService } from "../../services/loading.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    public loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
  }
}
