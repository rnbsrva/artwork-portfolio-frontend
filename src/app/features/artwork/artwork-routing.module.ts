import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { ArtworkCreateComponent } from './components/artwork-create/artwork-create.component';
import { UpdateArtworkComponent } from './components/update-artwork/update-artwork.component';

const routes: Routes = [
  {
    path: 'artworks',
    component: ArtworkListComponent,
  },
  {
    path: 'artworks/create',
    component: ArtworkCreateComponent,
  },
  {
    path: 'artworks/update/:id',
    component: UpdateArtworkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtworkRoutingModule {}
