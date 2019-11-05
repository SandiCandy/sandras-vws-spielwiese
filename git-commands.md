# Git Cheat Sheet v1

### aufbauend auf dem Cheat Sheet von Stefan Edlich

## Basics

### Initial

- **git init** Frisches Repo erstellen
- **git clone** Repo kopieren

### Daily Business

- **git pull** "Start in den Tag" (aktuellen Stand _pullen_)
- **git add** Dateien/Änderungen lokal zum Repo zufügen
- **git commit** Änderungen _committen_
- **git push** _Committete_ Änderungen ins Repo hochladen

### Infos

- **git status** Lokale Änderungen zeigen
- **git log** Historie
- **git diff** Änderungen (in bestimmten Files) anzeigen

- **gitk** Visuelles Tool

- **git rm** Dateien aus dem Index entfernen

### Advanced

- **git branch** alle Branches anzeigen
- **git branch new_branchname** neuen Branch erstellen
- **git checkout new_branchname** auf den Branch _new_branchname_ wechseln
- **git checkout -b new_branchname** neuen Branch erstellen und dorthin wechseln
- **git push origin new_branchname** Auf _new_branchname_ pushen

- **git tag** Alle Tags(Revisionen) anzeigen
- **git tag v0.1 -m "Sinnvoller Kommentar bitte"** neuen Tag erzeugen
- \**git push --tags" neuen Tag *pushen\* (analog zu commit & push)

### More Information

- **git --help** Hilfe aufrufen
