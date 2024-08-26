import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuarios/login';

  constructor(private http: HttpClient) { }

  //Obtener el usuario actual desde localStorage
  getUsuarioActual(): Usuario | null {
    const usuarioStr = localStorage.getItem('usuario'); // Suponiendo que almacenas el usuario en localStorage
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  //metodo de login
  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map(response => {
        //Asumiendo que el backend devuelve el token y la informacion del usuario
        if (response.token) {
          this.setToken(response.token);
          this.setUsuario(response.usuario); //guardar la informacion del usuario
        }
        return response;
      })
    );
  }

  //guardar usuario en localStorage
  setUsuario(usuario: Usuario): void {
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

  //guardar token en localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  //obtener token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  //verificar si el usuario esta logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  //cerrar sesion
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
  }
}
