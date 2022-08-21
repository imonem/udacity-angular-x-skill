import { NgModule } from '@angular/core';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { NotifierModule, NotifierOptions } from 'angular-notifier-updated';

const customNotifierOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: 'left',
			distance: 12,
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10,
		},
	},
	theme: 'material',
	behaviour: {
		autoHide: 5000,
		onClick: 'hide',
		onMouseover: 'pauseAutoHide',
		showDismissButton: true,
		stacking: 4,
	},
	animations: {
		enabled: true,
		show: {
			preset: 'slide',
			speed: 300,
			easing: 'ease',
		},
		hide: {
			preset: 'fade',
			speed: 300,
			easing: 'ease',
			offset: 50,
		},
		shift: {
			speed: 300,
			easing: 'ease',
		},
		overlap: 150,
	},
};

@NgModule({
	imports: [NotifierModule.withConfig(customNotifierOptions)],
	exports: [
		MatBadgeModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatListModule,
		MatIconModule,
		FlexLayoutModule,
		MatInputModule,
		NotifierModule,
	],
})
export class MaterialModule {}
