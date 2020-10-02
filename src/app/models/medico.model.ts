import { Hospital } from './hospital.model';

interface _MedicoUser{
    _id: string;
    nombre: string;
    img: string;
}


export class Medico{

    constructor(
        public nombre: string,
        public img?: string,
        public _id?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital,
    ){}

}