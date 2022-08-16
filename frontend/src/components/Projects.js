import Spinner from "./spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../Queries/ProjectQuerie"
import ProjectCard from "./ProjectCard";

export default function Projects() {

    const { loading , error, data } = useQuery(GET_PROJECTS);
    if (loading) return <Spinner></Spinner>
    if (error) return <p>Something went wrong!!</p>
    return (
        <>
            {data.projects.length>0 ? (
                <div className="row">
                    {data.projects.map((project) => (
                        <ProjectCard key={project.id} project={project}></ProjectCard>   
                    ))}
                </div>
            ) : ( <p>No Projects</p> )}
        </>
    )
}
