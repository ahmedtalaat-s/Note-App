import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements AfterViewInit, OnInit {
  constructor(private router: Router) {}

  @ViewChild('colorsContainer') colorsContainer!: ElementRef;

  showColors = false;
  notes: { text: string; color: string; isEditing: boolean }[] = [];

  showInfo: boolean = false;
  fullName: string = '';
  email: string = '';
  imgUrl: string = '';

  ngOnInit(): void {
    const userData = localStorage.getItem('curretUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log('Loaded user:', parsedUser);
      this.fullName = parsedUser.fullName;
      this.email = parsedUser.email;
      this.imgUrl = parsedUser.imgUrl;
    }
  }


  ngAfterViewInit() {
    const colorDivs = this.colorsContainer.nativeElement.querySelectorAll('div');
    colorDivs.forEach((div: HTMLElement) => div.style.display = 'none');
  }

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

  toggleInfo() {
    this.showInfo = !this.showInfo;
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

  signOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }


}
