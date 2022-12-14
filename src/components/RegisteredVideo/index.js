import React from "react";
import { StyledRegisterVideo } from "./styles"
import { createClient } from '@supabase/supabase-js'

function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
                const value = evento.target.value;
                const name = evento.target.name;
                setValues({
                    ...values, [name]: value,
                });
        },
        clearForm() {
            setValues({
                titulo: '',
                url: '',
              });
        }
    };
}
const PROJECT_URL = 'https://kkxvliujlhoftvqmcvuw.supabase.co';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreHZsaXVqbGhvZnR2cW1jdnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTMyNDgsImV4cCI6MTk4MzgyOTI0OH0.AbPnDs9hI41FIDQq5kbpsTcy-2FPIEE5WGmjxuSSm0I';
const supabase = createClient(PROJECT_URL,PUBLIC_KEY );

function getThumbnail(url){
    return 'https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg';
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "Frost Punk", url: "https://www.youtube.com/watch?v=gj5ibYSz8C0"}});
    const [formVisivel, setFormVisivel] = React.useState(false);

    console.log();

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (<form onSubmit={(evento) => {
                    evento.preventDefault();

                    supabase.from("video").insert({
                        title:formCadastro.values.titulo,
                        url:formCadastro.values.url,
                        thumb:getThumbnail(formCadastro.values.url),
                        playlist:"Chico",

                    })
                    .then((oqueveio)=> {
                        console.log(oqueveio);
                    } )
                    .catch((err)=>{
                        console.log(err);
                    })

                    setFormVisivel(false);
                    formCadastro.clearForm();
                    }} >
                    <div>
                        <button type="button"className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input 
                            placeholder="T??tulo do v??deo" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange} />
                        <input 
                            placeholder="URL" 
                            name="url"
                            values={formCadastro.values.url} 
                            onChange={formCadastro.handleChange}
                          />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}