import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-table',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements AfterViewInit, OnInit {
  constructor(private router: Router,private _Notes:NotesService) {}

  @ViewChild('colorsContainer') colorsContainer!: ElementRef;

  showColors = false;
  notes: {noteId:string,userId:string, text: string; color: string; isEditing: boolean }[] = [];

  showInfo: boolean = false;
  fullName: string = '';
  email: string = '';
  imgUrl: string = '';
  userId: string = '';

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    const notes = localStorage.getItem('notes');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log('Loaded user:', parsedUser);
      this.fullName = parsedUser.fullName;
      this.email = parsedUser.email;
      this.imgUrl = parsedUser.imgUrl;
      this.userId = parsedUser.id;
    }

    if (notes) {
      this.notes=JSON.parse(notes)
    } else {
      this.getNotes()
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
    let content='hello its my note'
    let noteId=''
    this._Notes.addNote(this.userId, color, content).subscribe({
      next: (res) => {
        noteId = res.name.split('/')?.at(-1)
        console.log(noteId);
        this.notes.push({ noteId,userId:this.userId, text: content, color, isEditing: false });
        console.log(this.notes);

      },
      error: (err) => {
        console.log(err);

      }
    })


  }

  deleteNote(idx: number,noteId:string) {
    this.notes.splice(idx, 1);
    this.addNotesToLocal(this.notes)
    console.log(noteId);

    this._Notes.deleteNote(noteId).subscribe({
      next: (res) => {
        console.log('deleted');
      }
    })
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
      this.addNotesToLocal(this.notes)
    }
    this.notes[idx].isEditing = false;
    console.log(this.notes[idx].noteId);
    console.log(this.notes[idx].color);
    console.log(this.notes[idx].text);
    console.log(this.userId);

    this._Notes.updateNote(this.notes[idx].noteId, this.userId, this.notes[idx].color, this.notes[idx].text).subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err)=> {
        console.log(err);

      },
    })
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }


  getNotes() {
    let noteId='',
        content='',
        color = '',
        notes=[]

    this._Notes.getNotesById(this.userId).subscribe({
      next: (res) => {
        notes = res

        notes.forEach((element: any) => {


          noteId = element.document.name.split('/').at(-1)
          content = element.document.fields.content.stringValue
          color = element.document.fields.color.stringValue

          this.notes.push({
            noteId,userId:this.userId,
            text: content, color, isEditing: false
          });
        });
        this.addNotesToLocal(this.notes)
      }
    })
  }

  addNotesToLocal(notes:any) {
    localStorage.setItem('notes',JSON.stringify(notes))
  }
  getNotesFromLocal() {
    this.notes=JSON.parse(localStorage.getItem('notes') as string)
  }




}
