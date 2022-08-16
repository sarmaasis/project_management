
export default function ProjectCard({ project }) {
  return (
    <>
    <div className="col-md-4">
        <div className="card mb-2">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-centre">
                    <h5 className="card-title">{project.name}</h5>

                    <a className="btm btn-light" href={`/projects/${project.id}`}>
                        View
                    </a>
                </div>
                {/* <p className="small">
                    Status: <strong>{project.status}</strong>
                </p> */}
            </div>
        </div>
    </div>
    </>
  )
}
