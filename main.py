from flask import Flask, render_template  # estrutura para criar o site
from flask_socketio import SocketIO, send  # estrutura para criar o chat

app = Flask(__name__)  # cria o site
# chave de segurança, pode ser qualquer coisa, mas escolha algo difícil
app.config["SECRET"] = "ajuiahfa78fh9f78shfs768fgs7f6"
app.config["DEBUG"] = True  # para testarmos o código, no final tiramos
# cria a conexão entre diferentes máquinas que estão no mesmo site
socketio = SocketIO(app, cors_allowed_origins="*")


# define que a função abaixo vai ser acionada quando o evento de "message" acontecer
@socketio.on("message")
def gerenciar_mensagens(mensagem):
    print(f"Mensagem: {mensagem}")
    # envia a mensagem para todo mundo conectado no site
    send(mensagem, broadcast=True)


@app.route("/")  # cria a página do site
def home():
    # essa página vai carregar esse arquivo html que está aqui
    return render_template("index.html")


if __name__ == "__main__":
    # define que o app vai rodar no seu servidor local, ou seja, na internet em que o seu computador tá conectado
    socketio.run(app, host='192.168.5.156')
