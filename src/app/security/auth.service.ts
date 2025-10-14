import { Injectable } from '@angular/core';
import { AssignRoleDto, ChangePasswordDto, LoginRequestDto, LoginResponseDto, RegistrationRequestDto, ResponseDto, UserDto, UserRolesDto, UsersDto, UserUpdateDto } from './security.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing users and roles and authentication 
 * This service communicates with a Backend API
 */
export class AuthService {
  
  url = environment.apiUrl_LoginManagement;

  constructor(private http: HttpClient) { }

  /**
   * Check if the user is logged in 
  */  
  isLoggedIn() : boolean {
    if (this.getToken())
      return true;
    return false;
  }

  /**
   * Create a new user by sending a POST request to the API
  */  
  register(dto: RegistrationRequestDto) : Observable<any> {
    return this.http.post<any>(`${this.url}/register`, dto);
  }

  /**
   * authenticate user by sending a POST request to the API
  */   
  login(dto: LoginRequestDto) : Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.url}/login`, dto);
  }

  /**
   * Fetch users by paging info from the API
  */   
  getUsers(page: number, pageSize: number){
    return this.http.get<UsersDto>(`${this.url}/users?page=${page}&pagesize=${pageSize}`);
  }

  /**
   * Save token obtained from API to localstorage
  */
  saveToken(dto: LoginResponseDto) {
    if (dto.token){
      localStorage.setItem("token", dto.token);
    }
  }

  /**
   * Get token from localstorage
  */  
  getToken(){
    return localStorage.getItem("token");
  }

  /**
   * Logging out user by removing token from localstorage
  */  
  logout(){
    localStorage.removeItem("token");
  }

  /**
   * Extract field from token by its name
  */    
  getFieldFromJWT(field: string) {
    const token = localStorage.getItem("token");
    if (!token){return '';}
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  /**
   * Extract list of roles from token
  */    
  getRolesFromToken() : string[] {
    let roles = this.getFieldFromJWT("role");
    if (roles)
    {
      if (typeof roles === "string")
        return [roles];
      if (Array.isArray(roles)){
        return roles;
      }
    }

    return [];
  }

  /**
   * Extract user name from token
  */ 
  getUserNameFromToken(){
    return this.getFieldFromJWT("email");
  }

  /**
   * Check if current user is a member of provided role
  */   
  isInRole(role: string) : boolean{
    let roles = this.getRolesFromToken();
    if (roles.indexOf(role) != -1)
      return true;

    return false;
  }

  /**
   * Fetch all roles from the API
  */    
  getRoles() : Observable<string[]>{
    return this.http.get<string[]>(`${this.url}/roles`);
  }

  /**
   * Fetch user roles from the API
  */  
  getUserRoles(email: string) : Observable<UserRolesDto>{
    return this.http.get<UserRolesDto>(`${this.url}/userroles/${email}`);
  }

  /**
   * Add user to role
  */    
  assignRole(dto: AssignRoleDto) : Observable<any> {
    return this.http.post<any>(`${this.url}/assignrole`, dto);
  }

  /**
   * Remove user from role
  */  
  removeAssignedRole(dto: AssignRoleDto) : Observable<any> {
    return this.http.post<any>(`${this.url}/removeassignedrole`, dto);
  }

  /**
   * Fetch user by its email from the API
  */  
  getUserByEmail(email: string) : Observable<UserDto>{
    return this.http.get<UserDto>(`${this.url}/user/${email}`);
  }

  /**
   * Change user password
  */   
  changePassword(dto: ChangePasswordDto) : Observable<any> {
    return this.http.post<any>(`${this.url}/changepassword`, dto);
  }

  /**
   * Update user info by sending PUT request to the API
  */   
  updateUser(email: string, dto: UserUpdateDto) : Observable<any> {
    return this.http.put<any>(`${this.url}/update/${email}`, dto);
  }

}
