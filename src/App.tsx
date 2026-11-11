
import './App.css'

function App() {
  return (
    <div className="nexoora">

      {/* CABEÇALHO */}
      <header>
        <h1>NEXOORA</h1>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      {/* PÁGINA INICIAL */}
      <main id="inicio">
        <section>
          <p>Soluções digitais para o seu negócio</p>

          <h2>
            Conectamos ideias a grandes possibilidades.
          </h2>

          <p>
            Tecnologia, inovação e soluções inteligentes
            para transformar a maneira como você faz negócios.
          </p>

          <a href="#servicos">
            Conheça nossas soluções
          </a>
        </section>
      </main>

      {/* SERVIÇOS */}
      <section id="servicos" className="servicos">
        <div className="servicos-container">
          <p className="secao-etiqueta">O QUE FAZEMOS</p>

          <h2>Soluções pensadas para o seu negócio.</h2>

          <p className="servicos-descricao">
            Desenvolvemos experiências digitais que unem
            tecnologia, simplicidade e resultados.
          </p>

          <div className="servicos-grid">
            <article className="servico-card">
              <div className="servico-icone">01</div>
              <h3>Desenvolvimento Web</h3>
              <p>
                Criamos sites, landing pages e plataformas
                modernas para fortalecer sua presença digital.
              </p>
            </article>

            <article className="servico-card">
              <div className="servico-icone">02</div>
              <h3>Sistemas Personalizados</h3>
              <p>
                Desenvolvemos sistemas sob medida para
                gestão, reservas e atendimento.
              </p>
            </article>

            <article className="servico-card">
              <div className="servico-icone">03</div>
              <h3>Automação de Processos</h3>
              <p>
                Automatizamos tarefas e processos para
                tornar sua operação mais eficiente.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section id="sobre" className="sobre">
        <div className="sobre-container">

          <div className="sobre-conteudo">
            <p className="secao-etiqueta">QUEM SOMOS</p>

            <h2>
              Tecnologia que aproxima.
              Soluções que transformam.
            </h2>

            <p>
              A Nexoora nasceu com o propósito de tornar
              a tecnologia mais acessível, prática e eficiente
              para empresas e empreendedores.
            </p>

            <p>
              Acreditamos que cada negócio possui desafios
              únicos. Por isso, desenvolvemos soluções
              digitais personalizadas, combinando inovação,
              simplicidade e atenção aos detalhes.
            </p>

            <a href="#contato" className="sobre-botao">
              Converse com a Nexoora
            </a>
          </div>

          <div className="sobre-diferenciais">
            <article>
              <span>01 /</span>
              <h3>Soluções sob medida</h3>
              <p>
                Tecnologia adaptada às necessidades
                de cada negócio.
              </p>
            </article>

            <article>
              <span>02 /</span>
              <h3>Experiência intuitiva</h3>
              <p>
                Produtos digitais simples, modernos
                e fáceis de utilizar.
              </p>
            </article>

            <article>
              <span>03 /</span>
              <h3>Compromisso com resultados</h3>
              <p>
                Desenvolvimento orientado a resolver
                problemas reais.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="contato">
        <div className="contato-container">

          <div className="contato-info">
            <p className="secao-etiqueta">FALE CONOSCO</p>

            <h2>
              Vamos transformar sua ideia em realidade?
            </h2>

            <p>
              Conte um pouco sobre o seu projeto.
              Estamos prontos para entender suas necessidades
              e encontrar a solução ideal para o seu negócio.
            </p>

            <div className="contato-detalhe">
              <span>ATENDIMENTO PERSONALIZADO</span>
              <p>
                Seu projeto merece atenção desde
                o primeiro contato.
              </p>
            </div>
          </div>

          {/* FORMULÁRIO DE ORÇAMENTO */}
          <form
            className="contato-formulario"
            onSubmit={async (event) => {
              event.preventDefault()

              const formulario = event.currentTarget
              const dados = new FormData(formulario)

              const solicitacao = {
                nome: String(dados.get('nome') ?? '').trim(),
                email: String(dados.get('email') ?? '').trim(),
                servico: String(dados.get('servico') ?? ''),
                mensagem: String(dados.get('mensagem') ?? '').trim()
              }

              if (
                !solicitacao.nome ||
                !solicitacao.email ||
                !solicitacao.servico ||
                !solicitacao.mensagem
              ) {
                alert('Preencha todos os campos.')
                return
              }


try {
  const resposta = await fetch(
    'http://localhost:3001/api/orcamentos',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(solicitacao)
    }
  )

  const resultado = await resposta.json()

  if (!resposta.ok) {
    throw new Error(
      resultado.mensagem || 'Erro ao enviar solicitação.'
    )
  }


alert(
  `Orçamento enviado com sucesso!\n\n` +
  `Número da solicitação: ${resultado.orcamento.id}\n` +
  `Status: ${resultado.orcamento.status}\n\n` +
  `A Nexoora recebeu seu pedido.`
)


  formulario.reset()

} catch (erro) {
  console.error('Erro ao enviar orçamento:', erro)

  alert(
    'Não foi possível comunicar com o servidor. ' +
    'Verifique se o back-end está funcionando.'
  )
}

            }}
          >
            <h3>Solicite um orçamento</h3>

            <label htmlFor="nome">Seu nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Como podemos chamar você?"
              required
            />

            <label htmlFor="email">Seu e-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              required
            />

            <label htmlFor="servico">
              Serviço desejado
            </label>
            <select
              id="servico"
              name="servico"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Selecione um serviço
              </option>
              <option value="web">
                Desenvolvimento Web
              </option>
              <option value="sistemas">
                Sistemas Personalizados
              </option>
              <option value="automacao">
                Automação de Processos
              </option>
            </select>

            <label htmlFor="mensagem">
              Conte sobre seu projeto
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              placeholder="Descreva brevemente sua ideia..."
              required
            />

            <button type="submit">
              Enviar solicitação
            </button>
          </form>

        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="rodape">
        <div className="rodape-container">

          <div className="rodape-marca">
            <h2>NEXOORA</h2>
            <p>
              Conectamos ideias, tecnologia e inovação
              para criar novas possibilidades.
            </p>
          </div>

          <div className="rodape-links">
            <h3>Navegação</h3>
            <a href="#inicio">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#sobre">Sobre nós</a>
            <a href="#contato">Contato</a>
          </div>

          <div className="rodape-links">
            <h3>Nossas soluções</h3>
            <a href="#servicos">Desenvolvimento Web</a>
            <a href="#servicos">Sistemas Personalizados</a>
            <a href="#servicos">Automação de Processos</a>
          </div>

        </div>

        <div className="rodape-inferior">
          <p>
            © {new Date().getFullYear()} Nexoora.
            Todos os direitos reservados.
          </p>

          <p>
            Desenvolvido com tecnologia e propósito.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default App
