// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Extern modules
import { ClipboardModule } from 'ngx-clipboard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {PopoverModule} from 'ngx-bootstrap'
import { ModalModule } from 'ngx-bootstrap/modal';

// Components
import { AppComponent } from './app.component';
import { DataParametersFormComponent } from './data-parameters-form/data-parameters-form.component';

// Services


@NgModule({
  declarations: [
    AppComponent,
    DataParametersFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
