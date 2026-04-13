import { Component } from '@angular/core';
import { PreviewNew } from '../../components/preview-new/preview-new'
import { NgFor } from '@angular/common';
import { Heading } from '../../components/heading/heading';
import {PrincipalNew} from '../../components/principal-new/principal-new';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PreviewNew, NgFor, Heading, PrincipalNew],
  templateUrl: './news.html',
  styleUrl: './news.css',
})

export class News {

  noticiaPrincipal = {
    link: '',
    portada: '',
    titulo: "Acuerdo entre Guaguas Municipales y el SUG evita la huelga de guaguas",
    descripcion: "Se alcanza un principio de acuerdo tras varios días de negociación."
  };

  noticias = [
    {
      link: '',
      portada: "/src/assets/noticias/noticia2.png",
      encabezado: "Guaguas Municipales cierra 2025 con un récord histórico de más de 56,5 millones de viajeros",
      descripcion: "Guaguas Municipales bate todos sus registros anteriores con un crecimiento del 60% respecto a 2022.",
    },
    {
      link: '',
      portada: "../img/noticias/noticia1.jpg",
      encabezado: "Guaguas Municipales incorpora 24 nuevos vehículos",
      descripcion: "La empresa suma 24 autobuses de 12 metros a su red bajo la campaña 'Siéntate como en casa'",
    },
    {
      link: '',
      portada: "../img/noticias/noticia1.jpg",
      encabezado: "Guaguas Municipales presenta su presupuesto para 2026 de 16,2 millones ",
      descripcion: "Se aprueba un ambicioso plan de inversiones que incluye la compra de 22 nuevos vehículos y el avance del proyecto MetroGuagua",
    },
    {
      link: '',
      portada: "../img/noticias/noticia1.jpg",
      encabezado: "Cinco nuevas líneas nocturnas para el Carnaval 2026 'Las Vegas'",
      descripcion: "La empresa municipal habilita un dispositivo especial con más de veinte vehículos y medio centenar de profesionales",
    }
  ];
}
