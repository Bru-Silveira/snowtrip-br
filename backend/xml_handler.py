import requests
import xml.etree.ElementTree as ET
import os
import time
import json
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

LISTINGS_URL = "https://cimalpes.com/fr/flux/?fonction=biens&login=snowtrip_xml&pass=TJE6DC4M8NWP"
DETAILS_URL = "https://cimalpes.com/fr/flux/?fonction=detail&login=snowtrip_xml&pass=TJE6DC4M8NWP&id_bien={id}"
AVAILABILITY_URL = "https://cimalpes.com/fr/flux/?fonction=infos&login=snowtrip_xml&pass=TJE6DC4M8NWP&id_bien={id}"

# Sessão com retry
session = requests.Session()
retry_strategy = Retry(
    total=3,
    status_forcelist=[429, 500, 502, 503, 504],
    allowed_methods=["GET"],
    backoff_factor=2
)
adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("https://", adapter)
session.mount("http://", adapter)

# Função segura para obter texto de um nó
def safe_findtext(parent, path):
    node = parent.find(path)
    return node.text if node is not None else None

def parse_xml_to_dict(element):
    """Converte um elemento XML (com ou sem filhos aninhados) em dicionário."""
    if len(element) == 0:
        return element.text

    data = {}
    for child in element:
        data[child.tag] = parse_xml_to_dict(child)
    return data

def dict_to_xml(tag, d):
    elem = ET.Element(tag)
    for key, val in d.items():
        if isinstance(val, list):
            for item in val:
                child = ET.SubElement(elem, key)
                child.text = str(item) if item is not None else ""
        elif isinstance(val, dict):
            child = dict_to_xml(key, val)
            elem.append(child)
        else:
            child = ET.SubElement(elem, key)
            child.text = str(val) if val is not None else ""
    return elem

def fetch_imoveis():
    print("Iniciando busca de imóveis...")

    try:
        response = session.get(LISTINGS_URL, timeout=30)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Erro ao buscar listagem de imóveis: {e}")
        return

    print("Resposta da listagem:", response.text[:500])

    try:
        root = ET.fromstring(response.content)
    except ET.ParseError as e:
        print(f"Erro ao parsear XML da listagem: {e}")
        return

    biens = root.find('biens')
    if biens is not None:
        bens = biens.findall('bien')
        print(f"Encontrados {len(bens)} imóveis na listagem.")

        print("Primeiro <bien> da listagem:")
        print(ET.tostring(bens[0], encoding='unicode'))
    
    else:
        print("Nenhum grupo <biens> encontrado.")
        bens = []

    imoveis_root = ET.Element("imoveis")
    imoveis_json = []

    for bien in bens:

        id_bien = safe_findtext(bien, 'id_bien')
        image_node = bien.find('url_photos')
        images = []
        if image_node is not None:
            photos = image_node.findall('photo')
            images =  [photo.text for photo in photos if photo is not None and photo.text]

        resumo = {
            'id': id_bien,
            'titre': safe_findtext(bien, 'nom_bien'),
            'prix_ete': safe_findtext(bien, 'prix_appel_ete'),
            'prix_hiver': safe_findtext(bien, 'prix_appel_hiver'),
            'ville': safe_findtext(bien, 'nom_station'),
            'image': safe_findtext(bien, 'photo_web'),
            'galeria': {'foto': images}
        }

        detalhes = {}
        try:
            detail_response = session.get(DETAILS_URL.format(id=id_bien), timeout=30)
            detail_response.raise_for_status()
            detail_root = ET.fromstring(detail_response.content)
            detalhes = parse_xml_to_dict(detail_root)

        except Exception as e:
            print(f"Erro nos detalhes do imóvel {id_bien}: {e}")

        disponibilidade = {}
        try:
            info_response = session.get(AVAILABILITY_URL.format(id=id_bien), timeout=30)
            info_response.raise_for_status()
            info_root = ET.fromstring(info_response.content)
            disponibilidade = parse_xml_to_dict(info_root)
        except Exception as e:
            print(f"Erro na disponibilidade do imóvel {id_bien}: {e}")

        # Criando elementos XML
        imovel_element = ET.Element("imovel")
        imovel_element.append(dict_to_xml("resumo", resumo))
        imovel_element.append(dict_to_xml("detalhes", detalhes))
        imovel_element.append(dict_to_xml("disponibilidade", disponibilidade))
        imoveis_root.append(imovel_element)

        # JSON para debug mais fácil
        imoveis_json.append({
            'resumo': resumo,
            'detalhes': detalhes,
            'disponibilidade': disponibilidade
        })

        time.sleep(0.2)

    # Salvando arquivos
    if len(imoveis_root) > 0:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        data_dir = os.path.join(script_dir, 'data')
        os.makedirs(data_dir, exist_ok=True)

        # XML
        xml_path = os.path.join(data_dir, 'imoveis.xml')
        tree = ET.ElementTree(imoveis_root)
        tree.write(xml_path, encoding="utf-8", xml_declaration=True)
        print(f"Arquivo XML salvo com sucesso em: {xml_path}")

        # JSON
        json_path = os.path.join(data_dir, 'imoveis.json')
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(imoveis_json, f, ensure_ascii=False, indent=2)
        print(f"Arquivo JSON salvo com sucesso em: {json_path}")
    else:
        print("Nenhum imóvel foi processado.")

if __name__ == "__main__":
    fetch_imoveis()
