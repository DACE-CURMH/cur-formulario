import { Unidad } from "./unidad";

export const UNIDADES: Unidad[] = [
    { id: 1, codigo: 'IDEABOLI-00300-A', unidad: 'IDEARIO BOLIVARIANO (00300-A)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FISIOTERAPIA' },
    { id: 2, codigo: 'FISIAPLI-00300-A', unidad: 'FÍSICA APLICADA(00300-A)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FISIOTERAPIA' },
    { id: 6, codigo: 'QUIMAPLI-00300-A', unidad: 'QUÍMICA APLICADA (00300-A)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FISIOTERAPIA' },
    { id: 4, codigo: 'PENESTMA-00300-A', unidad: 'PENSAMIENTO ESTRATÉGICO MATEMÁTICO (00300-A)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FISIOTERAPIA' },
    { id: 5, codigo: 'INTRREHA-00500-A', unidad: 'INTRODUCCIÓN A AL REHABILITACIÓN (00500-A)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FISIOTERAPIA' },
    { id: 3, codigo: 'LECTCOMP-00500-A', unidad: 'LECTURA Y COMPRENSIÓN (00500-A)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FISIOTERAPIA' },
    { id: 7, codigo: 'PRNANUCI-00500-A', unidad: 'PROYECTO NACIONAL Y NUEVA CIUDADANÍA (00500-A)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FISIOTERAPIA' },

    { id: 11, codigo: 'IDEABOLI-00300-B', unidad: 'IDEARIO BOLIVARIANO (00300-B)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FONOAUDIOLOGÍA' },
    { id: 12, codigo: 'FISIAPLI-00300-B', unidad: 'FÍSICA APLICADA (00300-B)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FONOAUDIOLOGÍA' },
    { id: 13, codigo: 'QUIMAPLI-00300-B', unidad: 'QUÍMICA APLICADA (00300-B)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FONOAUDIOLOGÍA' },
    { id: 14, codigo: 'PENESTMA-00300-B', unidad: 'PENSAMIENTO ESTRATÉGICO MATEMÁTICO (00300-B)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FONOAUDIOLOGÍA' },
    { id: 15, codigo: 'INTRREHA-00500-B', unidad: 'INTRODUCCIÓN A AL REHABILITACIÓN (00500-B)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FONOAUDIOLOGÍA' },
    { id: 16, codigo: 'LECTCOMP-00500-B', unidad: 'LECTURA Y COMPRENSIÓN (00500-B)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FONOAUDIOLOGÍA' },
    { id: 17, codigo: 'PRNANUCI-00500-B', unidad: 'PROYECTO NACIONAL Y NUEVA CIUDADANÍA (00500-B)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'FONOAUDIOLOGÍA' },

    { id: 21, codigo: 'IDEABOLI-00300-C', unidad: 'IDEARIO BOLIVARIANO (00300-C)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'ÓRTESIS Y PRÓTESIS' },
    { id: 22, codigo: 'FISIAPLI-00300-C', unidad: 'FÍSICA APLICADA (00300-C)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'ÓRTESIS Y PRÓTESIS' },
    { id: 23, codigo: 'QUIMAPLI-00300-C', unidad: 'QUÍMICA APLICADA (00300-C)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'ÓRTESIS Y PRÓTESIS' },
    { id: 24, codigo: 'PENESTMA-00300-C', unidad: 'PENSAMIENTO ESTRATÉGICO MATEMÁTICO (00300-C)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'ÓRTESIS Y PRÓTESIS' },
    { id: 25, codigo: 'INTRREHA-00500-C', unidad: 'INTRODUCCIÓN A AL REHABILITACIÓN (00500-C)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'ÓRTESIS Y PRÓTESIS' },
    { id: 26, codigo: 'LECTCOMP-00500-C', unidad: 'LECTURA Y COMPRENSIÓN (00500-C)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'ÓRTESIS Y PRÓTESIS' },
    { id: 27, codigo: 'PRNANUCI-00500-C', unidad: 'PROYECTO NACIONAL Y NUEVA CIUDADANÍA (00500-C)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'ÓRTESIS Y PRÓTESIS' },
    
    { id: 31, codigo: 'IDEABOLI-00300-D', unidad: 'IDEARIO BOLIVARIANO (00300-D)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'TERAPIA OCUPACIONAL' },
    { id: 32, codigo: 'FISIAPLI-00300-D', unidad: 'FÍSICA APLICADA (00300-D)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'TERAPIA OCUPACIONAL' },
    { id: 33, codigo: 'QUIMAPLI-00300-D', unidad: 'QUÍMICA APLICADA (00300-D)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'TERAPIA OCUPACIONAL' },
    { id: 34, codigo: 'PENESTMA-00300-D', unidad: 'PENSAMIENTO ESTRATÉGICO MATEMÁTICO (00300-D)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'TERAPIA OCUPACIONAL' },
    { id: 35, codigo: 'INTRREHA-00500-D', unidad: 'INTRODUCCIÓN A AL REHABILITACIÓN (00500-D)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'TERAPIA OCUPACIONAL' },
    { id: 36, codigo: 'LECTCOMP-00500-D', unidad: 'LECTURA Y COMPRENSIÓN (00500-D)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'TERAPIA OCUPACIONAL' },
    { id: 37, codigo: 'PRNANUCI-00500-D', unidad: 'PROYECTO NACIONAL Y NUEVA CIUDADANÍA (00500-D)', unidadCredito: 0, trayecto: 'INICIAL', pnf: 'TERAPIA OCUPACIONAL' },
];