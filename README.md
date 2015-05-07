## Trailblazer

Trailblazer is a dynamic web-based character sheet built on AngularJS and Bootstrap.
Character data is stored permanently in the browser using HTML5 Local Storage.

Trailblaze is still in an early development phase.
It is not currently viable for daily use.

The feat and spell information is not distributed with this project, but fetched from d20pfsrd.com's database.
It must be downloaded and parsed before use by running make in the d20pfsrd directory.

#### Offline mode
Since the app does not communicate with any remote host, it can be used offline.
However, since most browsers block JavaScript from accessing files locally, the views have to be added as templates to index.html.
