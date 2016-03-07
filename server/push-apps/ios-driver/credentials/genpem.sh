openssl pkcs12 -in PushDriver.p12 -out PushDriverCert.pem -clcerts -nokeys
openssl pkcs12 -in PushDriver.p12 -out PushDriverKey.pem -nocerts -nodes