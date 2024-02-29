import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../model/artwork';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artwork-create',
  templateUrl: './artwork-create.component.html',
  styleUrls: ['./artwork-create.component.scss'],
})
export class ArtworkCreateComponent {
  rejectedFiles: readonly TuiFileLike[] = [];
  readonly control = new FormControl([]);

  createArtworkForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _http: HttpClient,
    private readonly _tostr: ToastrService,
    private readonly _router: Router
  ) {
    this.createArtworkForm = this._fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  submitForm() {
    if (this.control.value?.length !== 3) {
      this._tostr.error('Select exactly three files');
      return;
    }

    if (!this.createArtworkForm.valid) {
      this._tostr.error('Invalid form');
      return;
    }

    let form = this.createArtworkForm.value as any;
    let formData = new FormData();

    formData.append('file1', this.control.value[0]);
    formData.append('file2', this.control.value[1]);
    formData.append('file3', this.control.value[2]);

    this._http
      .post<Artwork>('/api/artworks', formData, {
        params: {
          name: form.name,
          description: form.description,
        },
      })
      .subscribe(() => {
        this._tostr.success('Artwork created successfully');
        this.createArtworkForm.reset();
        setTimeout(() => {
            this._router.navigate(['/artworks'])
        },500)
      });
  }

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
}
