import { Component, Inject, Input, OnInit } from '@angular/core';
import { Artwork } from '../../model/artwork';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss'],
})
export class ArtworkCardComponent implements OnInit {
  @Input() artwork: Artwork;

  index: number = 0;

  editForm: FormGroup;
  isAdmin: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editForm = this._fb.group({
      name: [this.artwork.name, [Validators.required]],
      description: [this.artwork.description, [Validators.required]],
      files: [],
    });

    let user = JSON.parse(localStorage.getItem('user') as any);
    this.isAdmin = user?.role === 'admin';
  }

  convertUrl(url: string): string {
    return url.replace('localhost', '172.20.10.4');
  }

  deleteArt() {
    let sure = confirm('are you sure to delete art?');

    if (sure) {
      this._http.delete('/api/artworks/' + this.artwork._id).subscribe(() => {
        this._tostr.info('Artwork deleted');
        this._router.navigate(['/artworks']);
      });
    }
  }

  editArtData() {}
}
