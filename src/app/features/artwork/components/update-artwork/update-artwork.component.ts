import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Artwork } from '../../model/artwork';
import { TuiFileLike } from '@taiga-ui/kit';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-artwork',
  templateUrl: './update-artwork.component.html',
  styleUrls: ['./update-artwork.component.scss'],
})
export class UpdateArtworkComponent implements OnInit {
  editForm: FormGroup;
  art: Artwork;
  rejectedFiles: readonly TuiFileLike[] = [];

  control = new FormControl();

  loaded: boolean = false;
  constructor(
    private readonly _http: HttpClient,
    private readonly _actRoute: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
    private readonly _toast: ToastrService
  ) {}
  ngOnInit(): void {
    const id = this._actRoute.snapshot.params['id'];
    this._http.get<Artwork>('/api/artworks/' + id).subscribe((data) => {
      this.art = data;
      this._cdr.detectChanges();
      this.loaded = true;

      this.editForm = this._fb.group({
        name: [this.art.name, [Validators.required]],
        description: [this.art.description, [Validators.required]],
      });

      this.control.setValue(
        this.art.downloadLinks.map(
          (link) =>
            ({ src: link, size: 0, type: '', name: link } as TuiFileLike)
        )
      );

      this._cdr.detectChanges();
    });
  }

  index = 0;

  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  removeFile({ name }: File): void {
    this.control.setValue(
      this.control.value?.filter((current: File) => current.name !== name) ?? []
    );
  }

  clearRejected({ name }: TuiFileLike): void {
    this.rejectedFiles = this.rejectedFiles.filter(
      (rejected) => rejected.name !== name
    );
  }

  cancel() {
    window.history.back();
  }
  submitForm() {
    if (!this.editForm.valid) {
      this._toast.error('invalid form');
      return;
    }

    let form = this.editForm.value;

    this._http.put(`/api/artworks/${this.art._id}`, form).subscribe(() => {
      this._toast.info('art updated');
    });
  }
}
