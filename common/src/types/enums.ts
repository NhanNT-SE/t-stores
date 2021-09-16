export enum Subjects {
  UserCreated = 'user:created',
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

/** @important Please declared enum value in ascending order by role (eg: user < admin < supper-admin) */
export enum RoleAccount {
  User = 'user',
  Admin = 'admin',
  SupperAdmin = 'supper-admin',
}