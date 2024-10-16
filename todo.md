# Register
## Registrera användare med t ex email och lösenord
### vad ingår?
1. skapa route för att visa ett registregingsformulär ( GET )
2. skapa route för att ta emot datan som klienten skickar ( POST )
   obs: det går att göra med GET också men är INTE bra
   Kolla så att din data kommer fram på något sätt.
3. Skapa json-fil för users och initiera med tom array
4. Skapa ett user-objekt och hasha lösenordet
```js
let user = {
    id:123,
    email:"lenny@lenny.com",
    password:"ölsadkfjösalfkdjaöslfdkjsaölfköja"
}
```
5. Hämta alla users och kolla så att den user du vill lägga till inte redan finns.
6. Om den inte finns vill vi nu lägga till users och göra en redirect till annan sida t ex /login

# Login
## Logga in en användare med hjälp av email och lösenord
### Vad ingår?
1. skapa route för att visa ett inloggningsformulär ( GET )
2. skapa route för att ta emot datan som klienten skickar ( POST )
   obs: det går att göra med GET också men är INTE bra
   Kolla så att din data kommer fram på något sätt.
3. Hämta alla users och sedan hitta den som försöker logga in.
Här kollar vi med hjälp av email-adressen

5. Om vi inte hittar någon avbryter vi och skickar ett fel till klienten.
6. Om användare finns går vi vidare och jämför lösenorden med varandra.
Observera att lösenordet som är sparat är hashat (krypterat) så ni måste här se till att ni jämför på rätt sätt. 