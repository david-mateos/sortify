import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpotifyWebApiService } from '../services/spotify-web-api.service';
import { StateService } from '../state/state.service';

export interface IDeletePlaylistDialogData {
  playlistId: string;
}

@Component({
  selector: 'sort-delete-playlist-dialog',
  templateUrl: './delete-playlist-dialog.component.html',
  styleUrls: ['./delete-playlist-dialog.component.scss'],
})
export class DeletePlaylistDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeletePlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IDeletePlaylistDialogData,
    private spotifyWebApiService: SpotifyWebApiService,
    private matSnackBar: MatSnackBar,
    private _stateService: StateService,
    private router: Router,
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  async delete(): Promise<void> {
    this._stateService.setLoading(true);
    await this.spotifyWebApiService.deletePlaylist(this.data.playlistId);

    await this.router.navigate(['/']);
    this.dialogRef.close(true);
    this._stateService.setLoading(false);
    this.matSnackBar.open('Deleted playlist');
  }

  get loading(): boolean {
    return this._stateService.loading;
  }
}