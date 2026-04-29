NessOps - Riassunto completo del progetto
NessOps
Ness Operations System
Riassunto completo del progetto
Documento guida da tenere a portata di mano durante progettazione, sviluppo e confronto con titolare/IT.
Nome
NessOps - Ness Operations System
Scopo
Portale operativo interno modulare per attività, HR, AI, documenti e servizi aziendali.
Filosofia
Organizza i processi, non controlla le persone.
MVP iniziale
Home personale, Operations, attività, start/stand-by/riprendi/termina, fine giornata.
Direzione UI
Portale premium moderno con glass UI, Blu Ness #0166A4 e Verde Ness #97B822.
NessOps - Riassunto completo del progetto

1. Cos'e NessOps
   NessOps - Ness Operations System e pensato come il portale operativo interno di Ness. Non e solo un task manager, non e solo una intranet, non e solo un gestionale HR e non e solo un assistente AI. E una piattaforma modulare aziendale che centralizza in un unico punto le principali funzioni operative e organizzative dell'azienda.

attivita operative e richieste tra direzione, capi BU e dipendenti;

dashboard giornaliera personale;

tracciamento lavoro con start, stand-by, riprendi e termina;

riepilogo di fine giornata;

HR interno, documenti personali e comunicazioni;

AI controllata e memoria dei casi aziendali;

fleet manager e servizi aziendali;

integrazione con servizi comuni del Gate 236 tramite GateHub;

ruoli, permessi, audit e amministrazione sistema.
Frase madre:NessOps e il portale unico interno di Ness che organizza attivita, processi, richieste, HR, AI e servizi aziendali in base al ruolo di ogni utente. 2. Obiettivo principale
L'obiettivo e creare un sistema aziendale che permetta di sapere cosa deve fare ogni persona durante la giornata, assegnare attivita in modo ordinato, seguire l'avanzamento, distinguere il tempo effettivo di lavoro dai tempi di attesa e ridurre dispersione tra Planner, chat, email e file sparsi.

capire cosa e urgente e cosa e fermo;

capire perche un'attivita e in stand-by;

aiutare l'azienda a leggere i processi, non a giudicare le persone;

creare una memoria aziendale dei casi gia gestiti;

ridurre il carico cognitivo degli utenti;

centralizzare servizi interni oggi distribuiti su strumenti diversi.
Principio chiave:NessOps organizza i processi, non controlla le persone. 3. Cosa NON deve essere NessOps

non deve essere un software di controllo dipendenti;

non deve creare classifiche di produttivita;

non deve sostituire TimeStudio o la timbratura;

non deve calcolare paghe o sostituire la consulente del lavoro;

non deve diventare una chat aziendale generica;

non deve diventare un gestionale monolitico caotico;

non deve permettere caricamenti AI liberi e incontrollati di dati sensibili;

non deve decidere automaticamente ferie, approvazioni, paghe o valutazioni. 4. Filosofia progettuale
4.1 Modulare
NessOps deve essere costruito come un portale unico composto da moduli separati. Ogni modulo ha una responsabilita precisa, ma condivide utenti, permessi, notifiche, documenti, audit e UI comune.
NessOps├── Home personale
NessOps - Riassunto completo del progetto
├── Operations├── HR├── AI Assistant├── Case Memory├── Fleet├── Documenti├── Comunicazioni├── Admin└── Integrazione GateHub
4.2 Unico accesso
L'utente deve accedere una sola volta e vedere solo i servizi autorizzati in base ai propri ruoli.
Login NessOps↓Home personale↓Moduli disponibili in base ai ruoli
4.3 Ruoli multipli
Un utente puo avere piu ruoli contemporaneamente. Il ruolo non elimina la parte personale, ma aggiunge funzioni e dashboard gestionali.
Utente: LauraRuoli:- Dipendente- Capo BU- Fleet Manager
4.4 Area personale sempre presente

Le mie attivita

Le mie richieste HR

I miei documenti

Le mie notifiche

Le mie comunicazioni

