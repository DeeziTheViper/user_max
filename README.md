# UserMax - React-django kickoff user system



This repository contains a user system app, made with Django on backend and react on the front end. A more advanced repo and step up to the previous react-django starter repo. and compilation of my other django and react projects made public and simplified into a full web app to help you kickstart any user system app with react and django.  The project contains a simple yet complex user system, where users can sign up, confirm email before proceeding. Each user has a dashboard, which they can fund through bitcoin. Integrated a bitcoin payment gateway with the help of blockchain and blockonomics api. users can fund their account, buy what ever service or product you're offering. once you confirm and approve the order, payment reflects on their dashboard.  

Comes with backend user authentication with the Django Rest Framework and rest-auth. The frontend has react-redux for state management.


## Backend development workflow
Comment out the referral OneToOneField for a succesfull initial migration, then uncomment and migrate again.
Backend is located in "max" folder
```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm start
```

## For deploying

```json
npm run build
```
