import { NgModule } from '@angular/core';

import {
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule
    ],
    exports: [
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule
    ]
})
export class MaterialModule { }