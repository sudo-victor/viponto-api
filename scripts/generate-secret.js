const { execSync } = require('child_process')
const { readFile, writeFile, rm } = require('fs/promises')

async function execute() {
  const constants = {
    private_name: 'rs256_private_key.pem',
    public_name: 'rs256_public_key.pem'
  }

  execSync(`openssl genpkey -algorithm RSA -out ${constants.private_name}`)
  execSync(`openssl rsa -pubout -in ${constants.private_name} -out ${constants.public_name}`)

  const privateContent = await readFile(constants.private_name, { encoding: 'utf-8' })
  const publicContent = await readFile(constants.public_name, { encoding: 'utf-8' })

  const secret64 = btoa(privateContent)
  const pub64 = btoa(publicContent)

  const result = `JWT_PRIVATE_KEY="${secret64}"\nJWT_PUBLIC_KEY="${pub64}"`
  
  const previousEnvContent = await readFile('.env', { encoding: 'utf-8'})

  await writeFile('.env', previousEnvContent.concat(result))

  await rm(constants.private_name)
  await rm(constants.public_name)

}

execute()
