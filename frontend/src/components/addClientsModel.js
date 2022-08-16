import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../Queries/clientQueries";



export default function AddClientsModel() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [ addClient ] = useMutation(ADD_CLIENT,{
    variables: {name, email, phone},
    update(cache, {data: {addClient}}){
      const {clients} = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient])},
      })
    }
  });

  const onSubmit = (e) =>{
    e.preventDefault();
    if (name === '' || email ==='' || phone ===''){
      return alert('Please fill all fields')
    }
    addClient(name, email, phone)
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addCilentModel">
        <div className="d-flex align-items-centre">
          <FaUser className="icon">
          </FaUser>
          <div>Add Client</div>
        </div>
      </button>
      <div className="modal fade" id="addCilentModel" tabindex="-1" aria-labelledby="addCilentModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCilentModelLabel">Add Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-lable">Name</label>
                  <input type="text" className ='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)}></input>
                  <label className="form-lable">Email</label>
                  <input type="email" className ='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  <label className="form-lable">Phone</label>
                  <input type="phone" className ='form-control' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                </div>
                <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
