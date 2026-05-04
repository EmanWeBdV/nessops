# Stack tecnico NessOps

Frontend:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui in futuro

Backend futuro:

- NestJS
- TypeScript

Database futuro:

- PostgreSQL

ORM:

- Prisma

Auth:

- MVP: login mock/base
- Finale: Microsoft Entra ID / SSO

Microsoft 365:

- integrazione futura con Microsoft Graph
- calendario utente tramite Outlook/Teams
- eventi Home tramite Graph Calendar API
- permesso minimo preferito: Calendars.ReadBasic
- usare Calendars.Read solo se servono dettagli completi degli eventi

Storage:

- server aziendale o object storage privato

AI:

- servizio separato
- prompt guidati
- RAG + Case Memory in futuro

Deployment:

- Docker
- server aziendale o cloud privato

Regola:
per ora si lavora solo su frontend, dati mock, Home e Operations.
La card Agenda in Home può essere prototipata con dati mock prima dell'integrazione reale Microsoft Graph.
