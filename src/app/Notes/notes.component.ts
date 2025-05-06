import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements AfterViewInit {
  @ViewChild('colorsContainer') colorsContainer!: ElementRef;

  showColors = false;

  notes: { text: string; color: string }[] = [];


  toggleColors() {
    this.showColors = !this.showColors;

    const colorDivs = this.colorsContainer.nativeElement.querySelectorAll('div');

    if (this.showColors) {
      colorDivs.forEach((div: HTMLElement, index: number) => {
        setTimeout(() => {
          div.style.display = 'block';
        }, index * 200);
      });
    } else {
      colorDivs.forEach((div: HTMLElement) => {
        div.style.display = 'none';
      });
    }
  }

  addNote(color: string) {
    this.notes.push({
      text: 'hello its my note',
      color
    });
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }

  ngAfterViewInit() {
    const colorDivs = this.colorsContainer.nativeElement.querySelectorAll('div');
    colorDivs.forEach((div: HTMLElement) => {
      div.style.display = 'none';
    });
  }
}
