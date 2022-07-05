import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieCategory } from 'src/app/core/models/movie-category.interface';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent implements OnInit {
  public movieCategories: MovieCategory[];

  constructor(
    private movieCategoryService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieCategoryService
      .getAllCategories()
      .subscribe((categories: MovieCategory[]) => {
        this.movieCategories = categories;
      });
  }

  public onCategoryChange(categoryId: number): void {
    this.router.navigate(['category', categoryId]);
  }

  public selectAllMovies(): void {
    this.router.navigate(['']);
  }
}
