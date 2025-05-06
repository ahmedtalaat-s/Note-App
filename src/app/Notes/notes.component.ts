import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements AfterViewInit {
  @ViewChild('colorsContainer') colorsContainer!: ElementRef;

  showColors = false;
  notes: { text: string; color: string; isEditing: boolean }[] = [];

  toggleColors() {
    this.showColors = !this.showColors;
    const colorDivs = this.colorsContainer.nativeElement.querySelectorAll('div');
    if (this.showColors) {
      colorDivs.forEach((div: HTMLElement, idx: number) =>
        setTimeout(() => div.style.display = 'block', idx * 200)
      );
    } else {
      colorDivs.forEach((div: HTMLElement) => div.style.display = 'none');
    }
  }

  addNote(color: string) {
    this.notes.push({ text: 'hello its my note', color, isEditing: false });
  }

  deleteNote(idx: number) {
    this.notes.splice(idx, 1);
  }

  editNote(idx: number) {
    this.notes[idx].isEditing = true;
    setTimeout(() => {
      const selector = `[data-index="${idx}"] .editable-note`;
      const el = document.querySelector(selector) as HTMLElement;
      if (el) {
        el.focus();

        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }, 0);
  }

  saveNote(idx: number) {

    const noteElement = document.querySelector(`[data-index="${idx}"] .editable-note`) as HTMLElement;
    if (noteElement) {
      this.notes[idx].text = noteElement.innerText;
    }
    this.notes[idx].isEditing = false;
  }

  ngAfterViewInit() {
    const colorDivs = this.colorsContainer.nativeElement.querySelectorAll('div');
    colorDivs.forEach((div: HTMLElement) => div.style.display = 'none');
  }
}
