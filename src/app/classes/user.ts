export interface Roles {
    gebruiker: boolean;
    beheerder?: boolean;
}
export class User {
    email?:    string;
    photoURL?: string;
    roles?:    Roles;

    constructor(authData) {
        this.email    = authData.email
        this.photoURL = authData.photoURL
        this.roles    = { gebruiker: true }
    }
}