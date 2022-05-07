import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MonacoEditorModule, NgxMonacoEditorConfig } from "ngx-monaco-editor";
import { AppComponent } from "./app.component";
import { ModalCodeEditorComponent } from "./modal-code-editor/modal-code-editor.component";
import { MaterialModule } from "src/app/material.module";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from "@angular/material";
@NgModule({
  declarations: [AppComponent, ModalCodeEditorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalCodeEditorComponent]
})
export class AppModule {}
