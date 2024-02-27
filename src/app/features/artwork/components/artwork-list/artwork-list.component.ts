import { HttpClient } from '@angular/common/http';
import { Artwork } from './../../model/artwork';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss'],
})
export class ArtworkListComponent implements OnInit {
  editArtworkFrom: FormGroup;

  currentArtwork: Artwork;
  artworks: Artwork[] = [];

  isAdmin: boolean = false;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._http.get<Artwork[]>('/api/artworks').subscribe((data) => {
      this.artworks = data;
      this._cdr.detectChanges();
    });

    let user = JSON.parse(localStorage.getItem('user') as any);
    this.isAdmin = user.role === 'admin';
  }

  navigate(url: string) {
    this._router.navigate([url]);
  }
}
