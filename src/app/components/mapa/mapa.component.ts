import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../classes/marcador.class';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {

    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }

  }

  ngOnInit() {
  }

  agregarMarcador(evento) {

    const coords: {lat: number, lng:number} = evento.coords;

    const nuevoMarcador = new Marcador( coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador) 
    // console.log(evento.coords.lat)

    this.guardarStorage();

    this.snackBar.open('Marcador agregado', 'cerrar',{duration: 3000});

  }

  borrarMarcador(i:number){
      // console.log(i);
      this.marcadores.splice(i,1);
      this.guardarStorage();
      this.snackBar.open('Marcador Borrado', 'cerrar',{duration: 3000});
      
  }

  editarMarcador(marcador: Marcador){

    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (!result){
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc

      this.guardarStorage();

      this.snackBar.open('Marcador Actualizado', 'cerrar',{duration: 3000});
      
    });

  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
}
