import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.interface';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from 'src/app/core/services/movie.service';
import { UserService } from 'src/app/core/services/user.service';
import { PrimeSubscriptionService } from 'src/app/core/services/prime-subscription.service';
import { User, UserPreferences } from 'src/app/core/models/user.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MovieDetailsComponent', () => {
  let movie: Movie;
  let user: User;
  let userPreferences: UserPreferences;
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let mockMovieService: any;
  let mockAuthService: any;
  let mockUserService: any;
  let mockPrimeSubscriptionService: any;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    mockPrimeSubscriptionService = jasmine.createSpyObj([
      'hasUserPrimeSubscription',
    ]);
    mockMovieService = jasmine.createSpyObj(['getMovieById']);
    mockAuthService = jasmine.createSpyObj([
      'getAuthenticatedUser',
      'isAuthenticated',
    ]);
    mockUserService = jasmine.createSpyObj([
      'getUserPreferenceByMovieId',
      'updateUserPreference',
    ]);

    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) =>
              new TranslateHttpLoader(http, 'public/assets/i18n', '.json'),
            deps: [HttpClient],
          },
        }),
        OverlayModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthenticationService, useValue: mockAuthService },
        {
          provide: PrimeSubscriptionService,
          useValue: mockPrimeSubscriptionService,
        },
        TranslateService,
        MatSnackBar,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.returnValue(
      Promise.resolve(true)
    );

    movie = {
      id: 1,
      name: 'Top Gun 1',
      description: 'description test',
      title: 'Top Gun movie',
      isPrime: false,
      categoryId: [111],
      imageUrl: '',
      rating: 9.5,
      duration: 100,
      language: 'English',
      genre: 'Action',
    } as Movie;

    user = {
      emailId: 'abc@gmail.com',
      password: 'abc',
      isAdmin: false,
      userId: 1,
      userName: 'abc',
      mobileNumber: '123',
    } as User;

    userPreferences = {
      userId: '1',
      movieId: 1,
      isFavorite: false,
      watched: false,
      watchLater: false,
    } as UserPreferences;
  });

  it('component should be created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the movie during initialization', () => {
    // arrange.
    mockMovieService.getMovieById.and.returnValue(movie);

    // act.
    fixture.detectChanges();

    // assert.
    expect(component.movie).toEqual(movie);
  });

  it('should display correct movie title', () => {
    // arrange.
    mockMovieService.getMovieById.and.returnValue(movie);
    fixture.detectChanges();

    // act.
    fixture.detectChanges();

    // assert.
    expect(
      fixture.debugElement.query(By.css('.title')).nativeElement.textContent
    ).toContain(movie.title);
  });

  it('should add/remove the movie to/from favorites on toggling favorite btn', () => {
    // arrange
    userPreferences.isFavorite = !userPreferences.isFavorite;
    mockAuthService.isAuthenticated.and.returnValue(true);
    mockAuthService.getAuthenticatedUser.and.returnValue(user);
    mockUserService.getUserPreferenceByMovieId.and.returnValue(
      of(userPreferences)
    );
    mockUserService.updateUserPreference.and.returnValue(of(userPreferences));
    mockMovieService.getMovieById.and.returnValue(movie);

    // act.
    fixture.detectChanges();
    component.toggleFavorite();

    // assert.
    expect(component.isMarkedFavorite).toBe(userPreferences.isFavorite);
  });

  it('should add the movie to watched section on toggling watch now btn', () => {
    // arrange
    userPreferences.watched = true;
    mockAuthService.isAuthenticated.and.returnValue(true);
    mockAuthService.getAuthenticatedUser.and.returnValue(user);
    mockUserService.getUserPreferenceByMovieId.and.returnValue(
      of(userPreferences)
    );
    mockUserService.updateUserPreference.and.returnValue(of(userPreferences));
    mockMovieService.getMovieById.and.returnValue(movie);

    // act.
    fixture.detectChanges();
    component.watchNowClickedEvent();

    // assert.
    expect(component.userPreferences.watched).toBe(true);
  });

  it('should add/remove the movie to/from watch later wishlist on toggling watch later btn', () => {
    // arrange
    userPreferences.watchLater = !userPreferences.watchLater;
    mockAuthService.isAuthenticated.and.returnValue(true);
    mockAuthService.getAuthenticatedUser.and.returnValue(user);
    mockUserService.getUserPreferenceByMovieId.and.returnValue(
      of(userPreferences)
    );
    mockUserService.updateUserPreference.and.returnValue(of(userPreferences));
    mockMovieService.getMovieById.and.returnValue(movie);

    // act.
    fixture.detectChanges();
    component.toggleWatchLater();

    // assert.
    expect(component.isMarkedWatchLater).toBe(userPreferences.watchLater);
  });
});