Il mio riepilogo giornata 5. Struttura generale della piattaforma
NessOps Platform│├── Home personale├── Operations│ ├── richieste operative│ ├── attivita personali│ ├── dashboard capo BU│ ├── start / stand-by / riprendi / termina│ └── riepilogo giornata│├── HR│ ├── ferie, permessi, straordinari, malattia│ ├── fuori sede / sopralluoghi│ ├── documenti dipendente│ ├── import TimeStudio│ ├── controllo mensile│ └── export consulente│
NessOps - Riassunto completo del progetto
├── AI Assistant + Case Memory├── Fleet├── Documenti├── Comunicazioni├── Admin└── GateHub Integration 6. Home personale
La Home personale e la prima schermata dopo il login. Deve rispondere alla domanda: cosa devo sapere e fare oggi? Deve essere diversa in base al ruolo, ma ogni utente vede sempre una parte personale.
6.1 Home base per tutti

benvenuto;

riepilogo della giornata precedente;

attivita assegnate per oggi;

attivita attiva;

attivita in stand-by;

richieste HR personali;

comunicazioni da leggere;

documenti recenti;

promemoria, riunioni o sale prenotate;

accesso rapido all'AI;

pulsante Fine giornata.
Buongiorno MarcoRiepilogo ieri:- 5 attivita completate- 2 attivita rimaste aperte- 1 attivita ancora in stand-byOggi:- 3 attivita assegnate- 1 attivita in corso- 1 richiesta HR in attesa- 1 comunicazione da leggere
6.2 Riepilogo giornata precedente
In Home deve comparire un riepilogo breve del giorno prima, non il riepilogo completo della giornata in corso. Serve ad aiutare l'utente a riprendere il contesto.
6.3 Fine giornata
Il riepilogo completo viene generato solo quando l'utente preme Fine giornata. A quel punto si apre una schermata dedicata con attivita completate, attivita aperte, attivita in stand-by, tempo effettivo, tempo in stand-by, note finali e conferma chiusura giornata.
Regola importante: nessuna attivita dovrebbe rimanere In corso durante la notte senza decisione. Se l'utente prova a chiudere con un'attivita in corso, il sistema deve chiedere se terminarla, metterla in stand-by o lasciarla da riprendere domani.
NessOps - Riassunto completo del progetto 7. Ruoli principali
7.1 Dipendente

vede la propria Home e le proprie attivita;

inizia, mette in stand-by, riprende e termina attivita;

invia richieste HR personali;

vede documenti personali e comunicazioni;

usa l'AI autorizzata;

vede il riepilogo di fine giornata.
Non puo vedere attivita di altri, approvare richieste, accedere a documenti altrui, modificare configurazioni o vedere report globali.
7.2 Capo BU / Responsabile

ha funzioni personali piu funzioni di reparto;

vede richieste operative ricevute dalla direzione;

vede attivita del proprio reparto, stand-by e blocchi;

crea, assegna, riassegna e prioritizza attivita;

approva o rifiuta richieste HR dei sottoposti con motivazione;

monitora avanzamento e carico operativo.
7.3 Superiore / Direzione

crea richieste operative;

le assegna ai capi BU;

vede stato, avanzamento, blocchi e scadenze;

consulta report direzionali senza necessariamente entrare nel dettaglio minuto per minuto.
7.4 Amministrazione HR

approva o rifiuta definitivamente richieste HR;

gestisce pratiche malattia;

carica documenti dipendenti e comunicazioni;

importa dati da TimeStudio;

controlla presenze, assenze, permessi, malattie e straordinari;

inserisce rettifiche tracciate;

chiude il mese e genera export per consulente.
7.5 Fleet Manager

gestisce veicoli, prenotazioni auto, scadenze, manutenzioni, segnalazioni danni, storico utilizzi e dashboard fleet.
7.6 Admin

gestisce utenti, ruoli, reparti, permessi, causali, categorie, configurazioni AI, audit, integrazioni e impostazioni generali. 8. Operations
Operations e il cuore operativo iniziale. Gestisce richieste operative, attivita assegnate, attivita personali, dashboard capo BU, stati, tempo effettivo, stand-by, blocchi, dipendenze e riepilogo giornata.
8.1 Richieste operative
Le richieste operative sostituiscono il Planner tra superiori e capi BU. Una richiesta e una macro-attivita assegnata dalla direzione a un capo BU.
NessOps - Riassunto completo del progetto
Richiesta: Gestire pratica Cliente AlfaAssegnata a: Capo BU AmministrazionePriorita: AltaScadenza: 30/04/2026
8.2 Attivita operative
Le attivita operative sostituiscono il Planner operativo verso i dipendenti. Una richiesta puo generare una o piu attivita.
Richiesta: Gestire pratica Cliente Alfa├── Verifica documenti - Marco├── Contatto cliente - Giulia├── Inserimento dati - Luca└── Controllo finale - Sara
8.3 Flusso direzione - capo BU - dipendente
Direzione crea richiesta↓Capo BU riceve richiesta↓Capo BU crea attivita operative↓Capo BU assegna attivita ai dipendenti↓Dipendenti lavorano sulle attivita↓Il sistema aggiorna avanzamento richiesta
8.4 Stati attivita

