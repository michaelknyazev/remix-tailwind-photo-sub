frontend: 
	npm run dev \
	npx local-ssl-proxy --key ./localhost-key.pem --cert ./localhost.pem --source 3001 --target 3000