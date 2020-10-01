import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { SearchService } from './core/services/search.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'githubtask';
  error: string = null;
  users: string[];
  searchForm: FormGroup;
  subscription: Subscription;
  constructor(private searchService: SearchService) {}
  ngOnInit(): void {
    this.initForm();
  }

  onSearchUsers() {
    this.searchService
      .searchUsers(this.searchForm.value.search)
      .subscribe((data) => {
        console.log(data);
        this.users = data.items;
        if (data.total_count === 0) {
          this.error = 'there are no such users';
        } else if (data.total_count !== 0) {
          this.error = null;
        }
      });
  }
  private initForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, Validators.required),
    });
  }
}
