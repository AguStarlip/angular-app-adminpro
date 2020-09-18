import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]      
    })

  }

  actualizarPerfil(){
    console.log(this.profileForm.value);
    this.usuarioService.actualizarPerfil(this.profileForm.value)
        .subscribe(() => {
          const {nombre, email} = this.profileForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios realizados', 'success');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    // Muestra la imagen en el avatar>imagen de usuario en tiempo real
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){

    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
                          .then(img => {
                            this.usuario.img = img;

                            Swal.fire('Guardado', 'Imagen actualizada', 'success');
                          }).catch( err => {
                            Swal.fire('Error', 'No se pudo actualizar la imagen', 'error');
                          });

  }

}