Da fare

In corso

In stand-by

Bloccata

Completata

Annullata
8.5 Azioni attivita

Inizia

Stand-by

Riprendi

Termina
8.6 Stand-by
Lo stand-by serve quando il dipendente non puo proseguire. Deve richiedere motivo, nota ed eventuale attivita bloccante.

attesa cliente;

attesa amministrazione;

attesa collega;

attesa documenti;

attesa materiale;

problema tecnico;

attivita dipendente da un'altra attivita;

altro.
NessOps - Riassunto completo del progetto
8.7 Tempo effettivo e tempo di attesa
NessOps deve distinguere tempo effettivo di lavoro, tempo in stand-by, tempo bloccato e durata complessiva. Questo permette di stimare processi e costi senza trasformare la piattaforma in controllo personale.
Attivita: Preparare relazioneTempo lavoro effettivo: 2h 10mTempo stand-by: 1h 30mDurata complessiva: 3h 40m
8.8 Attivita personali per tutti i ruoli
Ogni utente puo avere attivita assegnate, anche se ha un ruolo gestionale. Il capo BU, l'amministrazione, il fleet manager e l'admin hanno sempre Le mie attivita, oltre alle dashboard gestionali. 9. Riepilogo di fine giornata
Il riepilogo di fine giornata si apre quando l'utente preme Fine giornata. Deve aiutare l'utente a chiudere correttamente il lavoro e riprendere il contesto il giorno successivo.
Attivita completate:- Verifica documenti Cliente Alfa - 1h 20m- Contatto cliente Beta - 35mAttivita ancora aperte:- Preparare relazione FV - In stand-by Motivo: attesa documentazione tecnicaTempo registrato:- Lavoro effettivo: 5h 40m- Stand-by: 1h 25m- Bloccato: 35mNote finali:[campo opzionale] 10. HR - Portale HR interno
Il modulo HR centralizza flussi tra dipendenti, responsabili e amministrazione. Non sostituisce TimeStudio, non sostituisce la timbratura, non calcola paghe e non sostituisce la consulente del lavoro.
10.1 Cosa gestisce

ferie;

permessi;

straordinari;

malattia;

fuori sede / sopralluogo;

mancata timbratura giustificata;

documenti dipendente;

comunicazioni HR;

storico richieste;

controllo mensile;

confronto con TimeStudio;

rettifiche tracciate;

export finale per consulente.
NessOps - Riassunto completo del progetto
10.2 Workflow richieste HR
Dipendente invia richiesta↓Responsabile riceve notifica↓Responsabile approva o rifiuta↓Se approva, passa ad amministrazione↓Amministrazione approva o rifiuta definitivamente↓Dipendente riceve esito
10.3 Malattia come pratica
La malattia non e una richiesta chiusa semplice. E una pratica aperta che puo essere aggiornata con certificato e prolungamenti.
Dipendente apre segnalazione malattia↓Carica certificato↓Aggiorna eventuale prolungamento↓Responsabile e amministrazione ricevono notifica↓Amministrazione valida↓Pratica viene chiusa
10.4 Fuori sede / sopralluogo
Serve per casi in cui il dipendente non timbra perche lavora fuori. Se manca la timbratura ma esiste un fuori sede approvato, il sistema non deve segnalare anomalia.

data;

giornata intera o fascia oraria;

luogo;

cliente;

commessa;

nota;

approvazione responsabile;

validazione amministrazione. 11. TimeStudio e controllo mensile
TimeStudio rimane la fonte ufficiale per le timbrature. NessOps HR importa i dati esportati da TimeStudio, li confronta con richieste approvate e giustificativi, evidenzia anomalie e aiuta amministrazione a validare il mese.
11.1 Lavorare per eccezioni

