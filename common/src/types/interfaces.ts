import { Subjects } from '.';

export interface CurrentUser {
  id: string;
  role: string;
  tokenVersion?:number
}

export interface Event {
  subject: Subjects;
  data: any;
}

export interface ResponseDto {
  data: any;
  status?: number;
  message?: string;
}

export interface SecretEncrypt {
  iv: string;
  content: string;
}
