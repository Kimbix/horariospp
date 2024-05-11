import * as SchemaInterfaces from "./Schema";
import { type TSession, type TSection } from "./Schema";

export class Session implements SchemaInterfaces.ISession {
  start: Date;
  end: Date;
  day: number;

  constructor(start: Date, end: Date, day?: number) {
    this.start = start;
    this.end = end;
    this.day = day || start.getDay();
  }

  getDay() {
    return this.start.getDay();
  }

  editDay(day: number) {
    let distance: number = day - this.start.getDay();
    this.start.setDate(this.start.getDate() + distance);
    this.end.setDate(this.end.getDate() + distance);
  }
  editStartHour(hour: number) {
    this.start.setHours(hour);
  }
  editStartMinute(minute: number) {
    this.start.setHours(minute);
  }

  editEndHour(hour: number) {
    this.end.setHours(hour);
  }
  editEndMinute(minute: number) {
    this.end.setHours(minute);
  }
  public saveSession(): TSession {
    // Convertir el objeto session1 a un formato que mongoose pueda entender
    return {
      start: this.start,
      end: this.end,
      day: this.day,
      // Añade aquí cualquier otro campo necesario
    };
  }
}
//#MARK: linkear a la Materia
export class Section {
  nrc: string;
  hours: Array<Session> = [];

  constructor(nrc: string, hours?: Array<Session>) {
    this.nrc = nrc;
    this.hours = hours || [];
  }

  addHour() {
    this.hours.push(new Session(new Date(0), new Date(1)));
  }

  removeHour(value: Session) {
    this.hours = this.hours.filter((hour) => hour !== value);
  }
}

export class Subject {
  name: String;
  pensumList: Array<string> = [];
  sections: Array<Section> = [];

  constructor(
    name: String,
    sections?: Array<Section>,
    pensums?: Array<string>
  ) {
    this.name = name;
    this.sections = sections || [];
    this.pensumList = pensums || [];
  }

  addEmptySection() {
    this.sections.push(new Section("Section " + (this.sections.length + 1)));
  }
  removeSection(value: Section) {
    this.sections = this.sections.filter((sec) => sec !== value);
  }
}
export class Schedule {
  protected _primitivo: boolean;
  protected _subjects: Array<Subject>;
  constructor(primitivo: boolean, subjects: Array<Subject>) {
    this._primitivo = primitivo;
    this._subjects = subjects;
  }

  public get primitivo(): boolean {
    return this._primitivo;
  }

  public set primitivo(v: boolean) {
    this._primitivo = v;
  }

  public get subjects(): Array<Subject> {
    return this._subjects;
  }

  /**
   * obtenerHorarios
   */
  public obtenerHorarios(subjects: Subject[]): Schedule[] {
    subjects.forEach((materia) => {
      console.log(materia);
    });
    return [
      new Schedule(true, new Array<Subject>()),
      new Schedule(true, new Array<Subject>()),
    ];
  }
}

function main() {
  /*const horas = new Array<[Date, Date]>();
  const mateA1: Seccion = new Seccion("n321", horas);
  const inicio = new Date(0);
  const fin = new Date(inicio.getTime() + 1000 * 60 * 60 * 2);
  mateA1.horas.push([inicio, fin]);
  const secciones = new Map<string, Seccion>();
  secciones.set("Matamathics", mateA1);
  const matematicaBasica: Materia = new Materia(secciones, "Matematica Basica");
  const subjects = new Map<string, Materia | string>();
  subjects.set("Matematica Basica", matematicaBasica);
  const horario = new Schedule(false, subjects);
  horario.primitivo = true;
  console.log(horario);
  for (let index = 0; index < 10; index++) {
    console.log("espacio\n");
  }
  console.log(Bun.inspect(horario));

  console.info(Bun.nanoseconds() / 1000000);*/
}
main();
