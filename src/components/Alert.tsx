import { IAlert } from "../interfaces/IAlert"

export function Alert({ text }: IAlert) {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {text}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  )
}
