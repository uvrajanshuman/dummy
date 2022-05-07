import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalCodeEditorComponent } from "./modal-code-editor/modal-code-editor.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "CodeSandbox";
  userInputCode: any;
  userLanguage: any;
  question: any;
  liveQuestions: any;
  socketService: any;
  questionIndex: any;
  evaluationDetails: any;
  constructor(private dialog: MatDialog) {
    this.userInputCode = "";
    this.userLanguage = "c";
    this.question = "Write a program";
    this.liveQuestions = [
      { answer: "", questionTimer: 100, id: "QN-88", type: "coding" }
    ];
    this.questionIndex = 0;
  }
  openCodeEditorDialog() {
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log(this.liveQuestions[this.questionIndex]);
    let reqUrl = document.location.href;
    let Route = reqUrl.split("/")[3];
    const codeEditorModal = this.dialog.open(ModalCodeEditorComponent, {
      disableClose: true,
      data: {
        isRunEnabled: false,
        inputCode: this.userInputCode,
        customerRoute: Route,
        language: this.userLanguage,
        question: this.question,
        answer: this.liveQuestions[this.questionIndex]["answer"],
        questionTimer: this.liveQuestions[this.questionIndex]["questionTimer"],
        questionId: this.liveQuestions[this.questionIndex]["id"],
        qType: this.liveQuestions[this.questionIndex]["type"]
      },
      height: "600px",
      width: "60%"
    });

    codeEditorModal.afterClosed().subscribe(
      (result) => {
        this.userInputCode = result.inputCode;
        this.userLanguage = result.language;
        this.evaluationDetails = result.evaluationDetails;
      },
      (err) => {
        console.log("Code Editor Close Dialog Error", err);
      }
    );
  }
}