assenze senza giustificativo;

permessi non coerenti;

malattie senza certificato;

straordinari non approvati;

fuori sede non approvato;

mancate timbrature;

ore anomale;
NessOps - Riassunto completo del progetto

dati mancanti.
11.2 Modulo amministrativo mensile

ore da TimeStudio;

ferie;

permessi;

malattia;

straordinari;

fuori sede;

anomalie;

rettifiche;

note amministrative;

totale finale del mese;

stato validazione.
Stati mese:Da verificareCon anomalieVerificatoChiusoEsportato
11.3 Rettifiche tracciate
Il dato TimeStudio non deve mai essere sovrascritto silenziosamente. Ogni rettifica deve riportare dato originale, modifica, motivazione, utente, data e ora.
11.4 Export consulente
Amministrazione chiude il mese↓NessOps genera export finale↓Export viene inviato alla consulente↓Mese marcato come esportato 12. Documenti
Il modulo Documenti gestisce file legati a dipendenti, attivita, HR, certificati, comunicazioni, fleet, casi aziendali e allegati tecnici.
12.1 Documenti personali

buste paga;

comunicazioni personali;

documenti HR;

attestati;

certificati.
Regola: il dipendente vede solo i propri documenti. Il responsabile non deve vedere buste paga o documenti personali dei sottoposti salvo autorizzazioni specifiche.
12.2 Documenti operativi

relazioni;

file tecnici;

allegati attivita;

checklist;
NessOps - Riassunto completo del progetto

procedure;

documentazione cliente. 13. Comunicazioni
NessOps deve includere comunicazioni generali, per reparto, HR, personali e direzionali, con allegati, scadenza, conferma lettura, storico e notifiche.
Nuova comunicazione:Chiusura uffici venerdi 2 maggio[Leggi][Conferma lettura] 14. AI Assistant
L'AI e importante, ma deve essere controllata. Non deve essere una chat libera senza regole. Deve essere un assistente interno contestuale con prompt guidati e regole sui dati.
14.1 Cosa puo fare

scrivere email;

migliorare testi;

creare checklist;

generare note stand-by;

riassumere attivita;

creare riepiloghi;

spiegare procedure;

dividere richieste in attivita;

aiutare HR a leggere anomalie;

suggerire bozze operative;

cercare casi simili;

recuperare memoria aziendale autorizzata.
14.2 Cosa NON deve fare

approvare richieste;

modificare dati automaticamente;

calcolare paghe;

prendere decisioni ufficiali;

sostituire tecnici o amministrazione;

accedere a dati non autorizzati;

usare documenti riservati senza permessi.
Regola AI:L'AI aiuta, ma non decide. 15. Case Memory - Memoria operativa aziendale
L'idea non e che l'AI impari tutti i documenti per filo e per segno. L'idea e costruire una memoria dei casi aziendali gia gestiti, validati e riutilizzabili in futuro.
15.1 Concetto
Quando un dipendente lavora su una pratica, puo usare AI, caricare documenti, fare domande e produrre output. Alla fine NessOps puo trasformare l'esperienza in una scheda caso.
NessOps - Riassunto completo del progetto
Caso:Relazione impianto FV 1MW con strutture fisseCategoria: FotovoltaicoPotenza: 1MWVincoli: PaesaggisticiOutput: Relazione tecnicaSoluzione adottata: ...Criticita: ...Documenti collegati: ...
15.2 Esempio pratico
Se un dipendente ha creato una relazione per un impianto FV da 1MW con strutture fisse e vincoli, un altro dipendente che deve fare una relazione per un impianto da 1,5MW puo chiedere all'AI. L'AI cerca casi simili, trova quello validato e propone una struttura adattata al nuovo contesto.
15.3 Regole Case Memory
Attivita completata↓NessOps propone scheda caso↓AI genera sintesi↓Dipendente/responsabile controlla↓Caso viene validato↓AI puo usarlo in futuro

titolo;

categoria;

reparto;

autore;

attivita collegata;

documenti collegati;

note operative;

criticita;

soluzione adottata;

visibilita;

livello riservatezza;

stato validazione;

data aggiornamento;

