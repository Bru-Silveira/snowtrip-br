import React from "react";

const ModalEquipamentos = ({
  servicoSelecionado,
  categoria,
  setCategoria,
  equipamentoSelecionado,
  setEquipamentoSelecionado,
  tamanho,
  setTamanho,
  dias,
  setDias,
  equipamentos,
  snowCategoria,
  setSnowCategoria,
  snowEquipamentoSelecionado,
  setSnowEquipamentoSelecionado,
  snowTamanho,
  setSnowTamanho,
  snowDias,
  setSnowDias,
  snowboardEquipamentos,
  concluirModal,
  setMostrarModal,
}) => {
  return (
    <div className="modal-content">
              <h2>{servicoSelecionado?.nome}</h2>

              {(servicoSelecionado?.slug === "equip-ski" ||
                servicoSelecionado?.slug === "equip-snow") && (
                <>
                  <label>
                    Categoria:
                    <select
                      value={
                        servicoSelecionado.slug === "equip-ski"
                          ? categoria
                          : snowCategoria
                      }
                      onChange={(e) =>
                        servicoSelecionado.slug === "equip-ski"
                          ? setCategoria(e.target.value)
                          : setSnowCategoria(e.target.value)
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="1">Categoria 1 - Básico</option>
                      <option value="2">Categoria 2 - Intermediário</option>
                      <option value="3">Categoria 3 - Premium</option>
                    </select>
                  </label>

                  {(categoria || snowCategoria) && (
                    <>
                      <label>
                        Equipamento:
                        <select
                          value={
                            servicoSelecionado.slug === "equip-ski"
                              ? equipamentoSelecionado
                              : snowEquipamentoSelecionado
                          }
                          onChange={(e) =>
                            servicoSelecionado.slug === "equip-ski"
                              ? setEquipamentoSelecionado(e.target.value)
                              : setSnowEquipamentoSelecionado(e.target.value)
                          }
                        >
                          <option value="">Selecione</option>
                          {(servicoSelecionado.slug === "equip-ski"
                            ? equipamentos
                            : snowboardEquipamentos
                          ).map((e) => (
                            <option key={e.id} value={e.id}>
                              {e.nome}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Tamanho:
                        <select
                          value={
                            servicoSelecionado.slug === "equip-ski"
                              ? tamanho
                              : snowTamanho
                          }
                          onChange={(e) =>
                            servicoSelecionado.slug === "equip-ski"
                              ? setTamanho(e.target.value)
                              : setSnowTamanho(e.target.value)
                          }
                        >
                          <option value="">Selecione</option>
                          <optgroup label="Infantil">
                            <option value="4-6 anos">4-6 anos</option>
                            <option value="8-10 anos">8-10 anos</option>
                          </optgroup>
                          <optgroup label="Adulto">
                            <option value="P">P</option>
                            <option value="M">M</option>
                          </optgroup>
                        </select>
                      </label>

                      <label>
                        Quantidade de dias:
                        <input
                          type="number"
                          min="1"
                          value={
                            servicoSelecionado.slug === "equip-ski"
                              ? dias
                              : snowDias
                          }
                          onChange={(e) =>
                            servicoSelecionado.slug === "equip-ski"
                              ? setDias(parseInt(e.target.value || "1", 10))
                              : setSnowDias(parseInt(e.target.value || "1", 10))
                          }
                        />
                      </label>
                    </>
                  )}
                </>
              )}

              <button onClick={concluirModal} className="btn-concluir">
                Concluir e adicionar ao carrinho
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
  );
};

export default ModalEquipamentos;
