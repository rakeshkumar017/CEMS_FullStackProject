export interface SignUp {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  department?: string;
  roll_number?: string;
}

export interface Event { 
  id: number; 
  title:string; 
  date:string; 
  description:string; 
  image:string; 
  host_email:string; 
  is_approved?:boolean;
}

export interface CreateEvent {
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface Registration { 
  id?:string; 
  eventId:string; 
  studentEmail:string; 
  studentName:string;
}