fonte.
15.4 Permessi Case Memory
Regola fondamentale:L'AI puo usare solo le informazioni che l'utente avrebbe il permesso di vedere anche senza AI. 16. Fleet Manager
Il modulo Fleet gestisce le auto aziendali Ness: anagrafica veicoli, stato, disponibilita, prenotazioni, assegnazioni, assicurazione, bollo, revisione, tagliandi, manutenzioni, segnalazioni, chilometraggio, documenti veicolo e storico utilizzi.
NessOps - Riassunto completo del progetto
Dashboard Fleet:- 12 veicoli totali- 8 disponibili- 3 prenotati oggi- 1 in manutenzione- 2 scadenze entro 30 giorni- 1 segnalazione danno aperta
MVP Fleet: lista veicoli, stato veicolo, prenotazione auto, scadenze principali, segnalazioni e dashboard fleet manager. 17. GateHub e servizi Gate 236
I servizi comuni del Gate 236 non dovrebbero essere inglobati totalmente dentro NessOps. La soluzione migliore e separare NessOps, interno a Ness, da GateHub, piattaforma condivisa del Gate 236.
NessOps = sistema interno NessGateHub = piattaforma condivisa Gate 236
17.1 GateHub gestisce

prenotazione sale riunioni;

aule;

spazi comuni;

eventi;

calendario disponibilita;

aziende del Gate;

utenti multi-azienda;

permessi;

API.
17.2 Integrazione NessOps - GateHub
NessOps → API → GateHub
Dentro NessOps l'utente puo vedere: prenota sala, le mie prenotazioni, sale disponibili e riunioni collegate alle attivita. 18. Accesso, login e rete
L'idea del titolare e che l'utente acceda alla intranet prima di lavorare. NessOps da solo non puo bloccare internet o il computer: questa parte deve essere gestita da firewall, proxy, rete, VPN, captive portal, Microsoft Entra/Active Directory, Intune o policy IT.
18.1 In sede
In sede NessOps puo diventare il punto di ingresso operativo tramite rete, firewall, proxy o captive portal.
18.2 Fuori sede
Con VPN split tunnel non si controlla tutta la navigazione personale da casa, ma si controlla l'accesso alle risorse aziendali. Da remoto NessOps deve essere obbligatorio per accedere al lavoro aziendale tramite VPN.
Frase corretta:In sede NessOps puo essere il punto di ingresso operativo. Da remoto, NessOps e obbligatorio per accedere alle risorse aziendali tramite VPN, senza forzare tutto il traffico personale dentro la rete aziendale.
NessOps - Riassunto completo del progetto 19. Sicurezza e privacy
NessOps trattera dati sensibili: dipendenti, documenti HR, buste paga, certificati malattia, documenti clienti, NDA, dati operativi e informazioni tecniche. Servono regole forti.

accesso per ruolo;

permessi granulari;

audit log;

tracciabilita;

documenti protetti;

separazione dati HR/Operations/Fleet;

nessun accesso AI a dati non autorizzati;

nessuna modifica silenziosa;

backup;

validazione contenuti AI/Case Memory. 20. Audit e timeline
Ogni azione importante deve lasciare traccia: attivita creata, assegnata, iniziata, messa in stand-by, terminata, richieste HR, approvazioni, rifiuti, note, certificati, rettifiche, export, comunicazioni lette e casi AI validati.
Ogni evento deve avere:- chi- cosa- quando- perche/note- modulo- oggetto collegato 21. Stack tecnico scelto

Frontend: Next.js, React, TypeScript, Tailwind CSS

Backend futuro: NestJS oppure API Next.js iniziali

Database: PostgreSQL

ORM: Prisma

UI: Tailwind CSS e shadcn/ui in futuro

Auth: fase iniziale mock/login base; versione aziendale SSO Microsoft/Entra ID

Storage: server aziendale o object storage privato

AI: servizio separato; prompt guidati; in futuro RAG/Case Memory/AI interna o ibrida

