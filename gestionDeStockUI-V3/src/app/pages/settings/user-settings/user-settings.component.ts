import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

interface User {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  tel: string;
  role: 'ADMIN' | 'USER';
}

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  displayedColumns = ['nom', 'prenom', 'email', 'tel', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  showAddUser = false;
  showEditUser = false;
  selectedIndex: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    role: new FormControl<'USER' | 'ADMIN'>('USER'),
  });

  ngOnInit(): void {
    const users = localStorage.getItem('users');
    this.dataSource.data = users ? JSON.parse(users) : [];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  filterData(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  toggleAddUser() {
    this.showAddUser = true;
    this.showEditUser = false;
    this.userForm.reset({ role: 'USER' });
  }

  toggleEditUser(index: number) {
    this.selectedIndex = index;
    this.showEditUser = true;
    this.showAddUser = false;
    this.userForm.setValue({ ...this.dataSource.data[index] });
  }

  saveUser() {
    const user = this.userForm.value as User;
    this.dataSource.data = [...this.dataSource.data, user];
    this.persistData();
    this.userForm.reset({ role: 'USER' });
    this.showAddUser = false;
  }

  editUser() {
    if (this.selectedIndex !== null) {
      this.dataSource.data[this.selectedIndex] = this.userForm.value as User;
      this.persistData();
      this.showEditUser = false;
      this.selectedIndex = null;
    }
  }

  deleteUser(index: number) {
    this.dataSource.data.splice(index, 1);
    this.persistData();
  }

  persistData() {
    localStorage.setItem('users', JSON.stringify(this.dataSource.data));
    this.dataSource.data = [...this.dataSource.data]; // trigger refresh
  }

  closePanels() {
    this.showAddUser = false;
    this.showEditUser = false;
    this.userForm.reset({ role: 'USER' });
  }

  downloadCSVTemplate() {
    const header = 'nom,prenom,email,password,tel,role\n';
    const blob = new Blob([header], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_utilisateurs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
