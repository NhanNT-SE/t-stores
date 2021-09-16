export enum Subjects {
  UserCreated = 'user:created',
}

/* Please declared in ascending order by role */
export enum RoleAccount {
  User = 'user',
  Admin = 'admin',
  SupperAdmin = 'supper-admin',
}

export enum AuthScope {
  Public = "scope:public",
  Private = "scope:private",
}

export enum UserPermission {
  User = "permission:user",
  Admin = "permission:admin",
  SupperAdmin = "permission:supper-admin",
}