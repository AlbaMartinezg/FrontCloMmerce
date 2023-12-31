import React,  {useState} from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "../Header";
import Sidebar from "../Sidebar";

import crud from '../../conexiones/crud';


const CrearCategoria = () =>{
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({
        nombre:'',
        imagen:''
    });

    const { nombre, imagen} = categoria;

    const onChange = (e)=>{
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    };

    const ingresarCategoria = async () =>{
        const data = {
          nombre: categoria.nombre,
          imagen: categoria.imagen
        }
       console.log(data);
       const response = await crud.POST(`/api/categorias`, data);
       const mensaje = response.msg;
       const mensaje1 = "La categoría se creó correctamente";
       //este botón swal la copiamos de la página de https://sweetalert.js.org/guides/ 
       swal({
          title:'Información',
          text: mensaje1,
          icon: 'success',
          buttons:{
            confirm:{
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });
    
        //REDIRECCIONAR NUEVAMENTE A LA PÁGINA DE admin
        navigate("/admin");
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        ingresarCategoria();
    } 
 
    return(
        <>
            <Header/>
                <div className="md:flex md:min-h-screen ">
                <Sidebar/>
                <main className="mt-10 flex justify-center ">
                    <div className="mt-10 flex justify-center">
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl text-center  tracking-tight text-transparent ">
                        Crear Categoría
                        </h1>                        
                    </div>
                    <div className="mt-10 flex justify-center py-5">
                        <form 
                        onSubmit={onSubmit} 
                        className=" my-10 bg-white shadow rounded-lg p-10">
                            
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-lx font-bold">Nombre</label>
                                <input 
                                type="nombre"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre de la Categoría"
                                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                value={nombre}
                                onChange={onChange}
                                /><br/><br/>   

                                <label className="uppercase text-gray-600 block text-lx font-bold">Imagen</label>
                                <input 
                                type="text"
                                id="imagen"
                                name="imagen"
                                placeholder="Imagen"
                                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                value={imagen}
                                onChange={onChange}
                                /><br/><br/>                     
                                
                            </div>    
                            <input 
                                type="submit" 
                                value="Crear" 
                                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-900 transition-colors"/>                                                      
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
export default CrearCategoria;