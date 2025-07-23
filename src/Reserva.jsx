import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

function Reserva() {
  const { id } = useParams();  // Pega o ID da URL
  const [imovel, setImovel] = useState(null);
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    data: '',
    hospedes: '',
    observacoes: ''
  });

  useEffect(() => {
    // Fazendo a requisição para pegar o imóvel com o ID passado na URL
    fetch('http://localhost:5000/api/imoveis')
      .then(res => res.json())
      .then(data => {
        // Encontrar o imóvel que tem o ID correspondente
        const encontrado = data.find(i => i.resumo.id === id);
        setImovel(encontrado ? encontrado.resumo : null);  // Se encontrar o imóvel, atualiza o estado
      });
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensagem = `Reserva para o imóvel ${imovel?.titre} em ${imovel?.ville}%0A
👤 Nome: ${form.nome}%0A
📞 Telefone: ${form.telefone}%0A
📅 Data: ${form.data}%0A
👥 Hóspedes: ${form.hospedes}%0A
📝 Observações: ${form.observacoes}`;

    const whatsappURL = `https://wa.me/5512996802204?text=${mensagem}`;
    window.open(whatsappURL, '_blank');
  };

  if (!imovel) return <p>Carregando...</p>;  // Se o imóvel não estiver carregado, exibe a mensagem

  return (
    <div className="container">
      <h2>Reserva para: {imovel.titre}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nome:
          <input type="text" name="nome" onChange={handleChange} required />
        </label>
        <label>
          Telefone:
          <input type="tel" name="telefone" onChange={handleChange} required />
        </label>
        <label>
          Data desejada:
          <input type="date" name="data" onChange={handleChange} required />
        </label>
        <label>
          Número de hóspedes:
          <input type="number" name="hospedes" onChange={handleChange} required />
        </label>
        <label>
          Observações:
          <textarea name="observacoes" onChange={handleChange} />
        </label>
        <button type="submit">Enviar via WhatsApp</button>
      </form>
    </div>
  );
}

export default Reserva;