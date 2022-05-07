import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

// export const sampleC1: string = `#include <stdio.h>

// /*Below is a sample code to get started

// There are t testcases.
// Input: STDIN
// Output: STDOUT
// */

// int main()
// {
// 	int t, x;
// 	scanf("%d", &t);
// 	while(t--)
// 	{
// 		scanf("%d", &x);
// 		printf("%d", x);
// 	}
// 	return 0;
// }
// `;

// export const sampleCpp1: string = `#include <iostream>
// using namespace std;

// /*Below is a sample code to get started

// There are t testcases.
// Input: STDIN
// Output: STDOUT
// */

// int main() {
// 	int t;
// 	cin >> t;
// 	int x, y;

// 	while(t--) {
// 		cin >> x >> y;

// 		cout << x << " " << y << endl;
// 	}
// 	return 0;
// }
// `;

// export const sampleJava1: string = `import java.util.*;
// public class Main {
// 	public static void main(String args[]) {
// 		Scanner s = new Scanner(System.in);
// 		int t = s.nextInt();
// 		while(t--) {
// 			int x,y;
// 			x = s.nextInt();
// 			y = s.nextInt();

// 			// Do Something

// 			System.out.println(x,y);
// 		}
// 	}
// }
// `;

// export const samplePython1: string = `
// def main:
// 	t = int(input())
// 	while t:
// 		x, y = list(map(int, input().split()))
// 		print(x, y)

// if __name__ == '__main__':
// 	main()
// `;
export const sampleC: string = ``;

export const sampleCpp: string = ``;

export const sampleJava: string = ``;

export const samplePython: string = ``;

interface SQLResponse {
  status: number;
  score: number;
  statusMsg: string;
}

interface CodingResponse {
  compileStatus?: number;
  compileError?: string;
  testcases: [
    {
      number: number;
      status: number;
      success: boolean;
      error?: string;
    }
  ];
  score: number;
}

@Component({
  selector: "app-modal",
  templateUrl: "./modal-code-editor.component.html",
  styleUrls: ["./modal-code-editor.component.scss"]
})
export class ModalCodeEditorComponent implements OnInit {
  @ViewChild("monEditorInput", { static: true }) inputEditor: any;
  @ViewChild("monEditorOutput", { static: true }) outputEditor: any;
  question;
  questionId;
  questionTimer;
  answer;
  qType;
  inputEditorOptions = {
    theme: "vs-light",
    language: "plaintext"
  };
  outputEditorOptions = {
    theme: "vs-light",
    language: "plaintext",
    readOnly: true,
    lineNumbers: "off"
  };
  evaluationDetails = {};
  languageList = ["java", "c", "cpp", "python", "sql"];

  customerRoute: string;
  inputCode: string;
  outputCode: string;

  constructor(
    public dialogRef: MatDialogRef<ModalCodeEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // dialogRef.updatePosition({ left: "50px", top: "200px" });
    console.log(this.inputEditor);
    this.inputCode = this.data.inputCode;
    this.inputEditorOptions.language = this.data.language;
    this.question = this.data.question;
    this.answer = this.data.answer;
    this.questionTimer = this.data.questionTimer;
    this.startCountdown(this.questionTimer - 1);
    this.questionId = this.data.questionId;
    this.qType = this.data.qType;
    this.customerRoute = this.data.customerRoute;
  }

  onChangeDropdown() {
    // this.inputEditor.options = this.inputEditorOptions;
    switch (this.inputEditorOptions.language) {
      case "c":
        this.inputCode = sampleC;
        break;
      case "cpp":
        this.inputCode = sampleCpp;
        break;
      case "java":
        this.inputCode = sampleJava;
        break;
      case "python":
        this.inputCode = samplePython;
        break;
      default:
        this.inputCode = "";
        break;
    }
  }

  public startCountdown(seconds) {
    var counter;
    counter = seconds;

    // setInterval(() => {
    //   counter--;

    //   this.questionTimer = counter;
    //   if (counter <= 0) {
    //     this.close();
    //   }
    // }, 1000);
  }

  run() {
    this.outputCode = "";
    let encodedCode = encodeURIComponent(this.inputCode);
    // let answer = ["EXPECTED-EXECUTION-TIME: 50\nTESTCASE-1: \n  INPUT: \n  EXPECTED-OUTPUT-1: >\n    emp_no  birth_date      first_name      last_name       gender  hire_date\n    10001   1953-09-02      Georgi  Facello M       1986-06-26\n    10002   1964-06-02      Bezalel Simmel  F       1985-11-21\nSEARCH-KEYWORDS-FOR-EVALUATION: LIMIT\nEXPECTED-SAMPLE-PROGRAM: SELECT * FROM employees.employees LIMIT 0,2"]
    let sendData = {
      inputCode: encodedCode,
      // inputLanguage: this.inputEditor.options.language,
      questionId: this.questionId,
      customerRoute: "hydrotek-prod"
    };
    console.log(sendData);

    // this.autoEvaluationService.evaluateCode(sendData).subscribe((response) => {
    //   console.log("response", response);
    //   if (response) {
    //     if (this.qType === "SQLCoding") {
    //       let evResp: SQLResponse = response;
    //       if (evResp.status != 201) {
    //         this.outputCode = `Execution Error! \n\n` + evResp.statusMsg;
    //       } else {
    //         this.outputCode = `Execution Passed!`;
    //       }
    //       this.evaluationDetails = evResp;
    //     } else {
    //       let evResp: CodingResponse = response;
    //       let compileFlag = false;
    //       if (`compileStatus` in evResp) {
    //         if (evResp.compileError) {
    //           this.outputCode = `Compilation Failed\n` + evResp.compileError;
    //         } else {
    //           compileFlag = true;
    //         }
    //       }
    //       if (!(`compileStatus` in evResp) || compileFlag) {
    //         evResp.testcases.forEach((testcase) => {
    //           this.outputCode += `Testcase ${testcase.number} : ${
    //             testcase.success ? "SUCCESS" : "FAIL"
    //           }\n`;
    //           if (!testcase.success) {
    //             if (testcase.error) {
    //               this.outputCode += `Error : ${testcase.error}\n`;
    //             } else {
    //               this.outputCode += `Output doesn't match.`;
    //             }
    //           }
    //           // else if (testcase.success && testcase.status != 201) {
    //           // 	this.outputCode += `Error : Output doesn't match.`;
    //           // }
    //         });
    //       }
    //       this.evaluationDetails = evResp;
    //     }
    //   }
    // });
  }

  clear() {
    this.inputCode = "";
    this.outputCode = "";
  }

  close() {
    clearInterval();
    console.log("close dialog evluation details", this.evaluationDetails);
    this.dialogRef.close({
      inputCode: this.inputCode,
      language: this.inputEditor.options.language,
      evaluationDetails: this.evaluationDetails
    });
  }

  ngOnInit() {}
}
