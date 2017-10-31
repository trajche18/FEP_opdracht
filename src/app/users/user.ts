export interface Roles {
    gebruiker: boolean;
    beheerder?: boolean;
}
export class User {
    email?:    string;
    photoURL?: string;
    voornaam?: string;
    achternaam?: string;
    studentnummer?: string;
    roles?:    Roles;

    constructor(authData) {
        this.email    = authData.email;
        this.photoURL = authData.photoURL;
        this.voornaam = authData.voornaam;
        this.achternaam = authData.achternaam;
        this.studentnummer = authData.studentnummer;
        this.roles    = { gebruiker: true }
    }
}