import { useEffect, useState } from "react"
import api from "./services/api"
import { IAlunos } from "./interfaces/IAlunos"
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"
import { Alert } from "./components/Alert"
import { IAlert } from "./interfaces/IAlert"

function App() {
  const [alunos, setAlunos] = useState<IAlunos[]>([])
  const [showModalPost, setShowModalPost] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState<IAlert>({
    isShow: false,
    text: "",
  })
  const [alunoSelecionado, setAlunoSelecionado] = useState<IAlunos>({
    id: 0,
    name: "",
    email: "",
    birth: 0,
  })

  // Get API Data
  useEffect(() => {
    api.get("").then(({ data }) => {
      setAlunos(data)
    })
  }, [alunos])

  // Alert Timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlertSuccess({
        isShow: false,
        text: "",
      })
    }, 3500)

    return () => clearTimeout(timeout)
  }, [showAlertSuccess.isShow])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    })
  }

  function handleShowModalUpdate(aluno: IAlunos) {
    const { id, name, email, birth } = aluno
    setAlunoSelecionado({
      ...alunoSelecionado,
      id,
      name,
      email,
      birth,
    })
    setShowModalUpdate(true)
  }

  function handleShowModalDelete(aluno: IAlunos) {
    setAlunoSelecionado(aluno)
    setShowModalDelete(true)
  }

  async function postAluno() {
    delete alunoSelecionado?.id

    await api
      .post("", alunoSelecionado)
      .then((response) => {
        setShowModalPost(false)
        setShowAlertSuccess({
          isShow: true,
          text: "Aluno adionado com sucesso!",
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function updateAluno() {
    await api
      .put(`${alunoSelecionado.id}`, alunoSelecionado)
      .then((response) => {
        setShowModalUpdate(false)
        setShowAlertSuccess({
          isShow: true,
          text: "Aluno editado com sucesso!",
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function deleteAluno(id: number) {
    await api
      .delete(`${id}`)
      .then((response) => {
        setShowModalDelete(false)
        setShowAlertSuccess({
          isShow: true,
          text: "Usuário excluído com sucesso!",
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <h1>Alunos API</h1>

      {showAlertSuccess.isShow && <Alert text={showAlertSuccess.text} />}

      <div className="">
        <div className="text-center mb-3">
          <button
            className="btn btn-rounded btn-success"
            onClick={() => setShowModalPost(true)}
          >
            Incluir Aluno
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Data de Nascimento</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody className="">
            {alunos?.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.name}</td>
                <td>{aluno.email}</td>
                <td>{aluno.birth}</td>
                <td>
                  <button
                    className="btn btn-rounded btn-primary mx-1"
                    onClick={() => handleShowModalUpdate(aluno)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-rounded btn-danger mx-1"
                    onClick={() => handleShowModalDelete(aluno)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Incluir aluno Modal */}
        <Modal isOpen={showModalPost}>
          <ModalHeader>Incluir Aluno</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nome: </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
              />
              <label>Email: </label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <label>Data de Nascimento: </label>
              <input
                type="number"
                className="form-control"
                name="birth"
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={postAluno}>
              Incluir
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowModalPost(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        {/* Editar aluno Modal */}
        <Modal isOpen={showModalUpdate}>
          <ModalHeader>Editar Aluno</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID: </label>
              <input
                type="text"
                className="form-control"
                readOnly
                value={alunoSelecionado.id}
              />
              <label>Nome: </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={alunoSelecionado.name}
              />
              <label>Email: </label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={alunoSelecionado.email}
              />
              <label>Data de Nascimento: </label>
              <input
                type="text"
                className="form-control"
                name="birth"
                onChange={handleChange}
                value={alunoSelecionado.birth}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={updateAluno}>
              Salvar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowModalUpdate(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={showModalDelete}>
          <ModalHeader>Excluir Aluno</ModalHeader>
          <ModalBody>
            <p>Deseja realmente excluir o aluno {alunoSelecionado.name} ?</p>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => deleteAluno(alunoSelecionado.id!)}
            >
              Excluir
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModalDelete(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default App
