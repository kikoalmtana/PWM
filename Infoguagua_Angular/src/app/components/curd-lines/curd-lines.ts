import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { LinesService } from '../../services/lines';
import { CommonModule } from '@angular/common';
import { Linea, Sentido, TipoDia } from '../../models/lines.model';

@Component({
  selector: 'app-curd-lines',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './curd-lines.html',
  styleUrl: './curd-lines.css',
})

export class LinesComponent {
  private fb = inject(FormBuilder);
  private lineaService = inject(LinesService);

  tiposDias: TipoDia[] = ["Lunes a viernes", "Sábado, domingo y festivos", "Sábados", "Domingos y festívos"];
  sentidos: Sentido[] = ["ida", "vuelta"];

  public lineaForm = this.fb.group({
    numero: [null, [Validators.required]],
    primera_salida: ['', Validators.required],
    segunda_salida: ['', Validators.required],
    // Array de objetos de tipo Horario
    horariosArray: this.fb.array([]),
    paradas_ida: this.fb.array([this.fb.control('', Validators.required)])
  });

  get horarios() { return this.lineaForm.get('horariosArray') as FormArray; }
  get paradasIda() { return this.lineaForm.get('paradas_ida') as FormArray; }

  agregarHorario() {
    const horarioGroup = this.fb.group({
      sentido: ['ida', Validators.required],
      tipo_dia: ['Lunes a viernes', Validators.required],
      salidas: ['', Validators.required]
    });
    this.horarios.push(horarioGroup);
  }

  eliminarHorario(index: number) { this.horarios.removeAt(index); }

  agregarParada() { this.paradasIda.push(this.fb.control('', Validators.required)); }
  eliminarParada(index: number) { this.paradasIda.removeAt(index); }

  async guardar() {
    if (this.lineaForm.invalid) return;

    const formVal = this.lineaForm.value;

    const nuevaLinea: Linea = {
      numero: formVal.numero!,
      primera_salida: formVal.primera_salida!,
      segunda_salida: formVal.segunda_salida!,
      horarios: {
        horarios: (formVal.horariosArray as any[]).map(h => ({
          sentido: h.sentido,
          tipo_dia: h.tipo_dia,
          salidas: h.salidas.split(',').map((s: string) => s.trim())
        }))
      },
      paradas: {
        paradas: [
          { sentido: 'ida', lista_de_paradas: formVal.paradas_ida as string[] }
        ]
      }
    };

    await this.lineaService.addLinea(nuevaLinea);
    this.lineaForm.reset();
  }
}
