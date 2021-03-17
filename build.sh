


#! /bin/sh
rm -rf build
npm run-script build
scp -r build/ pillo@phrecipebook.org:/tmp
ssh -p 22 pillo@phrecipebook.org 'cd scripts && ./deploy.sh'
