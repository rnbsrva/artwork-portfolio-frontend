import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TuiSvgModule } from '@taiga-ui/core';
import { UpdateArtworkComponent } from './components/update-artwork/update-artwork.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { ArtworkCreateComponent } from './components/artwork-create/artwork-create.component';
import { ArtworkCardComponent } from './components/artwork-card/artwork-card.component';
import { ALL_TAIGA_UI_MODULES } from 'src/app/shared/all-taiga-modules';

@NgModule({
  declarations: [
    UpdateArtworkComponent,
    ArtworkListComponent,
    ArtworkCreateComponent,
    ArtworkCardComponent,
  ],
  imports: [
    HttpClientModule,
    ALL_TAIGA_UI_MODULES,
    SharedModule,
    TuiSvgModule,
    CommonModule,
    ToastrModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    ArtworkRoutingModule,
  ],
})
export class ArtworkModule {}
