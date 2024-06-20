import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth';

const CambiarPassword = () => {

  const { guardarPassword } = useAuth()

  const [ alerta, setAlerta ] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

    const handleSubmit = async e => {
      e.preventDefault();

      if(Object.values(password).some(campo => campo === '')) {
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })

        return
      }

      if(password.pwd_nuevo-length < 6) {
        setAlerta({
          msg: 'La contraseña minimo tiene que tener 6 caracteres',
          error: true
        })
        return
      }

      const respuesta = await guardarPassword(password);

      setAlerta(respuesta)
    }

    const {msg} = alerta;
  return (
        <>
                <AdminNav />

                <h2 className=" font-black text-center text-3xl mt-10">Cambiar contraseña</h2>
                <p className="text-xl mt-5 mb-10 text-center ">Modifica tu {''}
                     <span className="text-indigo-600 font-bold ">contraseña aqui</span> 
                </p>

                <div className="flex justify-center">
                    <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                        {msg && <Alerta alerta={alerta} />}
                      <form onSubmit={handleSubmit}>
                          <div className="my-3">
                              <label className="uppercase font-bold text-grey-600 " htmlFor="">Contraseña Actual: </label>
                              <input 
                                  type="password" 
                                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " 
                                  name="pwd_actual" 
                                  placeholder="Escribe tu contraseña actual"
                                  onChange={ e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                              />
                          </div>

                          <div className="my-3">
                              <label className="uppercase font-bold text-grey-600 " htmlFor=""> Nueva Contraseña: </label>
                              <input 
                                  type="password" 
                                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " 
                                  name="pwd_nuevo" 
                                  placeholder="Escribe tu nueva contraseña "
                                  onChange={ e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                              />
                          </div>
                           
                          <input type="submit" value="Actualizar Contraseña"  className="bg-indigo-600 text-center text-white uppercase rounded-lg px-10 py-3 mt-5 w-full"/>
                      </form>
                    </div>
                </div>
        </>
  )
}

export default CambiarPassword