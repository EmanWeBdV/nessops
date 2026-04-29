# Roadmap NessOps

Questa roadmap serve a guidare lo sviluppo del progetto NessOps senza anticipare moduli futuri.

Regola principale:
sviluppare una schermata alla volta, una funzione alla volta.

---

## Stato attuale del progetto

NessOps è nella fase iniziale di prototipo frontend.

Per ora il progetto usa:

- Next.js
- React
- TypeScript
- Tailwind CSS
- dati mock
- componenti dashboard
- nessun backend reale
- nessun database reale
- nessuna autenticazione reale

L'obiettivo attuale è costruire il cuore operativo visivo e funzionale.

---

## MVP iniziale

Il primo MVP deve contenere:

- login mock o utente simulato
- Home personale
- dashboard dipendente
- riepilogo giornata precedente
- attività assegnate
- attività attiva
- attività in stand-by
- stati attività
- azione Inizia
- azione Stand-by
- azione Riprendi
- azione Termina
- schermata Fine giornata
- dashboard capo BU base
- dati mock
- UI premium/glass

---

## Escluso dal primo MVP

Non implementare ancora:

- backend reale
- database reale
- Prisma
- PostgreSQL
- NestJS
- login reale
- Microsoft Entra ID / SSO
- HR completo
- TimeStudio
- export consulente
- Fleet
- GateHub
- AI avanzata
- Case Memory completa
- upload documenti reali
- permessi reali persistenti
- report avanzati
- integrazione firewall/VPN

Questi moduli fanno parte della roadmap futura, ma non devono essere sviluppati ora.

---

## Fase 0 — Visione e contesto

Obiettivo:
definire bene cosa deve diventare NessOps.

Stato:
completata a livello concettuale.

Materiali di riferimento:

- CODEX_INSTRUCTIONS.md
- docs/nessops-summary.md
- docs/stack-tecnico.md
- docs/roadmap.md

---

## Fase 1 — UI base premium

Obiettivo:
costruire una Home personale moderna, ordinata e credibile.

Funzioni:

- layout principale
- sidebar
- topbar
- hero/header
- summary cards
- card attività attiva
- lista attività
- card AI
- status badge
- stile premium/glass
- colori Ness

File principali:

- src/app/page.tsx
- src/components/dashboard/Sidebar.tsx
- src/components/dashboard/TopBar.tsx
- src/components/dashboard/HeaderHero.tsx
- src/components/dashboard/SummaryCards.tsx
- src/components/dashboard/ActiveTaskCard.tsx
- src/components/dashboard/AiCard.tsx
- src/components/dashboard/TasksList.tsx
- src/components/dashboard/StatusBadge.tsx
- src/data/mockDashboard.ts
- src/types/task.ts

Criteri di completamento:

- la Home è leggibile
- il layout è responsive almeno a livello base
- lo stile è coerente con Ness
- i dati sono separati dai componenti
- non ci sono errori TypeScript
- non ci sono errori di hydration

---

## Fase 2 — Interazioni Operations

Obiettivo:
rendere le attività interattive usando dati mock locali.

Funzioni:

- Inizia attività
- Termina attività
- Riprendi attività
- Stand-by attività
- cambio stato dinamico
- attività attiva aggiornata
- lista attività aggiornata
- gestione semplice dei timer mock

Stati attività:

- Da fare
- In corso
- In stand-by
- Bloccata
- Completata
- Annullata

Regole:

- una sola attività dovrebbe essere "In corso" alla volta
- se un'attività viene iniziata, passa a "In corso"
- se un'attività viene messa in stand-by, passa a "In stand-by"
- se un'attività viene ripresa, passa a "In corso"
- se un'attività viene terminata, passa a "Completata"

Criteri di completamento:

- i pulsanti modificano lo stato attività
- il cambio stato è visibile nella UI
- l'attività attiva cambia correttamente
- i dati restano mock/locali
- non viene introdotto backend

---

## Fase 3 — Modal Stand-by

Obiettivo:
gestire correttamente il motivo dello stand-by.

La modal deve chiedere:

- motivo stand-by
- nota opzionale
- eventuale attività bloccante opzionale

Motivi disponibili:

- attesa cliente
- attesa amministrazione
- attesa collega
- attesa documenti
- attesa materiale
- problema tecnico
- attività dipendente da un'altra attività
- altro

Comportamento:

- l'utente clicca "Stand-by"
- si apre una modal
- l'utente seleziona un motivo
- l'utente può scrivere una nota
- conferma
- l'attività passa a "In stand-by"
- la nota viene salvata nei dati mock/locali
- la UI mostra il motivo dello stand-by

Criteri di completamento:

- modal funzionante
- nessun backend
- dati aggiornati localmente
- TypeScript pulito
- UI coerente con il resto della dashboard

---

## Fase 4 — Fine giornata

Obiettivo:
creare una schermata o modal di chiusura giornata.

La Fine giornata deve mostrare:

- attività completate oggi
- attività ancora aperte
- attività in stand-by
- eventuale attività ancora in corso
- tempo effettivo mock
- tempo stand-by mock
- tempo bloccato mock
- note finali
- conferma chiusura giornata

Regola importante:

nessuna attività dovrebbe rimanere "In corso" durante la notte senza decisione.

Se esiste un'attività "In corso", il sistema deve chiedere se:

- terminarla
- metterla in stand-by
- lasciarla da riprendere domani

