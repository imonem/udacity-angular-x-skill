import { NgModule } from '@angular/core';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import {
	MatSnackBarModule,
	MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

@NgModule({
	exports: [
		MatBadgeModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatListModule,
		MatIconModule,
		FlexLayoutModule,
		MatInputModule,
		MatSnackBarModule,
	],
})
export class MaterialModule {}
