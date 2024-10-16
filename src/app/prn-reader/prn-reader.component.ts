  import { CommonModule } from '@angular/common';
  import { HttpClient } from '@angular/common/http';
  import { Component, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
  @Component({
    selector: 'app-prn-reader',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './prn-reader.component.html',
    styleUrl: './prn-reader.component.css',
  })
  export class PrnReaderComponent {
    employeeForm: FormGroup;
    prnFileUrl: string = 'hello_world.prn';

    generateRandomNumber(): string {
      const length = 12;
      let randomNumber = '';

      for (let i = 0; i < length; i++) {
        randomNumber += Math.floor(Math.random() * 10);
      }
      return randomNumber;
    }

    // onFileSelected(e: any): void {
    //   const file = e.target.files[0];

    //   if (file) {
    //     if (!file.name.endsWith('.prn')) {
    //       alert('Please select a valid PRN file.');
    //       return;
    //     }
    //     const reader = new FileReader();
    //     reader.onload = (e: any) => {
    //       const fileContent = e.target.result;
    //       const fileContentToString = fileContent.toString();
    //       console.log('Original PRN Content: \n', fileContentToString);
    //       const modifiedContent = this.modifyPRNContent(fileContentToString);
    //       console.log('Modified PRN Content: \n', modifiedContent);
    //       this.modifiedFileContent = modifiedContent;
    //     };
    //     reader.readAsText(file);
    //   }
    // }
    // modifyPRNContent(content: string): string {
    //   let modifiedContent = content
    //     .replace(/Warehouse Name:/g, 'WareHouse Name :')
    //     .replace(/Warehouse/g, this.name);

    //   return modifiedContent;
    // }

    modifiedFileContent: string = '';

    constructor(private http: HttpClient) {
      this.employeeForm = new FormGroup({
        empName: new FormControl('', [Validators.required]),
        empId: new FormControl('', [Validators.required]),
        empDept: new FormControl('', [Validators.required]),
      });

      this.loadFIleContent();
    }

    loadFIleContent(): void {
      this.http.get(this.prnFileUrl, { responseType: 'text' }).subscribe(
        (data) => {
          // const prnCode = JSON.stringify(data);
          console.log('Original Data: ' + data);
          this.modifiedFileContent = data;
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
    }

    modifyPrnContent(content: string) {
      const EmpName = this.employeeForm.get('empName')?.value;
      const EmpId = this.employeeForm.get('empId')?.value;
      const EmpDept = this.employeeForm.get('empDept')?.value;

      const Bar1D = this.generateRandomNumber();
      console.log(Bar1D);

      let modifiedContent = content
        .replace(/briot/, EmpName)
        .replace(/1234/, EmpId)
        .replace(/SERVICE/, EmpDept)
        .replace(/123456789012/g, EmpId);
      return modifiedContent;
    }

    async printBarcode(modifiedContent: string) {
      try {
        const browserPrint = new ZebraBrowserPrintWrapper();
        const defaultPrinter = await browserPrint.getDefaultPrinter();
        browserPrint.setPrinter(defaultPrinter);
        const printerStatus = await browserPrint.checkPrinterStatus();
        if (printerStatus.isReadyToPrint) {
          const zpl = modifiedContent;

          browserPrint.print(zpl);
          console.log('Barcode printed:', modifiedContent);
        } else {
          console.log('Error/s', printerStatus.errors);
        }
      } catch (error) {
        console.error('Printing error:', error);
      }
    }

    onSubmit() {
      if (this.employeeForm.valid) {
        const modifiedContent = this.modifyPrnContent(this.modifiedFileContent);
        console.log('Modified PRN Content: ', modifiedContent);
        // console.log(this.employeeForm.value);
        this.printBarcode(modifiedContent);
      } else {
        console.log('Error..!!');
      }
    }
  }


