<h1 align="center">Moorse scheduler</h1>

<p align="center">Desenvolvido para facilitar sua forma de agendar notificações!</p>

<p align="center">
  <a href="#Sobre" target="_blank">Sobre</a> • 
  <a href="#Instalação" target="_blank">Instalação</a> • 
  <a href="#Configuração" target="_blank">Configuração</a> • 
  <a href="#Execução" target="_blank">Execução</a> • 
  <a href="#Utilização" target="_blank">Utilização</a>
</p>

# Sobre

O principal objetivo do Moorse scheduler é servir como uma agenda virtual possível de ser utilizada dentro do seu aplicativo do Whatsapp. Ao conversar com nosso Moorsebot, ele lhe permitirá criar, editar e excluir notificações a seu gosto, lhe permitindo escolher data e mensagem a ser enviada.

# Instalação

Para a devida instalação do Moorse scheduler é necessário que o usuário tenha instalado em sua máquina o interpretador javascript <a href="https://nodejs.org/en/" target="_blank">Node.js</a> bem como seu gerenciador de pacotes <a href="https://www.npmjs.com/" target="_blank">npm</a>, que servirão para a instalação de dependências e também à execução do código. Também, é de suma importância clonar este repositório do github em sua máquina.

Logo após obter, código, node e npm, abra o terminal e após estar dentro da pasta do repositório, execute o comando que instala todas as dependências do projeto:

```bash
$ npm install
```

Isso finaliza a etapa de instalação do Moorse Scheduler.

# Execução

## 1. Criando conta no site

Para que seja possível utilizar o Moorse scheduler, é, antes de tudo, necessário que o usuário tenha uma conta que pode ser facilmente criada no <a href="https://moorse.io/" target="_blanket">site da Moorse</a>.

Com esta conta, e após ter criado sua integração no site, o usuário deve obter seu <strong>token de autenticação</strong> e o <strong>id da integração</strong> criada do Whatsapp, que serão utilizados para funcionamento do programa.

## 2. Obtendo informações da conta

O <strong>token de autenticação</strong> pode ser obtido ao clicar no botão nomeado de <strong>copiar token de acesso</strong> do canto superior do <strong>dashboard</strong> do site.

<img alt="imagem botão token de acesso" src="images/token.png"></img>

Enquanto isso, o <strong>id da integração</strong> pode ser obtido por meio da página da sua integração, para copiar basta clicar no <i>clipe</i> nomeado de <strong>copiar id da integração</strong>.

<img alt="imagem botão token de acesso" src="images/integracao.png"></img>

## 3. Adicionando informações ao programa

Com o token e o id em mãos, basta apenas adicionarmos estes dados no programa, vá até o arquivo em `src/utils/constants.ts` e lá adicione ambos token e id da integração. Lembre-se de adicionar os dados com as aspas, para que o programa os reconheça como strings, também é possível trocar a porta da aplicação para alguma de sua preferência.

# Execução

Para que o programa funcione corretamente