Deployment: Docker, server aziendale o cloud privato 22. Struttura frontend attuale
src/├── app/│ ├── layout.tsx│ ├── globals.css│ └── page.tsx│├── components/│ └── dashboard/│ ├── Sidebar.tsx│ ├── TopBar.tsx│ ├── HeaderHero.tsx│ ├── SummaryCards.tsx
NessOps - Riassunto completo del progetto
│ ├── ActiveTaskCard.tsx│ ├── AiCard.tsx│ ├── TasksList.tsx│ └── StatusBadge.tsx│├── data/│ └── mockDashboard.ts│└── types/ └── task.ts
Asset logo: public/assets/logos/logo-ness.png 23. Direzione UI/UX
NessOps non deve sembrare un vecchio gestionale. Deve avere look premium, effetto glass, background deep navy, colori Ness, ombre morbide, card moderne, badge curati, UX pulita e sensazione da portale enterprise moderno.
23.1 Colori ufficiali Ness
Blu Ness: #0166A4Verde Ness: #97B822
23.2 Palette estesa
Deep Navy: #061521Blu Ness: #0166A4Verde Ness: #97B822Glass white: rgba(255,255,255,0.10)Border glass: rgba(255,255,255,0.15)Text white: #FFFFFFText muted: rgba(255,255,255,0.60) 24. MVP iniziale
Il primo MVP non deve contenere tutto. Deve contenere solo il cuore operativo.

login/mock utente;

Home personale;

dashboard dipendente;

attivita assegnate;

attivita attiva;

stati attivita;

start;

stand-by;

riprendi;

termina;

riepilogo ieri;

fine giornata;

dashboard capo BU base;

dati finti/mock;

UI premium.
24.1 Esclusi dal primo MVP

HR completo;

TimeStudio;
NessOps - Riassunto completo del progetto

export consulente;

Fleet;

GateHub;

AI avanzata;

Case Memory completa;

database;

autenticazione reale;

ruoli reali;

documenti;

report avanzati;

integrazione firewall/VPN. 25. Roadmap consigliata

Fase 0 - Documento e visione: definire visione, moduli, ruoli, MVP e flussi principali.

Fase 1 - UI base premium: Home personale, sidebar, topbar, card glass, task list, status badge, stile Ness.

Fase 2 - Interazioni Operations: Inizia, stand-by, modal stand-by, riprendi, termina, stato dinamico, fine giornata.

Fase 3 - Dati locali/mock evoluti: separare dati, definire types TypeScript, simulare utente, ruoli e attivita.

Fase 4 - Database: PostgreSQL, Prisma, utenti, task, time logs, stati e motivi stand-by.

Fase 5 - Login e ruoli: login reale, ruoli multipli, permessi, dashboard personalizzata.

Fase 6 - Dashboard capo BU: richieste operative, attivita reparto, attivita bloccate, assegnazione attivita.

Fase 7 - Fine giornata: riepilogo completo, controllo attivita in corso, storico giornaliero.

Fase 8 - AI Assistant base: prompt guidati, cerca casi simili mock, checklist, nota stand-by, log richieste AI.

Fase 9 - HR: ferie, permessi, malattia, fuori sede, workflow, documenti, TimeStudio, anomalie, export.

Fase 10 - Fleet: veicoli, prenotazioni, scadenze, segnalazioni.

Fase 11 - GateHub: piattaforma sale, booking, calendario, API e integrazione in NessOps. 26. Priorita attuale di sviluppo

stabilizzare UI Home;

componentizzare bene;

migliorare UX delle attivita;

aggiungere modal stand-by;

simulare cambio stato attivita;

creare schermata Fine giornata.
Non bisogna ancora lavorare su database, backend, HR, AI reale, TimeStudio, Fleet o GateHub. 27. Regola anti-overload
Il progetto va affrontato un modulo alla volta, una schermata alla volta, una funzione alla volta. Ogni nuova idea va parcheggiata nella specifica, non implementata subito.
Ordine mentale:Home↓Operations↓Fine giornata↓Capo BU↓HR
NessOps - Riassunto completo del progetto
↓AI↓Fleet↓GateHub 28. Frase finale da tenere come bussola
NessOps sara il sistema operativo interno di Ness: un portale modulare, moderno e intelligente che centralizza attivita, richieste, HR, documenti, AI e servizi aziendali, mostrando a ogni utente solo cio che gli serve per lavorare meglio.Prima costruiamo il cuore: Home personale, attivita, start/stand-by/termina e fine giornata. Poi aggiungiamo HR, AI, Fleet e GateHub.
