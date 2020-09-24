import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario{

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public rol?: string,
        public uid?: string
    ){}

    get imagenUrl(){

        if(!this.img){
            return `${base_url}/upload/usuarios/no-image.jpg`;
        }

        // Validar img usuario de google
        if(this.img.includes('https')){
            return this.img;
        }

        // Validar img usuario del servidor
        if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        }
        return `${base_url}/upload/usuarios/no-image.jpg`;
    }

}