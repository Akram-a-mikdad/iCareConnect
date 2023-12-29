import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  Api,
  PrivilegeCreate,
  PrivilegeCreateFull,
  PrivilegeGetFull,
  RoleCreate,
  RoleCreateFull,
  RoleGetFull,
} from "../resources/openmrs";

@Injectable({
  providedIn: "root",
})
export class PrivilegesAndRolesService {
  constructor(private api: Api) {}

  getPrivileges(parameters: any): Observable<PrivilegeGetFull[]> {
    return this.api.privilege.getAllPrivileges(parameters).pipe(
      map((response) => response?.results),
      catchError((error) => of(error))
    );
  }

  deletePrivilege(id: string): Observable<any> {
    return this.api.privilege.deletePrivilege(id).pipe(
      catchError((error) => of(error))
    );
  }

  addNewPrivilege(privilege: PrivilegeCreate): Observable<PrivilegeCreateFull> {
    return this.api.privilege.createPrivilege(privilege).pipe(
      catchError((error) => of(error))
    );
  }

  getRoles(parameters: any): Observable<RoleGetFull[]> {
    return this.api.role.getAllRoles(parameters).pipe(
      map((response) => response?.results),
      catchError((error) => of(error))
    );
  }

  deleteRole(id: string): Observable<any> {
    return this.api.role.deleteRole(id).pipe(
      catchError((error) => of(error))
    );
  }

  addNewOrUpdateRole(role: RoleCreate): Observable<RoleCreateFull> {
    const request = role?.uuid
      ? this.api.role.updateRole(role?.uuid, role)
      : this.api.role.createRole(role);

    return from(request).pipe(
      catchError((error) => of(error))
    );
  }

  getRoleById(id: string): Observable<RoleGetFull> {
    return this.api.role.getRole(id, { v: "full" }).pipe(
      catchError((error) => of(error))
    );
  }
}
