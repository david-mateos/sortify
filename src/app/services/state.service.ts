import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private matSnackBar: MatSnackBar) {}

  private readonly userProfileSubject: BehaviorSubject<SpotifyApi.CurrentUsersProfileResponse> = new BehaviorSubject<
    SpotifyApi.CurrentUsersProfileResponse
  >(undefined);

  private readonly loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly userProfile$: Observable<SpotifyApi.CurrentUsersProfileResponse> = this.userProfileSubject.asObservable();
  readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private get userProfile(): SpotifyApi.CurrentUsersProfileResponse {
    return this.userProfileSubject.getValue();
  }

  private set userProfile(userProfile: SpotifyApi.CurrentUsersProfileResponse) {
    this.userProfileSubject.next(userProfile);
  }

  private get loading(): boolean {
    return this.loadingSubject.getValue();
  }

  private set loading(loading: boolean) {
    setTimeout(() => {
      this.loadingSubject.next(loading);
    });
  }

  setUserProfile(userProfile: SpotifyApi.CurrentUsersProfileResponse): void {
    this.userProfile = userProfile;
  }

  resetUserProfile(): void {
    this.userProfile = undefined;
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  setError(errorSummary: string, errorObject: any): void {
    this.matSnackBar.open(`${errorSummary} :(`);
    console.error(errorObject);
  }

  setSuccess(message: string): void {
    this.matSnackBar.open(message);
  }
}
