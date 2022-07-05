import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public searchBarForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchBarForm = this.fb.group({
      searchControl: [''],
    });
  }

  public applySearch(): void {
    const { searchControl } = this.searchBarForm.value;
    this.router.navigate(['search', searchControl]);
  }
}
