// doctor.model.ts
export interface User {
  userId: number;
  username: string;
  email: string;
  // otros campos que tu User pueda tener
}

export interface Specialty {
  specialtyId: number;
  name: string;
  description: string;
  // otros campos que tu Specialty pueda tener
}

export interface Doctor {
  doctorId: number;
  user: User;            // Cambiado de userId a un objeto User completo
  specialty: Specialty;   // Cambiado de specialtyId a un objeto Specialty completo
  licenseNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
