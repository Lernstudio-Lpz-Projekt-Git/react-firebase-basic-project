# Einfaches React-TypeScript Firebase Projekt

## Installierte Node Versionen prüfen
Nach der Installtion sollten wir die Versionen von node, npm, and npx prüfen! Im ergebnis sollten folgende Versionen installiert sein:
NODE für den JavaScript-Code aus un dstellt einen Server bereit
```
node -v //v16.22.7
```
NPM - verwaltet Pakete, kann aber keine Pakete ausführen.
```
npm -v //6.14.15
```
NPX - ein Tool zum Ausführen von Node-Paketen.
```
npx -v //6.14.15
```

## Packages installieren & Projekt starten
Alle Projekt-Packages werden installiert und die Abhänigkeiten aufgelöst. Das Projekt ist startfähig.
```
npm install
```
Der Web-Server wird gestartet, alle Dateien werden kompiliert (TS,JS, SCSS), der Server wartet auf Änderungen.
```
npm run dev
``` 
Das Projekt wird in das `dist/` Verzeichnis kompiliert. Änderungen in den Quell-Dateien werden nicht im Browser sichtbar.
```
npm run build
``` 

# In Firebase Hosting bereitstellen

Sie können sie jetzt oder später bereitstellen. Öffnen Sie zum Bereitstellen ein Terminalfenster und rufen Sie dann Ihre Web-App auf oder erstellen Sie ein Stammverzeichnis dafür.

## In Google anmelden:
```
firebase login
```

## Ihr Projekt initiieren
Führen Sie diesen Befehl aus dem Stammverzeichnis der App aus:
```
firebase init
```

## Web-App bereitstellen, wenn Sie soweit sind
Legen Sie die statischen Dateien (z. B. HTML, CSS, JS) im Bereitstellungsverzeichnis Ihrer App ab (Standard ist "öffentlich"). Führen Sie anschließend diesen Befehl aus dem Stammverzeichnis der App aus:
```
firebase deploy
```

Nach der Bereitstellung können Sie Ihre App über fir-basic-project-89b65.web.app ansehen
Brauchen Sie Hilfe? In der Dokumentation zu Hosting finden Sie nützliche Informationen.