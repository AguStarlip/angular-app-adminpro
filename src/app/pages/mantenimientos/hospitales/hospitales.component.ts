import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe( img => this.cargarHospitales());
  }

  cargarHospitales(){

    this.cargando = true;

    this.hospitalService.cargarHospitales()
        .subscribe(hospitales => {
          this.cargando = false;
          this.hospitales = hospitales;
        });
  }

  guardarCambios(hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
        .subscribe(resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });

  }

  eliminarHospital(hospital: Hospital){

    Swal.fire({
      title: 'Borrar hospital?',
      text: `Esta seguro que quiere borrar ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id)
            .subscribe(resp => {
              this.cargarHospitales();
              Swal.fire('Hospital borrado',`${hospital.nombre} fue eliminado`,'success')
            });
      };
    }
    );

  }

  async abrirSwalHospital(){

    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if(value.trim().length > 0){
      this.hospitalService.crearHospital(value)
          .subscribe(resp => {
            this.cargarHospitales();
            Swal.fire('Hospital creado', value, 'success');
          });
    }

  }

  abrirModal(hospital: Hospital){

    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

  buscar(termino: string){

    if(termino.length === 0){
      return this.cargarHospitales();
    }

    this.busquedasService.buscar('hospitales', termino)
        .subscribe((resp: Hospital[]) => {
          this.hospitales = resp;
        });

  }

}
