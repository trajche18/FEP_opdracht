# FEP Opdracht - Hardware Reservering systeem

## Installatie
- `git clone https://github.com/trajche18/FEP_opdracht.git fep-opdracht-groep-trajche`
- `cd fep-opdracht-groep-trajche`
- `npm install`

Voordat je het project runt, dien je environment files in  `src/environments/` te hebben. De onderstaande bestanden dien je aan te maken.

#### environment.ts
```typescript
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyBWC40IsmiLzDDawMbZK4kjKG9mkh5kJOE",
        authDomain: "hardware-lenen.firebaseapp.com",
        databaseURL: "https://hardware-lenen.firebaseio.com",
        projectId: "hardware-lenen",
        storageBucket: "hardware-lenen.appspot.com",
        messagingSenderId: "740504731528"
    }
};
```
#### environment.prod.ts
```typescript
export const environment = {
    production: true,
    firebaseConfig: {
        // Zelfde als boven of gebruik een andere firebase database om 
        // te testen
    }
};
```

Ten slotte, voor de commando `ng serve` uit

NOTE: Wat betreft de documentatie, de PDF versie van het testrapport komt raar uit te zien (en dat komt waarschijnlijk door de allignments- het FO heeft dit probleem niet). Dus vandaar dat we twee formaten, PDF en word, hebben gepushed.
