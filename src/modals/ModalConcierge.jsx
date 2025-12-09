
import "../styles/ModalCommon.css";

const ModalConsierge = ({
  concluirModal,
  setMostrarModal
}) => {
  return (
    <div className="modal-content ski-class-layout">
      <header className="modal-header">
        <h2 className="modal-title">Consierge</h2>
      </header>

      <div className="modal-body">
        <section className="modal-form">
          <p>Esta página está em construção! Caso queria adicionar em sua Trip, 
            clique em adicionar que conversaremos sobre este serviço na confirmação 
            da reserva! </p>
          <div className="modal-footer">
            <button
              className="btn-cancel"
              onClick={() => setMostrarModal(false)}
            >
              CANCELAR
            </button>
            <button className="btn-confirm" onClick={concluirModal}>
              ADICIONAR
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModalConsierge;
