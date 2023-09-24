import { ESTADOS } from "./estados";
import { MUNICIPIOS } from "./municipios";
import { PARROQUIAS } from "./parroquias";
import { EST_MUN_PARR } from "./est_mun-parr";
import { Data } from "./data";
import { PAISES } from "./paises";

export class Ubicacion {
    private paises = PAISES;
    private estados = ESTADOS;
    private municipios = MUNICIPIOS;
    private parroquias = PARROQUIAS;
    private ubicaciones = EST_MUN_PARR;

    getPaises(): Data[]{
        return this.paises;
    }

    getEstados(): Data[] {
        return this.estados;
    }

    getMunicipios(estadoId: number): Data[] {
        let u: Data[] = this.ubicaciones.filter(e => Number(e.value) == estadoId);
        let m: Data[] = this.municipios.filter(e => u.findIndex(f => Number(f.value2) == e.id) >= 0);
        return m;
    }

    getParroquias(estadoId: number, municipioId: number) {
        let u: Data[] = this.ubicaciones.filter(e => Number(e.value) == estadoId && Number(e.value2) == municipioId);
        let p: Data[] = this.parroquias.filter(e => u.findIndex(f => Number(f.value3) == e.id) >= 0);
        return p;
    }

    getPais(paisId: number): Data {
        let indexP = this.paises.findIndex(e => e.id == paisId);
        let pais = {id: 0, value: '', value2: '', value3:''};

        if (indexP >= 0) {
            pais= this.paises[indexP];            
        }
        
        return pais;
    }

    getEstado(estadoId: number): Data {
        let indexE = this.estados.findIndex(e => e.id == estadoId);
        let estado = {id: 0, value: '', value2: '', value3:''};

        if (indexE >= 0) {
            estado = this.estados[indexE];            
        }
        
        return estado;
    }

    getMunicipio(municipioId: number): Data {
        let indexM = this.municipios.findIndex(e => e.id == municipioId);
        let municipio = {id: 0, value: '', value2: '', value3:''};

        if (indexM >= 0) {
            municipio = this.municipios[indexM];            
        }
        
        return municipio; 
    }

    getParroquia(parroquiaId: number): Data {
        let indexP = this.parroquias.findIndex(e => e.id == parroquiaId);
        let parroquias = {id: 0, value: '', value2: '', value3:''};

        if (indexP >= 0) {
            parroquias = this.parroquias[indexP];            
        }
        
        return parroquias; 
    }
}