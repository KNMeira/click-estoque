const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors');   

const { Client } = require('pg')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}));

const port = 3000

const connection = {
    host: 'click-estoque.cenfoh0n0zzs.us-east-2.rds.amazonaws.com',
    user: 'exitoConsultoria',
    database: 'bd_exito',
    password: 'click123',
    port: 5432,
    ssl: {rejectUnauthorized: false}
}


app.listen(port, () => {
    console.log(`click-estoquedb rodando na porta ${port}`)
})

app.post('/login', (req, res) => {
    verificaLogin(req.body).then((response) => {
        res.json(response)

    })
})

app.post('/cadastro-produto', (req, res) => {
    saveProduto(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.status(response.status).send(responseJson)
    })
})

app.post('/cadastro-usuario', (req, res) => {
    saveUsuario(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.get('/usuarios', (req, res) => {
    getAllUsuarios(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/usuario', (req, res) => {
    getUsuario(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/editar-usuario', (req, res) => {
    editUsuario(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

//login
async function verificaLogin(dadosLogin) {
    const values = [dadosLogin.usuario, dadosLogin.senha];
    const client = new Client(connection)
    await client.connect()
    const res = await client.query('SELECT * FROM usuarios WHERE usuario = $1 and senha = $2', values)
    await client.end()

    let response;
    if (res.rowCount === 1) {
        response = { canAccess: true }
    } else {
        response = { canAccess: false }

    }
    return response
}

//estoque
async function saveProduto(produto) {
    const values = [produto.peca, produto.tamanho, produto.quantidade, produto.id_fornecedor, produto.valor_compra, produto.valor_venda]
    const client = new Client(connection)
    await client.connect()

    const verificaNomePeca = await client.query(`SELECT peca FROM produtos WHERE peca = $1`, [produto.peca]);

    let response
    if (verificaNomePeca.rowCount > 0) {
        response = { status: 400, msg: 'Nome da peça já cadastrado, insira um nome diferente' }

    } else {
        const res = await client.query(`INSERT INTO produtos(peca, tamanho, quantidade, id_fornecedor, valor_compra, valor_venda) VALUES ($1, $2, $3, $4, $5, $6)`, values)
        await client.end()
        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Produto cadastrado com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível cadastrar, tente novamente' }
        }
    }

    return response;
}

//usuarios

async function saveUsuario(usuario) {
    const values = [usuario.usuario, usuario.senha, usuario.cpf, usuario.email, usuario.celular];
    const client = new Client(connection)
    await client.connect()

    const valuesVerify = [usuario.usuario, usuario.cpf, usuario.email, usuario.celular]
    let verificaSingularidade = await client.query('SELECT * FROM usuarios WHERE usuario = $1 OR cpf = $2 OR email = $3 OR celular = $4 ', valuesVerify);

    let response
    if (verificaSingularidade.rowCount > 0) {
        response = { status: 400, msg: 'Dados já cadastrados' }
    } else {
        const res = await client.query(`INSERT INTO usuarios(usuario, senha, cpf, email, celular) VALUES ($1, $2, $3, $4, $5)`, values)
        await client.end()

        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Usuário cadastrado com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível cadastrar, tente novamente' }
        }
    }

    return response
}

async function editUsuario(usuario) {
    const values = [usuario.usuario, usuario.senha, usuario.email, usuario.celular, usuario.cpf];
    const client = new Client(connection)
    await client.connect()

    const valuesVerify = [usuario.usuario, usuario.email, usuario.celular]
    let verificaSingularidade = await client.query('SELECT * FROM usuarios WHERE usuario = $1 OR email = $2 OR celular = $3 ', valuesVerify);

    let response
    if (verificaSingularidade.rowCount > 0) {
        response = { status: 400, msg: 'Não é possível salvar a edição, já existe registro usando esse(s) dado(s)' }
    } else {
        const res = await client.query(`UPDATE usuarios SET usuario = $1  senha = $2 email = $3 celular = $4 WHERE cpf = $5)`, values)
        await client.end()

        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Edição salva com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível salvar, tente novamente' }
        }
    }

    return response

}

async function getAllUsuarios() {
    const client = new Client(connection)
    await client.connect()
    res = await client.query('SELECT * FROM usuarios')
    await client.end()

    return res.rows
}

async function getUsuario(dadosFiltro) {
    const client = new Client(connection)
    await client.connect()
    const values = [dadosFiltro.filtro];
    const columnName = dadosFiltro.tipoBusca;
    res = await client.query(`SELECT * FROM usuarios WHERE ${columnName} = $1`, values)
    await client.end()
    return res.rows
}
