export interface User {
  userId: number;
  userName: string;
  emailId: string;
  password: string;
  mobileNumber: string;
  isAdmin: boolean;
}

export interface UserPreferences {
  userId: string;
  movieId: number;
  isFavorite: boolean;
  watchLater: boolean;
  watched: boolean;
}

export interface PrimeSubscription {
  emailId: string;
  primeSubscription: boolean;
  validity: number;
}
