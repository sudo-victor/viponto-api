# API Central PJ

### Requisitos Funcionais Alternativos:

1. **Registrar um Usuário**
   - **RF01** - Permitir o registro de um novo usuário na aplicação. O processo de registro deve incluir informações como nome, e-mail, senha e outras informações necessárias.
   
2. **Autenticar um Usuário**
   - **RF02** - Possibilitar a autenticação de um usuário na aplicação utilizando as credenciais fornecidas, como nome de usuário e senha.

3. **Registrar uma Companhia**
   - **RF03** - Permitir o registro de uma nova companhia na plataforma. A criação de uma companhia deve incluir informações como nome, endereço, informações de contato e outros detalhes relevantes.

4. **Registrar Colaboradores da Companhia**
   - **RF04** - Capacitar a companhia a registrar colaboradores associados a ela. Isso deve incluir informações como nome, e-mail, função e outros detalhes.

5. **Autenticação da Companhia**
   - **RF05** - Possibilitar a autenticação da companhia na aplicação utilizando as credenciais da companhia, como nome de usuário e senha.

6. **Criar um Workspace**
   - **RF06** - Oferecer a funcionalidade de criar um espaço de trabalho (workspace) dentro da companhia. Deve ser possível fornecer informações como nome, descrição e configurações específicas do workspace.

7. **Registrar Horários de Entrada/Saída no Workspace**
   - **RF07** - Permitir o registro de horários de entrada e saída dos colaboradores no workspace. Isso inclui o registro das horas de início e término de trabalho.

8. **Buscar Registros de Horários de Entrada/Saída de um Dia**
   - **RF08** - Capacitar a busca de todos os registros de horários de entrada/saída de um dia específico. Os usuários devem poder selecionar a data desejada para visualizar os registros.

9. **Listar Registros de Horários de Entrada/Saída por Dia com Paginação**
   - **RF09** - Apresentar os registros de horários de entrada/saída por dia com suporte a paginação de 5 dias. Isso permite aos usuários visualizar registros de vários dias com facilidade.

### Casos de Uso:

#### Caso de Uso 1: Registrar uma Companhia
- **Ator Principal:** Usuário Administrador
- **Fluxo Principal:**
  1. O usuário administrador acessa a funcionalidade de registro de companhia.
  2. O sistema exibe um formulário para preencher os detalhes da companhia.
  3. O usuário preenche os dados da companhia, como nome, endereço, e informações de contato.
  4. O sistema valida e registra a companhia no banco de dados.
  5. O sistema exibe uma mensagem de confirmação.

#### Caso de Uso 2: Autenticação da Companhia
- **Ator Principal:** Usuário da Companhia
- **Fluxo Principal:**
  1. O usuário da companhia acessa a página de autenticação.
  2. O usuário fornece suas credenciais, como nome de usuário e senha.
  3. O sistema verifica a autenticidade das credenciais.
  4. Se as credenciais são válidas, o usuário é autenticado com sucesso e direcionado para o painel principal.
  5. Se as credenciais são inválidas, o sistema exibe uma mensagem de erro.

#### Caso de Uso 3: Criar um Workspace
- **Ator Principal:** Usuário da Companhia
- **Fluxo Principal:**
  1. O usuário da companhia acessa a funcionalidade de criação de workspace.
  2. O sistema exibe um formulário para preencher os detalhes do workspace, como nome e descrição.
  3. O usuário preenche os dados do workspace.
  4. O sistema valida e cria o workspace no sistema.
  5. O sistema exibe uma mensagem de confirmação.

#### Caso de Uso 4: Registrar Horários de Entrada/Saída no Workspace
- **Ator Principal:** Usuário da Companhia
- **Fluxo Principal:**
  1. O usuário da companhia acessa a funcionalidade de registro de horários no workspace.
  2. O sistema exibe um formulário para registrar os horários de entrada e saída.
  3. O usuário preenche os horários de entrada e saída.
  4. O sistema registra os horários no sistema.
  5. O sistema exibe uma mensagem de confirmação.

#### Caso de Uso 5: Buscar Registros de Horários de Entrada/Saída de um Dia
- **Ator Principal:** Usuário da Companhia
- **Fluxo Principal:**
  1. O usuário da companhia acessa a funcionalidade de busca de registros de horários.
  2. O usuário especifica a data desejada para a busca.
  3. O sistema recupera todos os registros de horários de entrada/saída para a data especificada.
  4. O sistema exibe os registros ao usuário.

#### Caso de Uso 6: Listar Registros de Horários de Entrada/Saída por Dia com Paginação
- **Ator Principal:** Usuário da Companhia
- **Fluxo Principal:**
  1. O usuário da companhia acessa a funcionalidade de listagem de registros de horários.
  2. O sistema exibe os registros de horários de entrada/saída de um dia com suporte a paginação.
  3. O usuário pode navegar entre os registros de 5 em 5 dias.

#### Caso de Uso 7: Registrar um Usuário
- **Ator Principal:** Administrador do Sistema
- **Fluxo Principal:**
  1. O administrador do sistema acessa a funcionalidade de registro de usuário.
  2. O sistema exibe um formulário para preencher os detalhes do novo usuário, como nome, e-mail, senha, e outras informações necessárias.
  3. O administrador preenche os dados do novo usuário.
  4. O sistema valida os dados e cria o usuário no sistema.
  5. O sistema exibe uma mensagem de confirmação.