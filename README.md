# Personnal Traveller Checklist

This is a repo for an Ionic app student project.

**Members:** Cédric NGUYEN DUC Silvestre PERRET

**Client:** Amadeus

**Purpose:** help the user to prepare his trip with an automated and customed todo list

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* You'll have to install Ionic 3 and its dependencies. Installation steps [here](https://ionicframework.com/docs/intro/installation/).
* This app is paired with a [Django Web serveur](https://github.com/Silverret/ptc_api_2018). Make sure you installed it and run it before launching the app.

### Installing the app

1-  Create a new blank Ionic project. Make sure you used the right name:

```bash
ionic start Personnal-Traveler-Checklist-2018 blank
```
Answer no to "Would you like to integrate your new app with Cordova to target native iOS and Android?"

2 - Go into the project you just created:
```bash
cd Personnal-Traveler-Checklist-2018/
```

3 - Initialize git repository:
```bash
git init
git remote add origin https://github.com/cedricngd/Personnal-Traveler-Checklist-2018
```

4 - Get the app source code and merge using the "remote-is-right" strategy :

```bash
git add . 
git commit -m "Any message you want"
git fetch --all
git merge --strategy-option theirs origin/master --allow-unrelated-histories
```

5 - This app uses the [calendar](https://github.com/twinssbc/Ionic2-Calendar) from twinssbc. To make it work on the app, you'll need to install a few things:
```bash
npm install ionic2-calendar --save
npm install moment --save
npm install intl@1.2.5 --save
```

6 - And finally, run the app on your browser !
```bash
ionic serve --lab
```


## Ionic and system info:

    @ionic/cli-utils  : 1.19.2
    ionic (Ionic CLI) : 3.20.0

local packages:

    @ionic/app-scripts : 3.1.8
    Ionic Framework    : ionic-angular 3.9.2

System:

    Node : v6.11.4
    npm  : 3.10.10
    OS   : Windows 10

Misc:

    backend : pro
