const fs = require('fs');
var parser = require('xml2json');
const dir = './xml';
// nessa parte ele lista os xmls dentro da pasta
fs.readdir(dir, (err, arquivos) => {
    arquivos.forEach(arquivo => {
        // nessa parte ele pega o municipio do xml
        fs.readFile(`./xml/${arquivo}`, function (err, data) {
            var json = parser.toJson(data);
            const obj = JSON.parse(json);
            var municipio = obj["nfeProc"].NFe.infNFe.dest.enderDest.xMun;
            var local_salvar = `./xml/${municipio}`;
            // nessa parte ele verifica se a pasta existe, se nao ele cria
            if (!fs.existsSync(local_salvar)){
                fs.mkdirSync(local_salvar);
            }
            // nessa parte ele move pra pasta destino
            fs.copyFile(`./xml/${arquivo}`, `./xml/${municipio}/${arquivo}`, (err) => {
                if (err) throw err;
                console.log('XML copiado!');
            });
        });
    });
    console.log("Total de notas " + arquivos.length);
});