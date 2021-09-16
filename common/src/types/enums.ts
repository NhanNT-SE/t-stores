export enum Subjects {
  UserCreated = 'user:created',
}

export enum RoleAccount {
  SupperAdmin = 'supper-admin' as any,
  Admin = 'admin' as any,
  User = 'user' as any,
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