Criteri di completamento:

- pulsante "Fine giornata" visibile
- riepilogo corretto
- gestione attività ancora in corso
- note finali
- conferma chiusura giornata
- dati mock/locali

---

## Fase 5 — Dati mock evoluti

Obiettivo:
rendere i dati finti più realistici e ordinati.

Da migliorare:

- mock utente
- mock ruoli
- mock attività
- mock riepilogo ieri
- mock comunicazioni
- mock richieste HR leggere
- mock tempi attività
- mock motivi stand-by

Possibili file:

- src/data/mockDashboard.ts
- src/data/mockTasks.ts
- src/data/mockUser.ts
- src/types/task.ts
- src/types/user.ts

Criteri di completamento:

- dati separati e leggibili
- tipi TypeScript chiari
- nessuna logica importante hardcoded nei componenti
- facile aggiungere ruoli futuri

---

## Fase 6 — Dashboard Capo BU base

Obiettivo:
aggiungere una prima vista gestionale semplice per un responsabile.

Funzioni:

- riepilogo reparto
- attività reparto
- attività bloccate
- attività in stand-by
- richieste operative ricevute
- assegnazione mock attività
- priorità e scadenze mock

Regole:

- il Capo BU mantiene sempre anche la propria area personale
- il ruolo aggiunge funzioni, non sostituisce la Home personale

Criteri di completamento:

- vista base Capo BU
- dati mock
- nessun sistema permessi reale
- nessun backend

---

## Fase 7 — Preparazione database futuro

Obiettivo:
solo progettare lo schema, non implementarlo subito.

Entità probabili:

- User
- Role
- Department
- Task
- TaskStatus
- TaskTimeLog
- StandByReason
- OperationalRequest
- DailySummary
- AuditLog

Nota:
questa fase non va iniziata finché Home, Operations, Stand-by e Fine giornata non sono stabili.

---

## Fase 8 — Backend futuro

Obiettivo:
introdurre backend solo quando il prototipo frontend è stabile.

Stack previsto:

- NestJS
- TypeScript
- PostgreSQL
- Prisma

Moduli backend futuri:

- auth
- users
- roles
- operations
- hr
- fleet
- documents
- notifications
- ai
- audit
- admin

Nota:
non creare backend durante le prime fasi frontend.

---

## Fase 9 — AI Assistant base

Obiettivo:
creare un assistente AI controllato, non una chat libera.

Funzioni future:

- scrittura email
- miglioramento testi
- checklist
- note stand-by
- riepiloghi attività
- divisione richieste in attività
- ricerca casi simili mock
- Case Memory futura

Regola:
l'AI aiuta, ma non decide.

---

## Fase 10 — HR

Obiettivo:
aggiungere il portale HR interno.

Funzioni future:

- ferie
- permessi
- straordinari
- malattia
- fuori sede
- mancata timbratura giustificata
- documenti dipendente
- comunicazioni HR
- controllo mensile
- confronto con TimeStudio
- export consulente

Nota:
HR non sostituisce TimeStudio, la timbratura, la consulente del lavoro o il calcolo paghe.

---

## Fase 11 — Fleet

Obiettivo:
gestire le auto aziendali.

Funzioni future:

- lista veicoli
- stato veicolo
- prenotazioni
- assegnazioni
- scadenze
- manutenzioni
- segnalazioni danni
- chilometraggio
- documenti veicolo
- dashboard Fleet Manager

---

## Fase 12 — GateHub

Obiettivo:
integrare servizi condivisi del Gate 236 senza inglobarli totalmente in NessOps.

Regola:

- NessOps = sistema interno Ness
- GateHub = piattaforma condivisa Gate 236

Funzioni future GateHub:

- prenotazione sale
- aule
- spazi comuni
- eventi
- calendario disponibilità
- aziende del Gate
- utenti multi-azienda
- API

---

## Fase 13 — Sicurezza, audit e permessi

Obiettivo:
rendere il sistema adatto a un contesto aziendale reale.

Funzioni future:

- ruoli reali
- permessi granulari
- audit log
- tracciabilità azioni
- documenti protetti
- separazione HR/Operations/Fleet
- controllo accesso AI
- backup
- validazione Case Memory

Audit minimo:

ogni evento importante deve salvare:

- chi
- cosa
- quando
- perché/note
- modulo
- oggetto collegato

---

## Priorità immediata

In questo momento bisogna lavorare su:

1. stabilizzare Home
2. componentizzare bene
3. migliorare UX attività
4. aggiungere modal Stand-by
5. simulare cambio stato attività
6. creare schermata Fine giornata

Non lavorare ancora su backend, database, HR, AI reale, TimeStudio, Fleet o GateHub.

---

## Prompt consigliato per Codex

Quando si inizia una sessione Codex, usare questo prompt:

```txt
Leggi CODEX_INSTRUCTIONS.md, docs/nessops-summary.md, docs/stack-tecnico.md e docs/roadmap.md.

Poi analizza src/app/page.tsx, src/data/mockDashboard.ts, src/types/task.ts e i componenti in src/components/dashboard.

Considera questi file come contesto principale del progetto NessOps.

Non implementare backend, database, HR, AI reale, Fleet o GateHub.

Lavoriamo solo su Home, Operations, attività mock, stand-by e Fine giornata.

Prima dimmi quali file modificheresti e perché. Poi procedi con modifiche mirate.
```
