from flask import Flask, jsonify
from flask_cors import CORS
import xml.etree.ElementTree as ET
from collections import Counter 
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/imoveis')
def listar_imoveis():
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'data', 'imoveis.xml')
        tree = ET.parse(file_path)
        root = tree.getroot()

        def xml_to_dict(element):
            node = {}

            # atributos como 'datetime'
            for key, value in element.attrib.items():
                node[key] = value

            # filhos
            children = list(element)
            if children:
                for child in children:
                    node[child.tag] = xml_to_dict(child)
            else:
                node = element.text

            return node

        imoveis = []
        for item in root.findall('imovel'):
            imoveis.append(xml_to_dict(item))
        print(f"Enviando {len(imoveis)} imóveis para o frontend")

         # Contando imóveis por cidade usando o campo 'ville' dentro de 'resumo'
        cidades = [imovel['resumo']['ville'] for imovel in imoveis if 'resumo' in imovel and 'ville' in imovel['resumo']]
        contagem_por_cidade = Counter(cidades)

        # Imprimindo no console (para ver no terminal onde o servidor está rodando)
        print("Quantidade de imóveis por cidade:")
        for cidade, quantidade in contagem_por_cidade.items():
            print(f"{cidade}: {quantidade}")

        return jsonify(imoveis)

    except FileNotFoundError:
        return jsonify({"error": "Arquivo imoveis.xml não encontrado"}), 404
    except ET.ParseError:
        return jsonify({"error": "Erro ao parsear o XML"}), 500

if __name__ == '__main__':
    app.run(debug=True)
