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

app.post('/delete-usuario', (req, res) => {
    deleteUsuario(req.body).then((response) => {
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

app.post('/delete-fornecedor', (req, res) => {
    deleteFornecedor(req.body).then((response) => {
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

app.post('/registrar-saidas', (req, res) => {
    registrarSaidas(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/delete-produto', (req, res) => {
    deleteProduto(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/cadastro-cliente', (req, res) => {
    cadastrarCliente(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.get('/clientes', (req, res) => {
    getClientes().then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/delete-cliente', (req, res) => {
    deleteCliente(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/cliente', (req, res) => {
    getCliente(req.body.id).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/editar-cliente', (req, res) => {
    editCliente(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.send(responseJson)
    })
})

app.post('/cadastro-venda', (req, res) => {
    saveVenda(req.body).then((response) => {
        let responseJson = JSON.stringify(response)
        res.status(response.status).send(responseJson)
    })
})

//vendas
async function saveVenda(venda) {
    const valuesVenda = [venda.idCliente, venda.valorDesconto, venda.valorTotalVenda, moment().format('YYYY-MM-DD')]

    let client = new Client(connection)
    await client.connect()

    let resVenda = await client.query('INSERT into vendas (id_cliente, valor_desconto,valor_total, data_venda) values ($1, $2, $3, $4) RETURNING id_venda', valuesVenda)

    const idVenda = resVenda.rows[0].id_venda;
    let valuesDetalheVenda = [];
    venda.Produtos.forEach((produto) => {
        valuesDetalheVenda.push([idVenda.toString(), produto.idPeca, produto.quantidade, produto.valorPeca, produto.valorTotalPeca])
    })

    console.log(valuesDetalheVenda);

    const promises = valuesDetalheVenda.map(async (value) => {

        let resDetalhe = await client.query('INSERT INTO detalhe_venda (id_venda, id_produto, quantidade, valor_unitario, valor_total) values ($1, $2, $3, $4, $5) RETURNING id_detalhe', value)
        
        if (resDetalhe.rowCount > 0) {
            console.log(`Detalhe da venda inserido com sucesso. ID: ${resDetalhe.rows[0].id_detalhe}`);
        } else {
            console.error('Erro ao inserir detalhe da venda.');
        }
        
    })
    
    await Promise.all(promises);
    
    let response;
    
    if (resVenda.rowCount > 0) {
        response = { status: 200, msg: "Venda cadastrada com sucesso" }
    } else {
        response = { status: 500, msg: "Erro inesperado, tente novamente" }
        
    }
    
    await client.end()
    return response;
}

//cliente

async function editCliente(cliente) {
    const values = [cliente.cliente, cliente.cpf, cliente.email, cliente.endereco, cliente.celular, cliente.id]
    const client = new Client(connection)
    await client.connect()

    let res = await client.query('UPDATE clientes SET cliente = $1, cpf = $2, email = $3, endereco = $4, celular = $5 WHERE id = $6', values)
    await client.end()

    let response
    if (res.rowCount > 0) {
        response = { status: 201, msg: 'Edição salva com sucesso' }
    } else {
        response = { status: 500, msg: 'Não foi possível salvar, tente novamente' }
    }

    return response
}

async function getCliente(id) {
    const client = new Client(connection)
    await client.connect()
    res = await client.query('SELECT * FROM clientes  WHERE id = $1', [id])
    await client.end()
    return res.rows
}

async function deleteCliente(cliente) {
    const client = new Client(connection)
    await client.connect()

    let del = await client.query('DELETE FROM clientes WHERE id = $1', [cliente.id]);

    let response;
    if (del.rowCount > 0) {
        response = { status: 200, msg: "Cliente excluído com sucesso" }
    } else {
        response = { status: 500, msg: "Erro inesperado, tente novamente" }

    }

    await client.end()
    return response;
}

async function cadastrarCliente(cliente) {
    const values = [cliente.cliente, cliente.cpf, cliente.enderecoCliente, cliente.emailCliente, cliente.celularCliente]
    const client = new Client(connection)
    await client.connect()

    let verificaCpf = await client.query('SELECT * FROM clientes WHERE cpf =$1', [cliente.cpf])

    if (verificaCpf.rowCount > 0) {
        await client.end()
        return { status: 400, msg: "Cpf já cadastrado" }
    } else {
        let res = await client.query('INSERT INTO clientes(cliente, cpf, endereco, email, celular) values($1,$2,$3,$4,$5)', values)

        await client.end()

        if (res.rowCount > 0) {
            return { status: 201, msg: "Cliente cadastrado com sucesso" }
        } else {
            return { status: 500, msg: "Erro inesperado, tente novamente" }
        }
    }
}

async function getClientes() {
    const client = new Client(connection)
    await client.connect()

    let res = await client.query('SELECT * FROM clientes')
    await client.end()

    return res.rows
}


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

async function deleteProduto(produto) {
    const client = new Client(connection)
    await client.connect()

    let del = await client.query('DELETE FROM produtos WHERE id_peca = $1', [produto.id]);

    let response;
    if (del.rowCount > 0) {
        response = { status: 200, msg: "Produto excluído com sucesso" }
    } else {
        response = { status: 500, msg: "Erro inesperado, tente novamente" }

    }

    await client.end()
    return response;
}


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
        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Produto cadastrado com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível cadastrar, tente novamente' }
        }
    }

    await client.end()
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

    const client = new Client(connection)
    await client.connect()
    res = await client.query('UPDATE produtos SET peca = $1, tamanho = $2, valor_compra = $3, valor_venda = $4, quantidade = $5, id_fornecedor = $6 WHERE id_peca = $7', values)
    await client.end()

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
        return res
    }
}

async function registrarSaidas(saidas) {
    const hasSaida = await registraLog(saidas, 'S');
    if (!hasSaida) {
        return { status: 400, msg: 'Não há saídas para cadastrar.' }
    } else {
        res = await atualizaQntProduto(saidas, '-');
        return res;

    }
}

//usuarios
async function deleteUsuario(id) {
    const client = new Client(connection)
    await client.connect()

    let del = await client.query('DELETE FROM usuarios WHERE id = $1', [id.id]);

    let response;
    if (del.rowCount > 0) {
        response = { status: 200, msg: "Usuário excluído com sucesso" }
    } else {
        response = { status: 500, msg: "Erro inesperado, tente novamente" }

    }

    await client.end()
    return response;
}

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

        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Usuário cadastrado com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível cadastrar, tente novamente' }
        }
    }

    await client.end()
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

        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Edição salva com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível salvar, tente novamente' }
        }
    }

    await client.end()
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

async function deleteFornecedor(idFornecedor) {
    const client = new Client(connection)
    await client.connect()

    let del = await client.query('DELETE FROM fornecedores WHERE id = $1', [idFornecedor.id]);

    let response;
    if (del.rowCount > 0) {
        response = { status: 200, msg: "Fornecedor excluído com sucesso" }
    } else {
        response = { status: 500, msg: "Erro inesperado, tente novamente" }

    }

    await client.end()
    return response;
}
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

        if (res.rowCount > 0) {
            response = { status: 201, msg: 'Fornecedor cadastrado com sucesso' }
        } else {
            response = { status: 500, msg: 'Não foi possível cadastrar, tente novamente' }
        }
    }

    await client.end()
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
    const values = [filtro.id];
    res = await client.query(`SELECT * FROM fornecedores WHERE id = $1`, values)
    await client.end()
    return res.rows
}

async function editFornecedor(fornecedor) {

    const values = [fornecedor.fornecedor, fornecedor.endereco, fornecedor.email, fornecedor.celular, fornecedor.cnpj, fornecedor.id];
    const client = new Client(connection)
    await client.connect()

    let response

    const res = await client.query(`UPDATE fornecedores SET fornecedor = $1, endereco = $2, email = $3, celular = $4, cnpj = $5 WHERE id = $6`, values)
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
    let arrayQnt = []
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

    let totalPecasAtt = 0;
    const promises = arrayQnt.map(async (qnt, i) => {
        if (qnt > 0) {
            let peca = await getPeca(arrayIds[i]);
            let qntAtt;
            if (operacao == '+') {
                qntAtt = (peca[0].quantidade + qnt);
            }

            if (operacao == '-') {
                qntAtt = (peca[0].quantidade - qnt);
            }

            const values = [qntAtt, arrayIds[i]];
            queryUpdate = `UPDATE produtos SET quantidade = $1 WHERE id_peca = $2`;

            const client = new Client(connection)
            await client.connect()

            res = await client.query(queryUpdate, values)
            await client.end()

            if (res.rowCount > 0) {
                totalPecasAtt = totalPecasAtt + res.rowCount;
            }
        }
    })

    await Promise.all(promises);


    if (totalPecasAtt > 0) {
        return { status: 201, msg: 'Estoque atualizado com sucesso' }
    } else {
        return { status: 500, msg: 'Erro inesperado, tente novamente' }
    }
}
