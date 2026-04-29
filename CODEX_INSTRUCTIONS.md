# Codex Instructions — NessOps

Tu stai lavorando al progetto NessOps — Ness Operations System.

## Cos'è NessOps

NessOps è il portale operativo interno di Ness. Non è solo un task manager, non è solo una intranet, non è solo un gestionale HR e non è solo un assistente AI. È una piattaforma modulare aziendale che centralizza attività operative, richieste, HR, documenti, comunicazioni, AI controllata, Case Memory, Fleet, Admin e futura integrazione GateHub.

Frase guida:
NessOps organizza i processi, non controlla le persone.

## Obiettivo attuale

In questa fase NON bisogna costruire tutto il sistema finale.

La priorità è sviluppare il primo MVP operativo:

- Home personale
- dashboard dipendente
- attività assegnate
- attività attiva
- stati attività
- start
- stand-by
- riprendi
- termina
- riepilogo ieri
- fine giornata
- dashboard capo BU base
- dati mock
- UI premium

## Cosa NON implementare ora

Non lavorare ancora su:

- database reale
- backend reale
- HR completo
- TimeStudio
- export consulente
- Fleet
- GateHub
- AI avanzata
- Case Memory completa
- autenticazione reale
- ruoli reali persistenti
- documenti reali
- report avanzati
- integrazione firewall/VPN

Queste idee vanno considerate parte della roadmap futura, non della fase attuale.

## Stack tecnico

Frontend:

- Next.js
- React
- TypeScript
- Tailwind CSS

UI:

- Tailwind CSS
- in futuro shadcn/ui

Backend futuro:

- NestJS oppure API Next.js iniziali

Database futuro:

- PostgreSQL

ORM futuro:

- Prisma

Auth futura:

- Microsoft Entra ID / SSO

AI futura:

- servizio separato
- prompt guidati
- Case Memory / RAG

## Struttura frontend attuale prevista

src/
├── app/
│ ├── layout.tsx
│ ├── globals.css
│ └── page.tsx
│
├── components/
│ └── dashboard/
│ ├── Sidebar.tsx
│ ├── TopBar.tsx
│ ├── HeaderHero.tsx
│ ├── SummaryCards.tsx
│ ├── ActiveTaskCard.tsx
│ ├── AiCard.tsx
│ ├── TasksList.tsx
│ └── StatusBadge.tsx
│
├── data/
│ └── mockDashboard.ts
│
└── types/
└── task.ts

Logo:
public/assets/logos/logo-ness.png

## Direzione UI/UX

NessOps deve sembrare un portale enterprise moderno, non un vecchio gestionale.

Stile:

- premium
- moderno
- glass UI
- dashboard pulita
- card morbide
- sidebar elegante
- sfondo deep navy
- colori Ness
- layout ordinato
- poco caos visivo

Colori principali:

- Blu Ness: #0166A4
- Verde Ness: #97B822
- Deep Navy: #061521
- Glass white: rgba(255,255,255,0.10)
- Border glass: rgba(255,255,255,0.15)
- Text white: #FFFFFF
- Text muted: rgba(255,255,255,0.60)

## Regole funzionali MVP

Le attività devono avere questi stati:

- Da fare
- In corso
- In stand-by
- Bloccata
- Completata
- Annullata

Le azioni principali sono:

- Inizia
- Stand-by
- Riprendi
- Termina

Lo stand-by deve richiedere:

- motivo
- nota
- eventuale attività bloccante

Motivi stand-by possibili:

- attesa cliente
- attesa amministrazione
- attesa collega
- attesa documenti
- attesa materiale
- problema tecnico
- attività dipendente da un'altra attività
- altro

## Regola Fine giornata

Il riepilogo di fine giornata si apre quando l'utente preme "Fine giornata".

Deve mostrare:

- attività completate
- attività ancora aperte
- attività in stand-by
- tempo effettivo
- tempo in stand-by
- tempo bloccato
- note finali
- conferma chiusura giornata

Regola importante:
nessuna attività dovrebbe rimanere "In corso" durante la notte senza decisione.

Se l'utente prova a chiudere la giornata con un'attività in corso, il sistema deve chiedere se:

- terminarla
- metterla in stand-by
- lasciarla da riprendere domani

## Regola anti-overload

Lavora una schermata alla volta, una funzione alla volta.

Ordine mentale:

1. Home
2. Operations
3. Fine giornata
4. Capo BU
5. HR
6. AI
7. Fleet
8. GateHub

Non anticipare moduli futuri se non servono alla feature richiesta.

## Come devi rispondere quando lavori sul codice

Prima di modificare file:

- leggi la struttura esistente
- capisci i componenti già presenti
- non riscrivere tutto se basta una modifica mirata
- mantieni TypeScript pulito
- mantieni componenti piccoli
- evita duplicazione
- usa dati mock nella fase attuale
- non introdurre librerie inutili
- non creare backend se non richiesto
- non cambiare lo stile generale premium/glass

Quando proponi modifiche:

- spiega brevemente cosa cambi
- modifica solo i file necessari
- segnala eventuali problemi o rischi
