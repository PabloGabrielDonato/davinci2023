import yup from 'yup'


const artist = yup.object({
    _id: yup.string(),
    name: yup.string().required().trim().min(3, 'el nombre debe tener al menos 3 caracteres'),
    birth: yup.date("debe ser una fecha valida").required("la fecha de nacimiento es obligatoria"),
    photo: yup.string()
})

const genre = yup.object({
    _id: yup.string(),
    name: yup.string().required('el nombre de genero es obligatorio').trim().min(3, 'el nombre debe tener al menos 3 caracteres'),
})

const song = yup.object({
    _id: yup.string(),
    name: yup.string().required("el nombre  de la cancion es obligatorio").trim().min(1),
    duration: yup.number("la duracion debe ser un numero").required("la duracion es requerida"), // in seconds
    artist: artist.required("el artista es requerido"),
    genre: genre.required('el genero es requerido'),
    file: yup.string().required('el archivo es requerido'),
    image: yup.string().required('la imagen es requerida')
})

const songCreate = yup.object({
    name: yup.string().required('el nombre de la cancion es requerido').trim().min(1),
    duration: yup.number().required('la duracion es requerida'), // in seconds
    artistId: yup.string().required('el artista es requerido'),
    genreId: yup.string().required('el genero es requerido'),
    file: yup.string().required('el archivo es requerido'),
    // image: yup.string().required('la imagen es requerida')
})



const playList = yup.object({
    name: yup.string().required('el nombre es obligatorio').trim().min(3, 'el nombre debe tener al menos 3 caracteres'),
    songs: yup.array().of(song).default([]),
    account: yup.object({
        _id: yup.string().required(),
        userName: yup.string().required(),
    }).required(),
})

export {
    song,
    artist,
    genre,
    playList,
    songCreate
}

