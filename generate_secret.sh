openssl genpkey -algorithm RSA -out rs256_private_key.pem              

openssl rsa -pubout -in rs256_private_key.pem -out rs256_public_key.pem

base64 -i rs256_private_key.pem -o priv_key.txt 

base64 -i rs256_public_key.pem -o pub_key.txt   
