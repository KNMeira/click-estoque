var moment = require('moment');

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
    ssl: { rejectUnauthorized: false }
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

app.post('/cadastro-fornecedor', (req, res) => {
    saveFornecedor(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.get('/fornecedores', (req, res) => {
    getAllFornecedores().then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/fornecedor', (req, res) => {
    getFornecedor(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/editar-fornecedor', (req, res) => {
    editFornecedor(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.get('/estoque', (req, res) => {
    getEstoque().then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/peca', (req, res) => {
    getPeca(req.body.cod).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/editar-produto', (req, res) => {
    editProduto(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/registrar-entradas', (req, res) => {
    registrarEntradas(req.body).then((response) => {
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

async function getPeca(cod) {
    const client = new Client(connection)
    await client.connect()
    res = await client.query('SELECT * FROM produtos WHERE id_peca = $1', [cod])
    await client.end()
    return res.rows
}

async function getEstoque() {
    const client = new Client(connection)
    await client.connect()
    res = await client.query('SELECT p.peca, p.id_peca, p.tamanho, p.valor_compra, p.valor_venda, p.quantidade, f.fornecedor FROM  produtos p, fornecedores f WHERE f.id = p.id_fornecedor ORDER BY p.id_peca')
    await client.end()

    return res.rows
}

async function editProduto(produto) {
    const values = [produto.peca, produto.tamanho, produto.valor_compra, produto.valor_venda, produto.quantidade, produto.id_fornecedor, produto.id_peca]
    console.log(values);

    const client = new Client(connection)
    await client.connect()
    res = await client.query('UPDATE produtos SET peca = $1, tamanho = $2, valor_compra = $3, valor_venda = $4, quantidade = $5, id_fornecedor = $6 WHERE id_peca = $7', values)
    await client.end()
    console.log(res);

    let response
    if (res.rowCount > 0) {
        response = { status: 201, msg: 'Edição salva com sucesso' }
    } else {
        response = { status: 500, msg: 'Não foi possível salvar, tente novamente' }
    }

    return response

}

async function registrarEntradas(entradas) {
    const hasEntrada = await registraLog(entradas, 'E');

    if (!hasEntrada) {
        return { status: 400, msg: 'Não há entradas para cadastrar.' }
    } else {
        let res = await atualizaQntProduto(entradas, '+');
        console.log('response registrar entrada ', res);
        return res 
    }
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
    res = await client.query('SELECT * FROM usuarios ORDER BY usuario')
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

//fornecedores
async function saveFornecedor(fornecedor) {
    const values = [fornecedor.fornecedor, fornecedor.cnpj, fornecedor.endereco, fornecedor.email, fornecedor.celular];
    const client = new Client(connection)
    await client.connect()

    const valuesVerify = [fornecedor.cnpj]
    let verificaSingularidade = await client.query('SELECT * FROM fornecedores WHERE cnpj = $1', valuesVerify);

    let response
    if (verificaSingularidade.rowCount > 0) {
        response = { status: 400, msg: 'CNPJ já cadastrado' }
    } else {
        const res = await client.query(`INSERT INTO fornecedores(fornecedor, cnpj, endereco, email, celular) VALUES ($1, $2, $3, $4, $5)`, values)
        await client.end()

        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Fornecedor cadastrado com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível cadastrar, tente novamente' }
        }
    }

    return response
}

async function getAllFornecedores() {
    const client = new Client(connection)
    await client.connect()
    res = await client.query('SELECT * FROM fornecedores ORDER BY fornecedor')
    await client.end()

    return res.rows
}

async function getFornecedor(filtro) {
    const client = new Client(connection)
    await client.connect()
    const values = [filtro.cnpj];
    res = await client.query(`SELECT * FROM fornecedores WHERE cnpj = $1`, values)
    await client.end()
    return res.rows
}

async function editFornecedor(fornecedor) {

    const values = [fornecedor.fornecedor, fornecedor.endereco, fornecedor.email, fornecedor.celular, fornecedor.cnpj];
    const client = new Client(connection)
    await client.connect()

    let response

    const res = await client.query(`UPDATE fornecedores SET fornecedor = $1, endereco = $2, email = $3, celular = $4 WHERE cnpj = $5`, values)
    await client.end()

    if (res.rowCount > 0) {
        response = { status: 201, msg: 'Edição salva com sucesso' }
    } else {
        response = { status: 500, msg: 'Não foi possível salvar, tente novamente' }
    }


    return response


}

async function registraLog(obj, evento) {
    let arrayIds = [];
    let arrayQnt = [];
    Object.keys(obj).forEach((id) => {
        arrayIds.push(id)
    })

    Object.values(obj).forEach((qnt) => {
        arrayQnt.push(qnt)
    })

    let queryStringLog = `INSERT INTO entradas_saidas_logs (data, evento, id_peca, qtd) VALUES `;
    let valuesToInsert = [];

    arrayQnt.forEach((qnt, i) => {
        if (qnt > 0) {
            let value = `('${moment().format('YYYY-MM-DD')}', '${evento}', ${arrayIds[i]}, ${qnt}), `
            valuesToInsert.push(value);
        }
    })

    if (valuesToInsert.length > 0) {
        valuesToInsert.forEach(value => {
            queryStringLog = queryStringLog + value;
        });
        queryStringLog = queryStringLog.slice(0, queryStringLog.length - 2);

        const client = new Client(connection)
        await client.connect()

        res = await client.query(queryStringLog)
        await client.end()

        if (res.rowCount > 0) {
            response = { status: 201, msg: 'LOG cadastrado com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível cadastrar, tente novamente' }
        }

        return true


    } else {
        return false
    }
}

async function atualizaQntProduto(obj, operacao) {
    let arrayIds = [];
    let arrayQnt = [];
    Object.keys(obj).forEach((id) => {
        arrayIds.push(id)
    })

    Object.values(obj).forEach((qnt) => {
        arrayQnt.push(qnt)
    })
    console.log(arrayIds, arrayQnt);

    arrayQnt.forEach(async (qnt, i) => {
        if (qnt > 0) {
            let peca = await getPeca(arrayIds[i]);
            let qntAtt = (peca[0].quantidade + qnt);

            const values = [qntAtt, arrayIds[i]];
            console.log(values);
            queryUpdate = `UPDATE produtos SET quantidade = $1 WHERE id_peca = $2`;

            const client = new Client(connection)
            await client.connect()

            res = await client.query(queryUpdate, values)
            await client.end()
            
            let response;

            if (res.rowCount > 0) {
                response = { status: 201, msg: 'Entradas atualizadas com sucesso' }
                return response
            } else {
                response = { status: 500, msg: 'Erro inesperado, tente novamente' }
                return response

            }
        }
    })


}
